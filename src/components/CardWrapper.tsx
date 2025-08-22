import type { CardProps } from '../types';
import Card from './Card';

interface Props {
  cards: CardProps[];
  className?: string;
  gap?: string;
}

const CardWrapper = ({
  cards,
  className = '',
  gap = 'gap-4',
  ...props
}: Props) => {
  return (
    <section className={`grid ${gap} ${className}`.trim()} {...props}>
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </section>
  );
};

export default CardWrapper;
