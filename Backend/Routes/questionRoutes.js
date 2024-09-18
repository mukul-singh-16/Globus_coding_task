const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { stringify } = require('querystring');

const prisma = new PrismaClient();


// Fetch MCQ questions 
router.get('/api/questions/mcq', async (req, res) => {
    const { subject , number } = req.query; // Get number from query params
  
    try {
        // console.log("hello")
      // Fetch MCQ questions based on the number provided
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'MCQ',
          subject:subject
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

    const formattedQuestions = questions.map((question) => ({
      ...question,
      options: JSON.parse(question.options), // Parsing here
    }));

      res.json(formattedQuestions);

    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch MCQ questions' });
    }
  });
  
// Fetch Fillups questions 
router.get('/api/questions/fillups', async (req, res) => {
    const {subject, number } = req.query;
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'FILL_IN_THE_BLANK',
          subject:subject
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
    const {subject , number } = req.query;
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          question_type: 'DESCRIPTIVE',
          subject:subject
        },
        select: {
          id: true,
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

    // console.log(answers);
    // answers contain question id and user answer'
  
    try {

      let score = 0; 
      let report = []; //  to store report for user
      let gradingNotes="";
     
  
      // loop for each user answer
      for (const answer of answers) {

        const { question_id, user_answer } = answer;


        
        // console.log(question_id);
        // Fetch the question from the database based on question_id
       
        const question = await prisma.question.findUnique({
          where: { id: parseInt(question_id) }
        });
      


        if (!question) {
          return res.status(404).json({ error: `Question with ID ${question_id} not found` });
        }

        // console.log("check  " + score);


  
        let isCorrect = false; // to store user answer is correct or not
        let ans="";

  
        // Check the question type and compare answers
        if (question.question_type === 'MCQ') {
          ans=question.correct_answer;

          // compare the user's answer with the correct answer

          if (user_answer === question.correct_answer) {
            isCorrect = true;
            score += 1; // score++;
          }
          // console.log("mcq score " +score);

        } 
        else if(question.question_type ==='FILL_IN_THE_BLANK') {
          ans=question.correct_answer;
          // compare fillups without case 
          if (user_answer.toLowerCase() === question.correct_answer.toLowerCase()) {
            isCorrect = true;
            score += 1; // score++
          }
          // console.log("filup score "+ score);
        }
        else if (question.question_type === 'DESCRIPTIVE') {
          
          ans=null;

          if(user_answer.length <0)
          {
            gradingNotes = 'Answer length is to big.';
            break;
          }
          
          const keywords = question.correct_answer; 
          let keywordCount = 0;

          const concatenatedString = question.correct_answer+""; 

         // Step 2: Remove any surrounding square brackets and spaces
          const cleanString = concatenatedString.replace(/[\[\]]/g, '').trim();

          // Step 3: Split the string into individual values based on the quotes
          const values = cleanString.split(/","|"\s*,\s*"/).map(val => val.replace(/"/g, '').trim());

         

        
          values.forEach(value => {
            let word =value.trim().toLowerCase();
            // console.log(word);
            // console.log("word");
            if (user_answer.toLowerCase().includes(word)) {
              keywordCount++;
            }
          });
  
          // Decide if the answer is "correct" based on keyword count
          if (keywordCount > 0) {
            keywordCount =Math.min(keywordCount,2);
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
          correct_answer: ans,
          is_correct: isCorrect,
          grading_notes: gradingNotes // Include notes for descriptive grading
        });


        // console.log(report);
      
      }

      res.status(200).json({ score, report });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process answers' });
    }
  });




module.exports= router;