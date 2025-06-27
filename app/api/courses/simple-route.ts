import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

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

    // Version simplifiée - récupérer tous les cours
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          include: { user: true },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      courses: courses.map((course) => ({
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
          specialization: course.teacher.specialization,
        },
        enrolledStudents: course._count.enrollments,
        isEnrolled: false, // Simplifié pour l'instant
      })),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
