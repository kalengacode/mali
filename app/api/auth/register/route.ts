import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password, firstName, lastName, phone, role, profileData } =
      data;

    // Validation des champs requis
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Validation du rôle (seuls STUDENT et TEACHER sont autorisés pour l'inscription publique)
    if (!["STUDENT", "TEACHER"].includes(role)) {
      return NextResponse.json({ error: "Rôle non autorisé" }, { status: 400 });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    const hashedPass = await hashPassword(password);

    // Créer l'utilisateur avec son profil selon le rôle
    const userData: any = {
      email,
      password: hashedPass,
      firstName,
      lastName,
      phone,
      role,
      isActive: true,
    };

    // Ajouter le profil selon le rôle
    if (role === "STUDENT") {
      userData.studentProfile = {
        create: {
          studentId: profileData?.studentId || `ETU${Date.now()}`,
          address: profileData?.address || "",
          emergencyContact: profileData?.emergencyContact || phone,
        },
      };
    } else if (role === "TEACHER") {
      userData.teacherProfile = {
        create: {
          teacherId: profileData?.teacherId || `PROF${Date.now()}`,
          department: profileData?.department || "Non spécifié",
          specialization: profileData?.specialization || "",
          biography: profileData?.biography || "",
        },
      };
    }

    const newUser = await prisma.user.create({
      data: userData,
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Compte créé avec succès",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
