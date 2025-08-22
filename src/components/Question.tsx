import { useState } from 'react';

type Props = {
  total: number;
  number: number;
  text: string;
  id: string;
  answer: (score: number) => void;
  className?: string;
  initialValue?: number;
};

const Question = ({
  total,
  number,
  text,
  id,
  answer,
  className = '',
  initialValue,
  ...props
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(
    initialValue ?? null
  );

  if (!total || total === 0) {
    console.error(
      'A total amount of questions must be provided and must be greater than 0!'
    );
  }

  const totalAmount = total && total > 0 ? total : number;
  const questionId = `question-${id || number}`;
  const scaleOptions = [0, 2, 3, 4, 5, 6, 7];

  const handleAnswerChange = (value: number) => {
    setSelectedValue(value);
    answer(value);
  };

  return (
    <div
      id={questionId}
      className={`min-h-[30.0625rem] flex flex-col justify-center px-8 py-10 bg-white ${className}`}
      role="group"
      aria-labelledby={`${questionId}-title`}
      aria-describedby={`${questionId}-text`}
      {...props}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3
          id={`${questionId}-title`}
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Question {number} of {totalAmount}
        </h3>

        <p
          className="text-xl text-gray-700 mb-12 leading-relaxed"
          id={`${questionId}-text`}
        >
          {text}
        </p>
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">
          Rate your response from 1 (Strongly disagree) to 8 (Strongly agree)
        </legend>

        <div
          className="flex justify-between items-center mb-4"
          role="radiogroup"
          aria-labelledby={`${questionId}-text`}
          aria-describedby={`${questionId}-scale-labels`}
          aria-required="false"
        >
          {scaleOptions.map((value) => (
            <label
              key={value}
              className="flex flex-col items-center cursor-pointer group"
            >
              <input
                type="radio"
                name={questionId}
                value={value}
                checked={selectedValue === value}
                onChange={() => handleAnswerChange(value)}
                aria-describedby={`${questionId}-scale-labels`}
                aria-label={`Rating ${value} out of 8`}
                className="sr-only"
              />
              <span
                className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200
                ${
                  selectedValue === value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                }
                group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-2
              `}
                aria-hidden="true"
              ></span>
            </label>
          ))}
        </div>

        <div
          id={`${questionId}-scale-labels`}
          className="flex justify-between text-sm text-gray-500"
        >
          <span>Strongly disagree</span>
          <span>Strongly agree</span>
        </div>
      </fieldset>
    </div>
  );
};

export default Question;
