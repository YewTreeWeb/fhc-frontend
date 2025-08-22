import type { FC } from 'react';
import type { ButtonProps } from '../types';

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  loading,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-disabled={disabled}
      className={`
        bg-primary
        hover:bg-primary-dark
        text-center
        max-h-[54px]
        text-black
        border-none
        rounded-[0.5625rem]
        justify-center
        items-center
        gap-2
        px-6
        py-[19px]
        text-sm
        font-bold
        inline-flex
        overflow-hidden
        line-clamp-2
        leading-4
        focus:outline-none
        focus:ring-2
        focus:ring-primary-dark
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    </button>
  );
};

export default Button;
