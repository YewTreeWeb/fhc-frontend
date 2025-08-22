import type { ComponentProps, ReactNode } from 'react';

export interface Image extends ComponentProps<'img'> {
  src: string;
  alt: string;
}

export interface CallToAction {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface CardProps {
  title: string;
  description: string;
  icon: Image;
  className?: Record<string, string>;
  callToAction?: CallToAction;
}

export interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  loading?: boolean;
  size: 'sm' | 'md' | 'lg';
}

export interface QuestionProps {
  text: string;
  id: string;
}

export interface QuestionList {
  ok: boolean;
  user: string;
  questions: QuestionProps[];
}
[];
