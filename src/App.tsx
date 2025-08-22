import { useState } from 'react';
import Button from './components/Button';
import CardWrapper from './components/CardWrapper';
import Header from './components/Header';
import Questions from './components/Questions';
import { useApi } from './hooks/useApi';

function App() {
  const [startTest, setStartTest] = useState(false);
  const [user, setUser] = useState('');

  //   const {
  //     data: subData,
  //     error: subError,
  //     isLoading: subIsLoading,
  //   } = useApi('https://fhc-api.onrender.com/submissions?user=doc');
  const {
    data: qData,
    error: qError,
    isLoading: qIsLoading,
  } = useApi(
    startTest ? `https://fhc-api.onrender.com/questions?user=${user}` : ''
  );
  console.log('🚀 ~ App ~ isLoading:', qIsLoading);
  console.log('🚀 ~ App ~ error:', qError);
  console.log('🚀 ~ App ~ data:', qData);

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
    <main>
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
      <section>
        {startTest ? (
          <Questions loading={qIsLoading} />
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
    </main>
  );
}

export default App;
