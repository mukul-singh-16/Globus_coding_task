const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// Fetch MCQ questions 
router.get('/api/questions/mcq', async (req, res) => {
    const { number } = req.query; // Get number from query params
  
    try {
        console.log("hello")
      // Fetch MCQ questions based on the number provided
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'MCQ',
        },
        select: {
          id: true,
          question_text: true,
          question_type:true,
          options: true,  
        },
        take: number > 0 ? parseInt(number) : undefined
      });

    //   console.log(questions);
      res.json(questions);

    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch MCQ questions' });
    }
  });
  
// Fetch Fillups questions 
router.get('/api/questions/fillups', async (req, res) => {
    const { number } = req.query;
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'FILL_IN_THE_BLANK',
        },
        select: {
          id: true,
          question_type:true,
          question_text: true, // No correct answer should be sent
        },
        take: number > 0 ? parseInt(number) : undefined
      });
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Fill-in-the-Blank questions' });
    }
  });
  
// Fetch Descriptive questions 
  router.get('/api/questions/descriptive', async (req, res) => {
    const { number } = req.query;
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'DESCRIPTIVE',
        },
        select: {
          id: true,
          question_type:true,
          question_text: true,
        },
        take: number > 0 ? parseInt(number) : undefined
      });
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Descriptive questions' });
    }
  });
  


  //check answer on submit and return calculated score and repote of user
router.post('/api/submit-answers', async (req, res) => {
    const { answers } = req.body; 
    // answers contain question id and user answer'
  
    try {

      let score = 0; 
      let report = []; //  to store report for user
  
      // loop for each user answer
      for (const answer of answers) {

        const { question_id, user_answer } = answer;
  
        // Fetch the question from the database based on question_id
        const question = await prisma.question.findUnique({
          where: { id: question_id },
        });
  
        let isCorrect = false; // to store user answer is correct or not
  
        // Check the question type and compare answers
        if (question.question_type === 'MCQ') {

          // compare the user's answer with the correct answer

          if (user_answer === question.correct_answer) {
            isCorrect = true;
            score += 1; // score++;
          }

        } 
        else if(question.question_type ==='FILL_IN_THE_BLANK') {
          // compare fillups without case 
          if (user_answer.toLowerCase() === question.correct_answer.toLowerCase()) {
            isCorrect = true;
            score += 1; // score++
          }
        }
        else if (question.question_type === 'DESCRIPTIVE') {


          if(user_answer.length <0)
          {
            gradingNotes = 'Answer length is to big.';
            break;
          }
          // for this we use keyword matching
          const keywords = question.correct_answer.split(','); // Assume keywords are comma-separated in DB
          let keywordCount = 0;
  
          // Check how many keywords the user answer contains
          keywords.forEach(keyword => {
            if (user_answer.toLowerCase().includes(keyword.trim().toLowerCase())) {
              keywordCount++;
            }
          });
  
          // Decide if the answer is "correct" based on keyword count
          if (keywordCount > 0) {
            score += keywordCount; // Increment score by keyword count
            isCorrect = true;
            gradingNotes = `${keywordCount} keywords matched.`;
          } else {
            gradingNotes = 'No relevant keywords found.';
          }
        }
  
        // add all report

        report.push({
          question_id: question.id,
          question_text: question.question_text,
          user_answer: user_answer,
          correct_answer: question.correct_answer,
          is_correct: isCorrect,
          grading_notes: gradingNotes // Include notes for descriptive grading
        });
      
      }

      res.send(200).json({ score, report });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process answers' });
    }
  });




module.exports= router;