import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

// GET - Récupérer les inscriptions
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

    let enrollments;

    if (user.role === "STUDENT") {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });

      if (!studentProfile) {
        return NextResponse.json(
          { error: "Profil étudiant non trouvé" },
          { status: 404 }
        );
      }

      enrollments = await prisma.courseEnrollment.findMany({
        where: {
          studentId: studentProfile.id,
        },
        include: {
          course: {
            include: {
              teacher: {
                include: { user: true },
              },
            },
          },
          student: {
            include: { user: true },
          },
        },
        orderBy: { enrolledAt: "desc" },
      });
    } else {
      // Admin ou Teacher - toutes les inscriptions
      enrollments = await prisma.courseEnrollment.findMany({
        include: {
          course: {
            include: {
              teacher: {
                include: { user: true },
              },
            },
          },
          student: {
            include: { user: true },
          },
        },
        orderBy: { enrolledAt: "desc" },
      });
    }

    return NextResponse.json({
      success: true,
      enrollments: enrollments.map((enrollment) => ({
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt,
        completedAt: enrollment.completedAt,
        grade: enrollment.grade,
        isActive: enrollment.isActive,
        course: {
          id: enrollment.course.id,
          title: enrollment.course.title,
          code: enrollment.course.code,
          category: enrollment.course.category,
          price: enrollment.course.price,
          startDate: enrollment.course.startDate,
          endDate: enrollment.course.endDate,
          teacher: {
            id: enrollment.course.teacher.id,
            name: `${enrollment.course.teacher.user.firstName} ${enrollment.course.teacher.user.lastName}`,
            department: enrollment.course.teacher.department,
          },
        },
        student: {
          id: enrollment.student.id,
          studentId: enrollment.student.studentId,
          name: `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`,
          email: enrollment.student.user.email,
        },
      })),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des inscriptions:", error);
    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle inscription
export async function POST(request: NextRequest) {
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

    const data = await request.json();
    const { courseId } = data;

    if (!courseId) {
      return NextResponse.json(
        { error: "ID du cours requis" },
        { status: 400 }
      );
    }

    // Pour un étudiant
    if (user.role === "STUDENT") {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });
      if (!studentProfile) {
        return NextResponse.json(
          { error: "Profil étudiant non trouvé" },
          { status: 404 }
        );
      }

      // Vérifier que le cours existe
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          enrollments: true,
          teacher: {
            include: { user: true },
          },
        },
      });

      if (!course) {
        return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
      }

      // Vérifier si déjà inscrit
      const existingEnrollment = await prisma.courseEnrollment.findUnique({
        where: {
          studentId_courseId: {
            studentId: studentProfile.id,
            courseId: courseId,
          },
        },
      });

      if (existingEnrollment) {
        return NextResponse.json(
          { error: "Déjà inscrit à ce cours" },
          { status: 409 }
        );
      }

      // Vérifier la limite d'étudiants
      if (course.maxStudents && course.enrollments.length >= course.maxStudents) {
        return NextResponse.json({ error: "Cours complet" }, { status: 409 });
      }

      const enrollment = await prisma.courseEnrollment.create({
        data: {
          studentId: studentProfile.id,
          courseId: courseId,
          isActive: true,
        },
        include: {
          course: {
            include: {
              teacher: {
                include: { user: true },
              },
            },
          },
          student: {
            include: { user: true },
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          enrollment: {
            id: enrollment.id,
            enrolledAt: enrollment.enrolledAt,
            isActive: enrollment.isActive,
            course: {
              id: enrollment.course.id,
              title: enrollment.course.title,
              code: enrollment.course.code,
              teacher: {
                name: `${enrollment.course.teacher.user.firstName} ${enrollment.course.teacher.user.lastName}`,
              },
            },
            student: {
              id: enrollment.student.id,
              name: `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`,
              studentId: enrollment.student.studentId,
            },
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: "Seuls les étudiants peuvent s'inscrire" }, { status: 403 });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
