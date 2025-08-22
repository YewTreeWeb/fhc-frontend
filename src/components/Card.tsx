import type { CardProps } from '../types';

const Card = ({
  title,
  icon,
  description,
  callToAction,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      key={title}
      className={`border border-black/20 rounded-lg p-4 shadow-md relative ${className}`.trim()}
      {...props}
    >
      <img src={icon.src} alt={icon.alt || ''} className="w-12 h-12 mb-3" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      {callToAction && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {callToAction.text || 'Learn More'}
        </button>
      )}
    </div>
  );
};

export default Card;
