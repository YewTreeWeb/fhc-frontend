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
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  /**
   * Calculates the completion percentage of the questionnaire based on answered questions
   * and updates the progress state with the rounded percentage value.
   */
  function calculatePercentage() {
    const completionPercentage = Math.round(
      (answers.length / questionList.length) * 100
    ).toFixed();
    const percentage = isNaN(Number(completionPercentage))
      ? 0
      : completionPercentage;
    setProgress(Number(percentage));
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
      setError(false);
      const data = {
        answers: answers.map((answer) => {
          return {
            questionId: answer.id,
            answer: answer.score,
          };
        }),
      };
      console.log('🚀 ~ Questionaire ~ data:', data);
      axios
        .post(`https://fhc-api.onrender.com/submissions?user=${user}`, data)
        .then((res) => {
          console.log(res);
          setCompleted(true);
        })
        .catch(() => {
          console.error(error);
          setError(true);
        });
    }
  }, [answers, finished]);

  return (
    <div className="border border-black/20 shadow-md mt-10 rounded">
      <header className="border-b border-black/30 h-[6.375rem] flex flex-col items-start justify-center px-6">
        <h3 className="font-bold">Your progress - {progress}%</h3>
        <div></div>
      </header>
      <main
        role="main"
        aria-label="Career Assessment Questionnaire"
        className="flex flex-col"
        {...props}
      >
        <div
          className="h-[30.0625rem] overflow-y-scroll snap-y snap-mandatory"
          role="form"
          aria-label={`Questionnaire with ${questionList.length} questions`}
          aria-live="polite"
        >
          {questionList.map((question, i) => {
            const existingAnswer = answers.find(
              (answer) => answer.id === question.id
            );

            return (
              // To fix: Questions are not being properly contained
              // Use slider for better implementation and check height properties
              <Question
                key={question.id}
                {...question}
                total={questionList.length}
                number={i + 1}
                answer={(score: number) => {
                  const updatedAnswers = answers.filter(
                    (answer) => answer.id !== question.id
                  );
                  setAnswers([...updatedAnswers, { score, id: question.id }]);
                }}
                initialValue={existingAnswer?.score}
              />
            );
          })}
          {!loading && answers.length === questionList.length && (
            <div className="h-[30.0625rem] flex items-center justify-center snap-start">
              <Button size="sm" onClick={() => setFinished(true)}>
                Finish
              </Button>
              {error && (
                <p className="text-md text-red-700">
                  There was an issue when submitting your answers. Please try
                  again.
                </p>
              )}
            </div>
          )}
        </div>
        {loading && (
          <div role="status" aria-live="polite" aria-label="Loading status">
            <p className="font-bold text-base">
              Loading your personalized career assessment...
            </p>
          </div>
        )}
        {/* Add banner, button and styling */}
        {completed && (
          <dialog>
            <h2>Completed</h2>
          </dialog>
        )}
      </main>
    </div>
  );
};

export default Questionaire;
