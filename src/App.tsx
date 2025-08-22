import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import CardWrapper from './components/CardWrapper';
import Header from './components/Header';
import Questionaire from './components/Questionaire';
import type { QuestionList } from './types';

function App() {
  const [startTest, setStartTest] = useState(false);
  const [user, setUser] = useState('');

  const [qData, setQData] = useState<null | QuestionList>(null);
  const [qError, setQError] = useState(false);
  const [qIsLoading, setQIsLoading] = useState(false);

  useEffect(() => {
    if (startTest && user) {
      const fetchData = async () => {
        // Clear the console of any previous errors
        console.clear;
        // Set loading to true and error to false for a clean slate
        setQIsLoading(true);
        setQError(false);
        try {
          const response = await axios.get(
            `https://fhc-api.onrender.com/questions?user=${user}`
          );
          setQData(response.data);
        } catch (error) {
          setQError(true);
          console.error(
            error instanceof Error
              ? error
              : new Error('An unknown error occurred')
          );
        } finally {
          setQIsLoading(false);
        }
      };
      fetchData();
    }
  }, [startTest, user]);

  const cards = [
    {
      title: '24 Questions',
      description:
        'Answer 24 questions about your career style and preferences',
      icon: {
        src: 'vite.svg',
        alt: 'Vite',
      },
    },
    {
      title: '2 Minutes',
      description: 'Gain insights into your future career in two minutes ',
      icon: {
        src: 'vite.svg',
        alt: 'Vite',
      },
    },
    {
      title: 'Personalized Advice',
      description:
        'Receive personalized advice to guide you on your next steps',
      icon: {
        src: 'vite.svg',
        alt: 'Vite',
      },
    },
  ];

  return (
    <main className="px-56">
      <Header
        heading="Career path test"
        subheading="Discover careers that match your skills and personality"
      />
      <CardWrapper cards={cards} />
      <section>
        <p>
          We've analysed data from thousands of our members who work in graduate
          roles across a range of sectors to understand which personalities,
          skills and values best fit each career path.
        </p>
        <p>
          Take this test to understand what career path you might be suited to
          and how to get started.
        </p>
      </section>
      {!qError ? (
        <section>
          {startTest ? (
            <Questionaire
              questions={qData as QuestionList}
              loading={qIsLoading}
              user={user}
            />
          ) : (
            <>
              <h2 id="start-test-heading">Ready to take the test?</h2>
              <Button
                onClick={() => {
                  setStartTest(true);
                  setUser('Tom_Bombadil');
                }}
                aria-describedby="start-test-heading"
                aria-label="Start the career path assessment test"
                size="lg"
              >
                Start Test
              </Button>
            </>
          )}
        </section>
      ) : (
        <section>
          <h3>Unable to get questions. Please try again later.</h3>
        </section>
      )}
    </main>
  );
}

export default App;
