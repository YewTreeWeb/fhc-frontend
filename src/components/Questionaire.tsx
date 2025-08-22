import axios from 'axios';
import { useEffect, useState } from 'react';
import type { QuestionList, QuestionProps } from '../types';
import Button from './Button';
import Question from './Question';

type Props = {
  questions: QuestionList;
  loading: boolean;
  user: string;
};

type AnswerProps = {
  score: number;
  id: string;
}[];

const Questionaire = ({ questions, loading = true, user, ...props }: Props) => {
  const [questionList, setQuestionList] = useState<QuestionProps[]>([]);
  const [answers, setAnswers] = useState<AnswerProps>([]);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * Calculates the completion percentage of the questionnaire based on answered questions
   * and updates the progress state with the rounded percentage value.
   */
  function calculatePercentage() {
    const completionPercentage = Math.round(
      (answers.length / questionList.length) * 100
    );
    setProgress(Number(completionPercentage.toFixed(0)));
  }

  /**
   * Loads previously saved answers and completion status from session storage on component mount.
   * Handles both new format (object with answers and finished properties) and legacy format (answers array only).
   * Logs errors if stored data cannot be parsed.
   */
  useEffect(() => {
    const storedData = sessionStorage.getItem('answers');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.answers) {
          setAnswers(parsedData.answers);
          setFinished(parsedData.finished || false);
        } else {
          // Handle old format (just answers array)
          setAnswers(parsedData);
        }
      } catch (error) {
        console.error('Failed to parse stored answers:', error);
      }
    }
  }, []);

  /**
   * Updates the question list when questions data is loaded and available.
   * Only sets the question list if loading is complete and questions exist.
   */
  useEffect(() => {
    if (!loading && questions && questions.questions.length > 0) {
      setQuestionList([...questions.questions]);
    }
  }, [loading, questions]);

  /**
   * Handles answer updates, progress calculation, session storage, and submission.
   * Calculates completion percentage, saves current state to session storage,
   * and submits answers to the API when the questionnaire is finished.
   */
  useEffect(() => {
    calculatePercentage();
    sessionStorage.setItem('answers', JSON.stringify({ answers, finished }));
    if (finished && answers.length > 0) {
      const data = answers.map((answer) => {
        return {
          questionId: answer.id,
          answer: answer.score,
        };
      });
      axios.post(`https://fhc-api.onrender.com/submissions?user=${user}`, data);
    }
  }, [answers, finished]);

  return (
    <div className="border border-black/20 shadow-md mt-10 rounded">
      <header className="border-b border-black/30 h-[6.375rem] flex flex-col items-start justify-center px-6">
        <h3 className="font-bold">Your progress - {progress}%</h3>
        <div></div>
      </header>
      <main role="main" aria-label="Career Assessment Questionnaire" {...props}>
        <form
          onSubmit={() => setFinished(true)}
          aria-label={`Questionnaire with ${questionList.length} questions`}
          aria-live="polite"
        >
          <div className="h-[30.0625rem] overflow-scroll flex flex-col items-center justify-center m-auto px-20">
            {questionList.map((question, i) => {
              const existingAnswer = answers.find(
                (answer) => answer.id === question.id
              );

              return (
                <Question
                  key={question.id}
                  {...question}
                  total={questionList.length}
                  number={i + 1}
                  answer={(score: number) => {
                    setAnswers([...answers, { score, id: question.id }]);
                  }}
                  initialValue={existingAnswer?.score}
                />
              );
            })}
          </div>
          {answers.length === questionList.length && (
            <Button type="submit" size="sm" onClick={() => setFinished(true)}>
              Finish
            </Button>
          )}
        </form>
        {loading && (
          <div role="status" aria-live="polite" aria-label="Loading status">
            <p>Loading your personalized career assessment...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Questionaire;
