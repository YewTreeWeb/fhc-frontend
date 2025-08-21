import Header from './components/Header';
import Typography from './components/Typography';

function App() {
  return (
    <main>
      <Header
        heading="Career path test"
        subheading="Discover careers that match your skills and personality"
      />
      <section>
        <Typography content={['lorem', 'ipsum']} />
      </section>
    </main>
  );
}

export default App;
