import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

// GET - Récupérer tous les cours
export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = await getUserById(authToken);
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer tous les cours avec les informations de base
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          include: { user: true }
        },
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      courses: courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        code: course.code,
        category: course.category,
        price: course.price,
        duration: course.duration,
        maxStudents: course.maxStudents,
        status: course.status,
        startDate: course.startDate,
        endDate: course.endDate,
        teacher: {
          id: course.teacher.id,
          name: `${course.teacher.user.firstName} ${course.teacher.user.lastName}`,
          department: course.teacher.department,
          specialization: course.teacher.specialization
        },
        enrolledStudents: course._count.enrollments,
        isEnrolled: false
      }))
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
    return NextResponse.json({ 
      error: "Erreur interne du serveur",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 });
  }
}

// POST - Créer un nouveau cours
export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = await getUserById(authToken);
    if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      title,
      description,
      code,
      category,
      price,
      duration,
      maxStudents,
      startDate,
      endDate,
      teacherId,
    } = data;

    if (
      !title ||
      !description ||
      !code ||
      !category ||
      !price ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Vérifier si le code du cours existe déjà
    const existingCourse = await prisma.course.findUnique({
      where: { code }
    });

    if (existingCourse) {
      return NextResponse.json(
        { error: "Le code du cours existe déjà" },
        { status: 409 }
      );
    }

    // Déterminer l'ID de l'enseignant
    let finalTeacherId = teacherId;
    if (user.role === "TEACHER") {
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: user.id }
      });
      if (!teacherProfile) {
        return NextResponse.json(
          { error: "Profil enseignant non trouvé" },
          { status: 404 }
        );
      }
      finalTeacherId = teacherProfile.id;
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        code,
        category,
        price: parseFloat(price),
        duration,
        maxStudents: maxStudents ? parseInt(maxStudents) : null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        teacherId: finalTeacherId,
        status: "ACTIVE"
      },
      include: {
        teacher: {
          include: { user: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        code: course.code,
        category: course.category,
        price: course.price,
        duration: course.duration,
        maxStudents: course.maxStudents,
        status: course.status,
        startDate: course.startDate,
        endDate: course.endDate,
        teacher: {
          id: course.teacher.id,
          name: `${course.teacher.user.firstName} ${course.teacher.user.lastName}`,
          department: course.teacher.department
        }
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
