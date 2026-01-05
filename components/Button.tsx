import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold py-3 px-4 rounded-xl transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest text-sm";
  
  const variants = {
    primary: "bg-[#58cc02] text-white border-b-4 border-[#46a302] hover:bg-[#46a302]",
    secondary: "bg-white text-slate-500 border-2 border-b-4 border-slate-200 hover:bg-slate-50",
    outline: "bg-transparent text-[#58cc02] border-2 border-b-4 border-transparent hover:bg-slate-100",
    danger: "bg-red-500 text-white border-b-4 border-red-700 hover:bg-red-600",
    success: "bg-green-500 text-white border-b-4 border-green-700 hover:bg-green-600",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};