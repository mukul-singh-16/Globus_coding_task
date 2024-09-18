import { useState, useEffect} from 'react';
import axios from 'axios';
import './Quizform.css';
import { useNavigate } from 'react-router-dom';



const Quizform = () => {
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [fillupQuestions, setFillupQuestions] = useState([]);
  const [descriptiveQuestions, setDescriptiveQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch questions when the component loads
    const fetchQuestions = async () => {
      try {
        const mcqResponse = await axios.get('http://localhost:5000/api/questions/mcq?number=2');
        const fillupResponse = await axios.get('http://localhost:5000/api/questions/fillups?number=1');
        const descriptiveResponse = await axios.get('http://localhost:5000/api/questions/descriptive?number=1');

        setMcqQuestions(mcqResponse.data);
        setFillupQuestions(fillupResponse.data);
        setDescriptiveQuestions(descriptiveResponse.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answers', {
        answers: Object.entries(answers).map(([question_id, user_answer]) => ({
          question_id,
          user_answer,
        })),
      });

      // Navigate to results page with score and report in state
      navigate('/results', { state: { score: response.data.score, report: response.data.report } });

    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };




  return (
    <form onSubmit={handleSubmit}>
      <h2>MCQ Questions</h2>
      {mcqQuestions.map((question) => (
        <div key={question.id}>
          <p>{question.question_text}</p>
          { question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`mcq-${question.id}`}
                value={option}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <h2>Fill-in-the-Blank Questions</h2>
      {fillupQuestions.map((question) => (
        <div key={question.id}>
          <p>{question.question_text}</p>
          <input
            type="text"
            placeholder="Enter your answer"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}

      <h2>Descriptive Questions</h2>
      {descriptiveQuestions.map((question) => (
        <div key={question.id}>
          <p>{question.question_text}</p>
          <textarea
            maxLength="50"
            placeholder="Write your answer (max 50 words)"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Quizform;
