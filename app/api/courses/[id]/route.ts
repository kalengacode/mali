import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

// GET - Récupérer un cours spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
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

    const course = await prisma.course.findUnique({
      where: { id: resolvedParams.id },
      include: {
        teacher: {
          include: { user: true },
        },
        enrollments: {
          include: {
            student: {
              include: { user: true },
            },
          },
        },
        schedules: true,
        exams: {
          orderBy: { date: "asc" },
        },
        documents: {
          where: { isPublic: true },
          orderBy: { createdAt: "desc" },
        },
        assignments: {
          orderBy: { dueDate: "asc" },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    // Vérifier les permissions
    if (user.role === "STUDENT") {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });
      const isEnrolled = course.enrollments.some(
        (e) => e.studentId === studentProfile?.id
      );
      if (!isEnrolled) {
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }
    } else if (user.role === "TEACHER") {
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: user.id },
      });
      if (course.teacherId !== teacherProfile?.id) {
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }
    }

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
          email: course.teacher.user.email,
          department: course.teacher.department,
          specialization: course.teacher.specialization,
          biography: course.teacher.biography,
        },
        enrolledStudents: course._count.enrollments,
        students: course.enrollments.map((enrollment) => ({
          id: enrollment.id,
          student: {
            id: enrollment.student.id,
            name: `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`,
            email: enrollment.student.user.email,
            studentId: enrollment.student.studentId,
          },
          enrolledAt: enrollment.enrolledAt,
          grade: enrollment.grade,
          isActive: enrollment.isActive,
        })),
        schedules: course.schedules.map((schedule) => ({
          id: schedule.id,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          room: schedule.room,
          type: schedule.type,
        })),
        exams: course.exams.map((exam) => ({
          id: exam.id,
          title: exam.title,
          type: exam.type,
          date: exam.date,
          startTime: exam.startTime,
          duration: exam.duration,
          status: exam.status,
        })),
        documents: course.documents.map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          type: doc.type,
          fileUrl: doc.fileUrl,
          fileName: doc.fileName,
          createdAt: doc.createdAt,
        })),
        assignments: course.assignments.map((assignment) => ({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          maxScore: assignment.maxScore,
        })),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un cours
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
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

    const course = await prisma.course.findUnique({
      where: { id: resolvedParams.id },
      include: { teacher: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    // Vérifier que l'enseignant peut modifier son cours
    if (user.role === "TEACHER") {
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: user.id },
      });
      if (course.teacherId !== teacherProfile?.id) {
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }
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
      status,
    } = data;

    // Vérifier si le nouveau code existe déjà (si changé)
    if (code && code !== course.code) {
      const existingCourse = await prisma.course.findUnique({
        where: { code },
      });
      if (existingCourse) {
        return NextResponse.json(
          { error: "Le code du cours existe déjà" },
          { status: 409 }
        );
      }
    }

    const updatedCourse = await prisma.course.update({
      where: { id: resolvedParams.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(code && { code }),
        ...(category && { category }),
        ...(price && { price: parseFloat(price) }),
        ...(duration && { duration }),
        ...(maxStudents && { maxStudents: parseInt(maxStudents) }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(status && { status }),
        updatedAt: new Date(),
      },
      include: {
        teacher: {
          include: { user: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      course: {
        id: updatedCourse.id,
        title: updatedCourse.title,
        description: updatedCourse.description,
        code: updatedCourse.code,
        category: updatedCourse.category,
        price: updatedCourse.price,
        duration: updatedCourse.duration,
        maxStudents: updatedCourse.maxStudents,
        status: updatedCourse.status,
        startDate: updatedCourse.startDate,
        endDate: updatedCourse.endDate,
        teacher: {
          id: updatedCourse.teacher.id,
          name: `${updatedCourse.teacher.user.firstName} ${updatedCourse.teacher.user.lastName}`,
          department: updatedCourse.teacher.department,
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cours:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un cours
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
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

    const course = await prisma.course.findUnique({
      where: { id: resolvedParams.id },
      include: { teacher: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    // Vérifier que l'enseignant peut supprimer son cours
    if (user.role === "TEACHER") {
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: user.id },
      });
      if (course.teacherId !== teacherProfile?.id) {
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }
    }

    // Vérifier s'il y a des inscriptions actives
    const activeEnrollments = await prisma.courseEnrollment.count({
      where: {
        courseId: resolvedParams.id,
        isActive: true,
      },
    });

    if (activeEnrollments > 0) {
      return NextResponse.json(
        {
          error:
            "Impossible de supprimer un cours avec des inscriptions actives",
        },
        { status: 400 }
      );
    }

    await prisma.course.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({
      success: true,
      message: "Cours supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du cours:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
