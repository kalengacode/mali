import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

// GET - Récupérer toutes les écoles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        include: {
          _count: {
            select: {
              users: true,
              courses: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.school.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      schools: schools.map((school) => ({
        id: school.id,
        name: school.name,
        code: school.code,
        address: school.address,
        phone: school.phone,
        email: school.email,
        website: school.website,
        logo: school.logo,
        description: school.description,
        isActive: school.isActive,
        createdAt: school.createdAt,
        totalUsers: school._count.users,
        totalCourses: school._count.courses,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des écoles:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle école
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
    const { name, code, address, phone, email, website, description, logo } =
      data;

    if (!name || !code) {
      return NextResponse.json(
        { error: "Le nom et le code sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si le code existe déjà
    const existingSchool = await prisma.school.findUnique({
      where: { code },
    });

    if (existingSchool) {
      return NextResponse.json(
        { error: "Ce code d'école est déjà utilisé" },
        { status: 409 }
      );
    }

    const newSchool = await prisma.school.create({
      data: {
        name,
        code,
        address,
        phone,
        email,
        website,
        description,
        logo,
        isActive: true,
      },
      include: {
        _count: {
          select: {
            users: true,
            courses: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "École créée avec succès",
        school: {
          id: newSchool.id,
          name: newSchool.name,
          code: newSchool.code,
          address: newSchool.address,
          phone: newSchool.phone,
          email: newSchool.email,
          website: newSchool.website,
          logo: newSchool.logo,
          description: newSchool.description,
          isActive: newSchool.isActive,
          createdAt: newSchool.createdAt,
          totalUsers: newSchool._count.users,
          totalCourses: newSchool._count.courses,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'école:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
