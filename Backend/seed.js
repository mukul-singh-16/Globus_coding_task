// seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {
  try {
    const result = await prisma.question.deleteMany({
      where: {
        question_type: 'DESCRIPTIVE',
      },
    });
    console.log(`Deleted ${result.count} questions`);
  } catch (error) {
    console.error('Error deleting questions:', error);
  }
}




// async function main() {
//   await prisma.question.createMany({
//     data: [
//       {
//         question_text: 'What is the capital of France?',
//         question_type: 'MCQ',
//         options: JSON.stringify(['Paris', 'Berlin', 'Rome', 'Madrid']),
//         correct_answer: 'Paris',
//       },
//       {
//         question_text: 'Fill in the blank: The earth revolves around the ___?',
//         question_type: 'FILL_IN_THE_BLANK',
//         correct_answer: 'sun',
//       },
//       {
//         question_text: 'Describe how the internet works in 50 words or less.',
//         question_type: 'DESCRIPTIVE',
//       },
//     ],
//   });

//   console.log('Questions inserted successfully');
// }

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
