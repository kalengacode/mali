import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    // Test de connexion à la base de données
    const userCount = await prisma.user.count();

    // Vérifier s'il y a des utilisateurs de test
    const testUsers = await prisma.user.findMany({
      where: {
        email: {
          in: ["etudiant1@mali.cd", "prof.kamau@mali.cd", "admin@mali.cd"],
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });

    // Vérifier les profils associés
    const profilesCheck = await Promise.all([
      prisma.studentProfile.count(),
      prisma.teacherProfile.count(),
      prisma.adminProfile.count(),
    ]);

    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        totalUsers: userCount,
        testUsers: testUsers.length,
        testUserDetails: testUsers,
        profiles: {
          students: profilesCheck[0],
          teachers: profilesCheck[1],
          admins: profilesCheck[2],
        },
      },
      message: "API de test fonctionnelle",
    });
  } catch (error) {
    console.error("Erreur de test:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur de connexion à la base de données",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Créer des utilisateurs de test s'ils n'existent pas
    const hashedPassword = await hashPassword("password123");

    const testUsers = [
      {
        email: "etudiant1@mali.cd",
        password: hashedPassword,
        firstName: "Pacifique",
        lastName: "Kabongo",
        role: "STUDENT" as const,
        isActive: true,
      },
      {
        email: "prof.kamau@mali.cd",
        password: hashedPassword,
        firstName: "Joseph",
        lastName: "Kamau",
        role: "TEACHER" as const,
        isActive: true,
      },
      {
        email: "admin@mali.cd",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "Principal",
        role: "ADMIN" as const,
        isActive: true,
      },
    ];

    const createdUsers = [];
    const createdProfiles = [];

    for (const userData of testUsers) {
      try {
        let user = await prisma.user.findUnique({
          where: { email: userData.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: userData,
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          });
          createdUsers.push(user);
        }

        // Créer les profils associés si ils n'existent pas
        if (user.role === "STUDENT") {
          const existingProfile = await prisma.studentProfile.findUnique({
            where: { userId: user.id },
          });

          if (!existingProfile) {
            const profile = await prisma.studentProfile.create({
              data: {
                userId: user.id,
                studentId: `STU${Date.now()}`,
                enrollmentDate: new Date(),
              },
            });
            createdProfiles.push({ type: "student", profile });
          }
        } else if (user.role === "TEACHER") {
          const existingProfile = await prisma.teacherProfile.findUnique({
            where: { userId: user.id },
          });

          if (!existingProfile) {
            const profile = await prisma.teacherProfile.create({
              data: {
                userId: user.id,
                teacherId: `TEA${Date.now()}`,
                department: "Informatique",
                specialization: "Programmation",
                hireDate: new Date(),
              },
            });
            createdProfiles.push({ type: "teacher", profile });
          }
        } else if (user.role === "ADMIN") {
          const existingProfile = await prisma.adminProfile.findUnique({
            where: { userId: user.id },
          });

          if (!existingProfile) {
            const profile = await prisma.adminProfile.create({
              data: {
                userId: user.id,
                adminId: `ADM${Date.now()}`,
                department: "Administration",
                permissions: ["ALL"],
              },
            });
            createdProfiles.push({ type: "admin", profile });
          }
        }
      } catch (error) {
        console.error(
          `Erreur lors de la création de ${userData.email}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Utilisateurs et profils de test créés ou vérifiés",
      createdUsers,
      createdProfiles,
      totalCreated: createdUsers.length + createdProfiles.length,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création des utilisateurs de test:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la création des utilisateurs de test",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
