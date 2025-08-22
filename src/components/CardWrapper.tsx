import type { CardProps } from '../types';
import Card from './Card';

interface Props {
  cards: CardProps[];
  className?: string;
  gap?: string;
}

const CardWrapper = ({ cards, className = '', ...props }: Props) => {
  return (
    <section
      className={`flex flex-row flex-wrap items-center justify-center py-[3.1875rem] gap-x-14 px-6 ${className}`.trim()}
      {...props}
    >
      {cards.map((card, i) => (
        <Card key={i} {...card} />
      ))}
    </section>
  );
};

export default CardWrapper;
