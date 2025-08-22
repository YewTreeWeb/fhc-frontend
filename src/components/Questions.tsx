type Props = {
  loading: boolean;
};

const Questions = ({ loading, ...props }: Props) => {
  return (
    <div>
      {loading && (
        <div role="status" aria-live="polite" {...props}>
          <p>Loading your personalized career assessment...</p>
        </div>
      )}
    </div>
  );
};

export default Questions;
