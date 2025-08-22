import { useEffect } from 'react';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

const Head = ({
  title = 'Career Path Test',
  description = 'Bright Network technical test',
  author = 'Mathew Teague',
  viewport = 'width=device-width, initial-scale=1.0',
}: Props) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Set basic meta tags
    setMetaTag('description', description);
    setMetaTag('author', author);
    setMetaTag('viewport', viewport);
  }, [title, description, author, viewport]);

  // This component doesn't render anything visible
  return null;
};

export default Head;
