import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const currentUser = await getUserById(authToken);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    let stats = {};

    if (currentUser.role === "ADMIN") {
      const [
        totalSchools,
        totalUsers,
        totalStudents,
        totalTeachers,
        totalCourses,
        recentUsers,
      ] = await Promise.all([
        prisma.school.count({ where: { isActive: true } }),
        prisma.user.count({ where: { isActive: true } }),
        prisma.user.count({ where: { role: "STUDENT", isActive: true } }),
        prisma.user.count({ where: { role: "TEACHER", isActive: true } }),
        prisma.course.count(),
        prisma.user.findMany({
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        }),
      ]);

      stats = {
        overview: {
          totalSchools,
          totalUsers,
          totalStudents,
          totalTeachers,
          totalCourses,
        },
        recentUsers,
      };
    } else if (currentUser.role === "TEACHER") {
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: currentUser.id },
        include: {
          courses: {
            include: {
              _count: {
                select: { enrollments: true },
              },
            },
          },
        },
      });

      if (teacherProfile) {
        stats = {
          overview: {
            totalCourses: teacherProfile.courses.length,
            totalStudents: teacherProfile.courses.reduce(
              (sum, course) => sum + course._count.enrollments,
              0
            ),
          },
          courses: teacherProfile.courses.map((course) => ({
            id: course.id,
            title: course.title,
            code: course.code,
            status: course.status,
            totalStudents: course._count.enrollments,
          })),
        };
      }
    } else if (currentUser.role === "STUDENT") {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: currentUser.id },
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
        },
      });

      if (studentProfile) {
        stats = {
          overview: {
            totalCourses: studentProfile.enrollments.length,
          },
          enrollments: studentProfile.enrollments.map((enrollment) => ({
            id: enrollment.id,
            course: {
              title: enrollment.course.title,
              code: enrollment.course.code,
              status: enrollment.course.status,
            },
            enrolledAt: enrollment.enrolledAt,
          })),
        };
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: currentUser.role,
      },
      stats,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
