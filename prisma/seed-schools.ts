import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function seedSchools() {
  console.log('🏫 Ajout des écoles de démonstration...');

  // Écoles de démonstration
  const schools = [
    {
      name: 'Université de Kinshasa',
      code: 'UNIKIN',
      address: 'Avenue de l\'Université, Mont-Amba, Kinshasa',
      phone: '+243 81 234 5678',
      email: 'info@unikin.ac.cd',
      website: 'https://www.unikin.ac.cd',
      description: 'Première université de la République Démocratique du Congo, fondée en 1954. Excellence académique et recherche de pointe.'
    },
    {
      name: 'Université Protestante au Congo',
      code: 'UPC',
      address: 'Avenue de la Libération, Kinshasa',
      phone: '+243 81 345 6789',
      email: 'info@upc.ac.cd',
      website: 'https://www.upc.ac.cd',
      description: 'Université privée reconnue pour ses programmes en théologie, sciences sociales et économiques.'
    },
    {
      name: 'Institut Supérieur de Commerce',
      code: 'ISC',
      address: 'Boulevard du 30 Juin, Gombe, Kinshasa',
      phone: '+243 81 456 7890',
      email: 'contact@isc-kinshasa.cd',
      website: 'https://www.isc-kinshasa.cd',
      description: 'Institut spécialisé dans la formation commerciale et managériale avec plus de 30 ans d\'expérience.'
    },
    {
      name: 'Université Pédagogique Nationale',
      code: 'UPN',
      address: 'Croisement des Avenues de la Science et Pedagogique, Binza',
      phone: '+243 81 567 8901',
      email: 'info@upn.ac.cd',
      website: 'https://www.upn.ac.cd',
      description: 'Université spécialisée dans la formation des enseignants et cadres éducatifs du pays.'
    },
    {
      name: 'École Supérieure de Technologies',
      code: 'EST',
      address: 'Avenue des Ingénieurs, Lemba, Kinshasa',
      phone: '+243 81 678 9012',
      email: 'admission@est-kinshasa.cd',
      website: 'https://www.est-kinshasa.cd',
      description: 'École d\'ingénierie moderne spécialisée en technologies de l\'information et télécommunications.'
    },
    {
      name: 'Institut Supérieur de Statistique',
      code: 'ISS',
      address: 'Avenue Kasa-Vubu, Kalamu, Kinshasa',
      phone: '+243 81 789 0123',
      email: 'info@iss.ac.cd',
      website: 'https://www.iss.ac.cd',
      description: 'Institut spécialisé en statistiques, démographie et recherche quantitative.'
    }
  ];

  for (const schoolData of schools) {
    try {
      const existingSchool = await prisma.school.findUnique({
        where: { code: schoolData.code }
      });

      if (!existingSchool) {
        const school = await prisma.school.create({
          data: schoolData
        });
        console.log(`✅ École créée: ${school.name} (${school.code})`);
      } else {
        console.log(`⚠️  École existe déjà: ${schoolData.name} (${schoolData.code})`);
      }
    } catch (error) {
      console.error(`❌ Erreur pour ${schoolData.name}:`, error);
    }
  }

  // Associer les utilisateurs existants à des écoles
  console.log('\n🔗 Association des utilisateurs aux écoles...');
  
  const users = await prisma.user.findMany({
    where: { schoolId: null }
  });

  const schoolsList = await prisma.school.findMany();
  
  for (const user of users) {
    // Assigner les utilisateurs aux écoles de manière distribuée
    const randomSchool = schoolsList[Math.floor(Math.random() * schoolsList.length)];
    
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { schoolId: randomSchool.id }
      });
      console.log(`✅ ${user.firstName} ${user.lastName} → ${randomSchool.name}`);
    } catch (error) {
      console.error(`❌ Erreur pour ${user.firstName}:`, error);
    }
  }

  console.log('\n🎉 Écoles de démonstration ajoutées avec succès !');
}

seedSchools()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 