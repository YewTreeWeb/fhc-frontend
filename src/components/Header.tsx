import type { ComponentProps } from 'react';
import type { JSX } from 'react/jsx-runtime';
import type { Image } from '../types';

interface HeaderProps extends ComponentProps<'header'> {
  heading: string;
  subheading?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Header = ({
  heading,
  subheading,
  level = 1,
  className = '',
  ...props
}: HeaderProps) => {
  const img: Image = {
    src: 'discover-journey-maze.svg',
    alt: 'White background with a person standing in a maze',
  };
  // Type-safe checks
  const hasValidImage = img?.src && img?.alt;
  const backgroundClass = hasValidImage
    ? 'bg-[url(discover-journey-maze.svg)]'
    : 'bg-header-grey';

  // Dynamic heading component
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements;

  // Combine classes properly
  const headerClasses =
    `${backgroundClass} min-h-[11.0625rem] bg-no-repeat bg-cover bg-bottom flex flex-col justify-end items-start pb-6 ${className}`.trim();

  return (
    <header className={headerClasses} role="banner" {...props}>
      <HeadingComponent className="text-3xl text-black font-bold">
        {heading}
      </HeadingComponent>
      {subheading && (
        <p className="text-md text-black/50 mt-2" role="doc-subtitle">
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
