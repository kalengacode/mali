import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById, hashPassword } from "@/lib/auth";

// GET - Récupérer tous les utilisateurs
export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = await getUserById(authToken);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          studentProfile: true,
          teacherProfile: true,
          adminProfile: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        avatar: u.avatar,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
        profile: u.studentProfile || u.teacherProfile || u.adminProfile,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel utilisateur
export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const currentUser = await getUserById(authToken);
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const data = await request.json();
    const { email, password, firstName, lastName, phone, role, profileData } =
      data;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
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
          dateOfBirth: profileData?.dateOfBirth
            ? new Date(profileData.dateOfBirth)
            : null,
          address: profileData?.address,
          emergencyContact: profileData?.emergencyContact,
        },
      };
    } else if (role === "TEACHER") {
      userData.teacherProfile = {
        create: {
          teacherId: profileData?.teacherId || `PROF${Date.now()}`,
          department: profileData?.department || "Non spécifié",
          specialization: profileData?.specialization,
          biography: profileData?.biography,
          experience: profileData?.experience
            ? parseInt(profileData.experience)
            : null,
        },
      };
    } else if (role === "ADMIN") {
      userData.adminProfile = {
        create: {
          adminId: profileData?.adminId || `ADM${Date.now()}`,
          department: profileData?.department,
          permissions: profileData?.permissions || ["VIEW_DASHBOARD"],
        },
      };
    }

    const newUser = await prisma.user.create({
      data: userData,
      include: {
        studentProfile: true,
        teacherProfile: true,
        adminProfile: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          role: newUser.role,
          isActive: newUser.isActive,
          createdAt: newUser.createdAt,
          profile:
            newUser.studentProfile ||
            newUser.teacherProfile ||
            newUser.adminProfile,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
