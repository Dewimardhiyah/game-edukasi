import React from 'react';

interface TombolProps {
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Tombol({ className = '', icon, onClick, children }: TombolProps) {
  return (
    <button className={`btn-custom ${className}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </button>
  );
}