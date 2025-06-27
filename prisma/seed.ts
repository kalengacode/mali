import {
  PrismaClient,
  UserRole,
  CourseStatus,
  ExamType,
  ExamStatus,
  PaymentStatus,
  DocumentType,
} from "../app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  // Nettoyer la base de données
  await prisma.systemSettings.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.document.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();

  // Hacher les mots de passe
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Créer des utilisateurs administrateurs
  const admin1 = await prisma.user.create({
    data: {
      email: "admin@mali.cd",
      password: hashedPassword,
      firstName: "Jean",
      lastName: "Mukendi",
      phone: "+243123456789",
      role: UserRole.ADMIN,
      adminProfile: {
        create: {
          adminId: "ADM001",
          department: "Administration Générale",
          permissions: [
            "MANAGE_USERS",
            "MANAGE_COURSES",
            "MANAGE_PAYMENTS",
            "VIEW_ANALYTICS",
          ],
        },
      },
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      email: "marie.admin@mali.cd",
      password: hashedPassword,
      firstName: "Marie",
      lastName: "Tshimanga",
      phone: "+243123456790",
      role: UserRole.ADMIN,
      adminProfile: {
        create: {
          adminId: "ADM002",
          department: "Affaires Académiques",
          permissions: ["MANAGE_COURSES", "MANAGE_SCHEDULES", "VIEW_ANALYTICS"],
        },
      },
    },
  });

  // Créer des enseignants
  const teacher1 = await prisma.user.create({
    data: {
      email: "prof.kamau@mali.cd",
      password: hashedPassword,
      firstName: "Joseph",
      lastName: "Kamau",
      phone: "+243123456791",
      role: UserRole.TEACHER,
      teacherProfile: {
        create: {
          teacherId: "PROF001",
          department: "Informatique",
          specialization: "Développement Web",
          biography:
            "Expert en développement web avec 8 ans d'expérience dans l'enseignement.",
          experience: 8,
        },
      },
    },
    include: {
      teacherProfile: true,
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: "prof.nzuzi@mali.cd",
      password: hashedPassword,
      firstName: "Grace",
      lastName: "Nzuzi",
      phone: "+243123456792",
      role: UserRole.TEACHER,
      teacherProfile: {
        create: {
          teacherId: "PROF002",
          department: "Mathématiques",
          specialization: "Analyse Numérique",
          biography:
            "Docteure en mathématiques appliquées, spécialisée en analyse numérique.",
          experience: 12,
        },
      },
    },
    include: {
      teacherProfile: true,
    },
  });

  const teacher3 = await prisma.user.create({
    data: {
      email: "prof.mbuyi@mali.cd",
      password: hashedPassword,
      firstName: "Emmanuel",
      lastName: "Mbuyi",
      phone: "+243123456793",
      role: UserRole.TEACHER,
      teacherProfile: {
        create: {
          teacherId: "PROF003",
          department: "Économie",
          specialization: "Économie du Développement",
          biography:
            "Économiste spécialisé dans le développement économique africain.",
          experience: 6,
        },
      },
    },
    include: {
      teacherProfile: true,
    },
  });

  // Créer des étudiants
  const students = [];
  const studentData = [
    {
      email: "etudiant1@mali.cd",
      firstName: "Pacifique",
      lastName: "Kabongo",
      studentId: "ETU001",
    },
    {
      email: "etudiant2@mali.cd",
      firstName: "Esperance",
      lastName: "Mwamba",
      studentId: "ETU002",
    },
    {
      email: "etudiant3@mali.cd",
      firstName: "Divine",
      lastName: "Kasongo",
      studentId: "ETU003",
    },
    {
      email: "etudiant4@mali.cd",
      firstName: "Gloire",
      lastName: "Mulumba",
      studentId: "ETU004",
    },
    {
      email: "etudiant5@mali.cd",
      firstName: "Josué",
      lastName: "Kiala",
      studentId: "ETU005",
    },
    {
      email: "etudiant6@mali.cd",
      firstName: "Ruth",
      lastName: "Ngandu",
      studentId: "ETU006",
    },
    {
      email: "etudiant7@mali.cd",
      firstName: "Samuel",
      lastName: "Ilunga",
      studentId: "ETU007",
    },
    {
      email: "etudiant8@mali.cd",
      firstName: "Déborah",
      lastName: "Kabila",
      studentId: "ETU008",
    },
  ];

  for (const data of studentData) {
    const student = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: `+24312345${Math.floor(Math.random() * 9000) + 1000}`,
        role: UserRole.STUDENT,
        studentProfile: {
          create: {
            studentId: data.studentId,
            dateOfBirth: new Date(
              1995 + Math.floor(Math.random() * 8),
              Math.floor(Math.random() * 12),
              Math.floor(Math.random() * 28) + 1
            ),
            address: `Kinshasa, RDC`,
            emergencyContact: `+24312345${
              Math.floor(Math.random() * 9000) + 1000
            }`,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });
    students.push(student);
  }

  // Créer des cours
  const course1 = await prisma.course.create({
    data: {
      title: "Développement Web avec React",
      description:
        "Apprenez à créer des applications web modernes avec React, Next.js et TypeScript.",
      code: "WEB101",
      category: "Informatique",
      price: 250.0,
      duration: "12 semaines",
      maxStudents: 30,
      status: CourseStatus.ACTIVE,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-30"),
      teacherId: teacher1.teacherProfile!.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Mathématiques Appliquées",
      description:
        "Cours avancé de mathématiques appliquées pour l'ingénierie et l'informatique.",
      code: "MATH201",
      category: "Mathématiques",
      price: 200.0,
      duration: "16 semaines",
      maxStudents: 25,
      status: CourseStatus.ACTIVE,
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-05-15"),
      teacherId: teacher2.teacherProfile!.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: "Économie du Développement",
      description:
        "Analyse des théories et pratiques du développement économique en Afrique.",
      code: "ECO301",
      category: "Économie",
      price: 180.0,
      duration: "14 semaines",
      maxStudents: 20,
      status: CourseStatus.ACTIVE,
      startDate: new Date("2024-02-15"),
      endDate: new Date("2024-05-30"),
      teacherId: teacher3.teacherProfile!.id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: "Introduction à la Programmation",
      description: "Cours d'introduction à la programmation avec Python.",
      code: "PROG101",
      category: "Informatique",
      price: 150.0,
      duration: "10 semaines",
      maxStudents: 35,
      status: CourseStatus.ACTIVE,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-05-15"),
      teacherId: teacher1.teacherProfile!.id,
    },
  });

  // Inscrire des étudiants aux cours
  const courses = [course1, course2, course3, course4];
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    // Chaque étudiant s'inscrit à 2-3 cours
    const numCourses = Math.floor(Math.random() * 2) + 2;
    const shuffledCourses = courses.sort(() => 0.5 - Math.random());

    for (let j = 0; j < numCourses; j++) {
      await prisma.courseEnrollment.create({
        data: {
          studentId: student.studentProfile!.id,
          courseId: shuffledCourses[j].id,
          grade:
            Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 12 : null, // Notes entre 12-16 ou null
        },
      });
    }
  }

  // Créer des emplois du temps
  const scheduleData = [
    {
      courseId: course1.id,
      dayOfWeek: 1,
      startTime: "08:00",
      endTime: "10:00",
      room: "Lab Info A",
      type: "COURSE",
    },
    {
      courseId: course1.id,
      dayOfWeek: 3,
      startTime: "10:00",
      endTime: "12:00",
      room: "Lab Info A",
      type: "LAB",
    },
    {
      courseId: course2.id,
      dayOfWeek: 2,
      startTime: "08:00",
      endTime: "10:00",
      room: "Salle 201",
      type: "COURSE",
    },
    {
      courseId: course2.id,
      dayOfWeek: 4,
      startTime: "14:00",
      endTime: "16:00",
      room: "Salle 201",
      type: "COURSE",
    },
    {
      courseId: course3.id,
      dayOfWeek: 1,
      startTime: "14:00",
      endTime: "16:00",
      room: "Salle 301",
      type: "COURSE",
    },
    {
      courseId: course3.id,
      dayOfWeek: 5,
      startTime: "10:00",
      endTime: "12:00",
      room: "Salle 301",
      type: "COURSE",
    },
    {
      courseId: course4.id,
      dayOfWeek: 2,
      startTime: "10:00",
      endTime: "12:00",
      room: "Lab Info B",
      type: "COURSE",
    },
    {
      courseId: course4.id,
      dayOfWeek: 4,
      startTime: "08:00",
      endTime: "10:00",
      room: "Lab Info B",
      type: "LAB",
    },
  ];

  for (const schedule of scheduleData) {
    await prisma.schedule.create({ data: schedule });
  }

  // Créer des examens
  const exam1 = await prisma.exam.create({
    data: {
      title: "Examen Mi-parcours React",
      description: "Évaluation des concepts fondamentaux de React",
      type: ExamType.MIDTERM,
      status: ExamStatus.SCHEDULED,
      date: new Date("2024-03-15"),
      startTime: "09:00",
      duration: 120,
      maxScore: 20.0,
      room: "Lab Info A",
      instructions: "Apportez votre ordinateur portable. Examen pratique.",
      courseId: course1.id,
      teacherId: teacher1.teacherProfile!.id,
    },
  });

  const exam2 = await prisma.exam.create({
    data: {
      title: "Test Mathématiques Appliquées",
      description: "Quiz sur les dérivées et intégrales",
      type: ExamType.QUIZ,
      status: ExamStatus.COMPLETED,
      date: new Date("2024-02-20"),
      startTime: "10:00",
      duration: 60,
      maxScore: 10.0,
      room: "Salle 201",
      courseId: course2.id,
      teacherId: teacher2.teacherProfile!.id,
    },
  });

  // Créer des résultats d'examen pour l'examen terminé
  const enrolledStudentsForMath = await prisma.courseEnrollment.findMany({
    where: { courseId: course2.id },
    include: { student: true },
  });

  for (const enrollment of enrolledStudentsForMath) {
    await prisma.examResult.create({
      data: {
        examId: exam2.id,
        studentId: enrollment.studentId,
        score: Math.floor(Math.random() * 6) + 5, // Score entre 5-10
        maxScore: 10.0,
        grade: Math.random() > 0.2 ? "B" : "C",
        feedback: "Bon travail, continuez ainsi !",
        submittedAt: new Date("2024-02-20T11:00:00"),
        gradedAt: new Date("2024-02-22T15:00:00"),
      },
    });
  }

  // Créer des devoirs
  const assignment1 = await prisma.assignment.create({
    data: {
      title: "Projet React - Application Todo",
      description:
        "Créez une application Todo complète avec React et TypeScript",
      dueDate: new Date("2024-03-30"),
      maxScore: 25.0,
      instructions:
        "L'application doit inclure : ajout, suppression, modification et filtrage des tâches.",
      courseId: course1.id,
    },
  });

  // Créer des paiements
  for (let i = 0; i < 5; i++) {
    const student = students[i];
    await prisma.payment.create({
      data: {
        userId: student.id,
        amount: 250.0,
        currency: "USD",
        status: i < 3 ? PaymentStatus.COMPLETED : PaymentStatus.PENDING,
        method: i % 2 === 0 ? "MOBILE_MONEY" : "BANK_TRANSFER",
        reference: `PAY${Date.now()}${i}`,
        description: "Frais de scolarité - Semestre 1",
      },
    });
  }

  // Créer des documents
  const documents = [
    {
      title: "Guide de démarrage React",
      description: "Document d'introduction à React pour débutants",
      type: DocumentType.COURSE_MATERIAL,
      fileUrl: "/documents/react-guide.pdf",
      fileName: "react-guide.pdf",
      fileSize: 1024000,
      mimeType: "application/pdf",
      isPublic: true,
      uploadedBy: teacher1.id,
      courseId: course1.id,
    },
    {
      title: "Exercices Mathématiques",
      description: "Recueil d'exercices pratiques",
      type: DocumentType.COURSE_MATERIAL,
      fileUrl: "/documents/math-exercises.pdf",
      fileName: "math-exercises.pdf",
      fileSize: 2048000,
      mimeType: "application/pdf",
      isPublic: false,
      uploadedBy: teacher2.id,
      courseId: course2.id,
    },
    {
      title: "Règlement Intérieur",
      description: "Règlement de l'établissement",
      type: DocumentType.POLICY,
      fileUrl: "/documents/reglement.pdf",
      fileName: "reglement.pdf",
      fileSize: 512000,
      mimeType: "application/pdf",
      isPublic: true,
      uploadedBy: admin1.id,
    },
  ];

  for (const doc of documents) {
    await prisma.document.create({ data: doc });
  }

  // Créer des messages
  const messages = [
    {
      senderId: teacher1.id,
      receiverId: students[0].id,
      subject: "Félicitations pour votre projet",
      content:
        "Bonjour, je voulais vous féliciter pour l'excellent travail rendu sur le projet React. Continuez ainsi !",
      isRead: false,
    },
    {
      senderId: students[1].id,
      receiverId: teacher2.id,
      subject: "Question sur le cours de mathématiques",
      content:
        "Bonjour Professeur, j'ai une question concernant les dérivées partielles vues en cours. Pourriez-vous m'expliquer à nouveau ?",
      isRead: true,
    },
    {
      senderId: admin1.id,
      receiverId: students[2].id,
      subject: "Rappel de paiement",
      content:
        "Bonjour, nous vous rappelons que votre paiement pour le semestre est en attente. Merci de régulariser votre situation.",
      isRead: false,
    },
  ];

  for (const message of messages) {
    await prisma.message.create({ data: message });
  }

  // Créer des notifications
  for (const student of students.slice(0, 4)) {
    await prisma.notification.create({
      data: {
        userId: student.id,
        title: "Nouveau cours disponible",
        message:
          'Un nouveau cours "Introduction à la Programmation" est maintenant disponible.',
        type: "INFO",
        isRead: Math.random() > 0.5,
      },
    });

    await prisma.notification.create({
      data: {
        userId: student.id,
        title: "Examen programmé",
        message: "Votre examen de React est programmé pour le 15 mars à 9h00.",
        type: "WARNING",
        isRead: false,
      },
    });
  }

  // Créer des paramètres système
  const systemSettings = [
    {
      key: "SCHOOL_NAME",
      value: "MALI - Plateforme Éducative",
      type: "STRING",
    },
    { key: "ACADEMIC_YEAR", value: "2023-2024", type: "STRING" },
    { key: "DEFAULT_CURRENCY", value: "USD", type: "STRING" },
    { key: "MAX_STUDENTS_PER_COURSE", value: "50", type: "NUMBER" },
    { key: "ENABLE_NOTIFICATIONS", value: "true", type: "BOOLEAN" },
    { key: "SEMESTER_START_DATE", value: "2024-01-15", type: "STRING" },
    { key: "SEMESTER_END_DATE", value: "2024-06-30", type: "STRING" },
  ];

  for (const setting of systemSettings) {
    await prisma.systemSettings.create({ data: setting });
  }

  console.log("✅ Seeding terminé avec succès!");
  console.log(`📊 Données créées:`);
  console.log(`   - ${await prisma.user.count()} utilisateurs`);
  console.log(`   - ${await prisma.course.count()} cours`);
  console.log(`   - ${await prisma.courseEnrollment.count()} inscriptions`);
  console.log(`   - ${await prisma.exam.count()} examens`);
  console.log(`   - ${await prisma.payment.count()} paiements`);
  console.log(`   - ${await prisma.document.count()} documents`);
  console.log(`   - ${await prisma.message.count()} messages`);
  console.log(`   - ${await prisma.notification.count()} notifications`);

  console.log("\n🔑 Comptes de test créés:");
  console.log("Admin: admin@mali.cd / password123");
  console.log("Enseignant: prof.kamau@mali.cd / password123");
  console.log("Étudiant: etudiant1@mali.cd / password123");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
