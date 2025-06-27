import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      schoolName,
      schoolCode,
      schoolAddress,
      schoolPhone,
      schoolEmail,
      schoolWebsite,
      schoolDescription,
      adminFirstName,
      adminLastName,
      adminEmail,
      adminPhone,
      adminPassword,
    } = data;

    if (!schoolName || !schoolCode || !adminFirstName || !adminLastName || !adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    const existingSchool = await prisma.school.findUnique({
      where: { code: schoolCode },
    });

    if (existingSchool) {
      return NextResponse.json(
        { error: "Ce code d'école est déjà utilisé" },
        { status: 409 }
      );
    }

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Cet email administrateur est déjà utilisé" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(adminPassword);

    const result = await prisma.$transaction(async (tx) => {
      const school = await tx.school.create({
        data: {
          name: schoolName,
          code: schoolCode,
          address: schoolAddress,
          phone: schoolPhone,
          email: schoolEmail,
          website: schoolWebsite,
          description: schoolDescription,
          isActive: true,
        },
      });

      const admin = await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: adminFirstName,
          lastName: adminLastName,
          phone: adminPhone,
          role: "ADMIN",
          schoolId: school.id,
          isActive: true,
        },
      });

      const adminProfile = await tx.adminProfile.create({
        data: {
          userId: admin.id,
          adminId: `ADM${Date.now()}`,
          department: "Administration",
          permissions: [
            "VIEW_DASHBOARD",
            "MANAGE_USERS",
            "MANAGE_COURSES",
            "MANAGE_SCHOOL",
            "VIEW_ANALYTICS",
          ],
        },
      });

      return { school, admin, adminProfile };
    });

    return NextResponse.json(
      {
        success: true,
        message: "École et compte administrateur créés avec succès",
        school: {
          id: result.school.id,
          name: result.school.name,
          code: result.school.code,
        },
        admin: {
          id: result.admin.id,
          firstName: result.admin.firstName,
          lastName: result.admin.lastName,
          email: result.admin.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'école:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
