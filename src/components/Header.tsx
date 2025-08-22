import type { ComponentProps } from 'react';
import type { JSX } from 'react/jsx-runtime';
import type { Image } from '../types';

interface HeaderProps extends ComponentProps<'header'> {
  heading: string;
  subheading?: string;
  img?: Image;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Header = ({
  heading,
  subheading,
  img,
  level = 1,
  className = '',
  ...props
}: HeaderProps) => {
  // Type-safe checks
  const hasValidImage = img?.src && img?.alt;
  const backgroundClass = hasValidImage ? img.src : 'bg-header-grey';

  // Dynamic heading component
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements;

  // Combine classes properly
  const headerClasses = `${backgroundClass} ${className}`.trim();

  return (
    <header className={headerClasses} role="banner" {...props}>
      <HeadingComponent className="text-2xl font-bold">
        {heading}
      </HeadingComponent>
      {subheading && (
        <p className="text-lg text-gray-600 mt-2" role="doc-subtitle">
          {subheading}
        </p>
      )}
      {hasValidImage && (
        <img
          src={img.src}
          alt={img.alt}
          className="sr-only" // Hidden but available to screen readers
          aria-hidden="true" // Since it's decorative background
        />
      )}
    </header>
  );
};

export default Header;
