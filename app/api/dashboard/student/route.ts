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
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer le profil étudiant
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                teacher: {
                  include: { user: true },
                },
                schedules: true,
              },
            },
          },
        },
        examResults: {
          include: {
            exam: {
              include: { course: true },
            },
          },
          orderBy: { gradedAt: "desc" },
          take: 5,
        },
      },
    });

    if (!studentProfile) {
      return NextResponse.json(
        { error: "Profil étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Statistiques
    const totalCourses = studentProfile.enrollments.length;
    const completedCourses = studentProfile.enrollments.filter(
      (e) => e.completedAt
    ).length;
    const averageGrade =
      studentProfile.examResults.length > 0
        ? studentProfile.examResults.reduce(
            (sum, result) => sum + Number(result.score),
            0
          ) / studentProfile.examResults.length
        : 0;

    // Prochains cours (cette semaine)
    const today = new Date();
    const dayOfWeek = today.getDay() || 7; // Dimanche = 7
    const upcomingCourses = studentProfile.enrollments
      .filter((enrollment) => enrollment.isActive)
      .flatMap((enrollment) =>
        enrollment.course.schedules.map((schedule) => ({
          id: enrollment.course.id,
          title: enrollment.course.title,
          teacher: `${enrollment.course.teacher.user.firstName} ${enrollment.course.teacher.user.lastName}`,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          room: schedule.room,
          type: schedule.type,
        }))
      )
      .filter((course) => course.dayOfWeek >= dayOfWeek)
      .sort(
        (a, b) =>
          a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime)
      )
      .slice(0, 5);

    // Examens à venir
    const upcomingExams = await prisma.exam.findMany({
      where: {
        course: {
          enrollments: {
            some: {
              studentId: studentProfile.id,
              isActive: true,
            },
          },
        },
        date: {
          gte: new Date(),
        },
        status: "SCHEDULED",
      },
      include: {
        course: true,
      },
      orderBy: { date: "asc" },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        student: {
          id: studentProfile.id,
          studentId: studentProfile.studentId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        stats: {
          totalCourses,
          completedCourses,
          averageGrade: Math.round(averageGrade * 100) / 100,
          activeCourses: totalCourses - completedCourses,
        },
        upcomingCourses,
        upcomingExams: upcomingExams.map((exam) => ({
          id: exam.id,
          title: exam.title,
          course: exam.course.title,
          date: exam.date,
          startTime: exam.startTime,
          duration: exam.duration,
          room: exam.room,
        })),
        recentGrades: studentProfile.examResults.map((result) => ({
          id: result.id,
          course: result.exam.course.title,
          exam: result.exam.title,
          score: result.score,
          maxScore: result.maxScore,
          grade: result.grade,
          gradedAt: result.gradedAt,
        })),
      },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données étudiant:",
      error
    );
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
