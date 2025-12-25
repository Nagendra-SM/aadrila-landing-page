import React from 'react';

interface ThemedButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  variant = 'primary',
  className = '',
  children,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `bg-button-hero bg-button-hero-hover text-white text-base cursor-pointer font-raleway leading-5 font-semibold px-8 py-4 rounded-4xl transition-colors duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
      case 'secondary':
        return `border-2 border-button text-button font-manrope font-medium px-6 py-3 rounded-lg hover:bg-button hover:text-white transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
      default:
        return `bg-button bg-button-hover text-white font-manrope font-medium px-6 py-3 rounded-lg transition-colors duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
    }
  };

  return (
    <button
      type={type}
      className={getVariantStyles()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
