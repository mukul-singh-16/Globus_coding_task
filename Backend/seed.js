// seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// async function main() {
//   try {
  //   const result = await prisma.question.deleteMany({
  //     where: {
  //       question_type: 'DESCRIPTIVE',
  //     },
  //   });
  //   console.log(`Deleted ${result.count} questions`);
  // } catch (error) {
  //   console.error('Error deleting questions:', error);
  // }



// }





async function main() {
  try{
    
  await prisma.question.createMany({
    data: [
      {
        question_text: 'Describe the process of photosynthesis.',
        question_type: 'DESCRIPTIVE',
        correct_answer: 'photosynthesis, sunlight, chlorophyll, carbon dioxide',
      },
      {
        question_text: 'Explain the theory of relativity.',
        question_type: 'DESCRIPTIVE',
        correct_answer: 'Theory of relativity, space-time, gravity, Einstein',
      },
      {
        question_text: 'What are the key principles of quantum mechanics?',
        question_type: 'DESCRIPTIVE',
        correct_answer: 'Quantum mechanics, uncertainty principle, wave-particle duality, superposition',
      },
      {
        question_text: 'Describe the role of mitochondria in a cell.',
        question_type: 'DESCRIPTIVE',
        correct_answer: 'Mitochondria produce ATP, the cells energy currency, through cellular respiration.',
      }
    ]
  });
    console.log('Questions inserted successfully');
  }
  catch(e)
  {
    console.log(e);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
