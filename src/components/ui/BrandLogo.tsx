import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  asLink = true,
}) => {
  const sizeClasses = {
    sm: {
      title: 'text-lg tracking-[0.22em]',
      sub: 'text-[8px] tracking-[0.28em] mt-0.5',
    },
    md: {
      title: 'text-2xl tracking-[0.26em]',
      sub: 'text-[9px] tracking-[0.34em] mt-0.5',
    },
    lg: {
      title: 'text-3xl sm:text-4xl tracking-[0.3em]',
      sub: 'text-[11px] tracking-[0.4em] mt-1',
    },
  }[size];

  const content = (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      <span className={`font-serif uppercase font-light text-dura-text ${sizeClasses.title}`}>
        Dura
      </span>
      <span className={`font-sans font-medium uppercase text-dura-muted ${sizeClasses.sub}`}>
        By Liya
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block transition-opacity hover:opacity-85 focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
