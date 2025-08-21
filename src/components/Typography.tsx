import type { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'p'>, 'content'> {
  content: string | string[];
  size?: string;
}

const Typography = ({ content, size, ...props }: Props) => {
  return (
    <>
      {Array.isArray(content) ? (
        <>
          {content.map((txt, index) => (
            <p key={index} className={size ?? 'text-base'} {...props}>
              {txt}
            </p>
          ))}
        </>
      ) : (
        <p>{content}</p>
      )}
    </>
  );
};

export default Typography;
