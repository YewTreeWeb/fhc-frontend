import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import Head from './components/Head';
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

  return (
    <>
      <Head
        title={
          startTest
            ? 'Taking Assessment - Career Path Test'
            : 'Career Path Test'
        }
        description="Discover careers that match your skills and personality with our comprehensive career assessment questionnaire based on data from thousands of graduate professionals."
        keywords="career assessment, personality test, career path, skills assessment, career guidance, graduate careers, professional development"
      />
      <main className="px-5 md:px-20 2xl:px-56">
        <Header
          heading="Career path test"
          subheading="Discover careers that match your skills and personality"
        />
        {/* Card Wrapper with card components to go here */}
        <section className="text-base mt-6 mb-4">
          <p>
            We've analysed data from thousands of our members who work in
            graduate roles across a range of sectors to understand which
            personalities, skills and values best fit each career path.
          </p>
          <p className="mt-2">
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
                <div className="border border-black/20 shadow-md mt-10 rounded text-center min-h-[32rem] flex flex-col">
                  <header className="border-b border-black/30 max-h-[6.375rem] flex flex-col items-start justify-center px-6 flex-1">
                    <h3 className="font-bold">Your progress - 0%</h3>
                  </header>
                  <div className="flex flex-col items-center justify-center flex-1 self-stretch gap-2">
                    <h4 id="start-test-heading" className="font-bold">
                      Ready to take the test?
                    </h4>
                    <Button
                      onClick={() => {
                        setStartTest(true);
                        setUser('Tom_Bombadil');
                      }}
                      className="uppercase"
                      aria-describedby="start-test-heading"
                      aria-label="Start the career path assessment test"
                      size="lg"
                    >
                      Start Test
                    </Button>
                  </div>
                </div>
              </>
            )}
          </section>
        ) : (
          <section>
            <h3>Unable to get questions. Please try again later.</h3>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
