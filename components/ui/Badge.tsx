import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'alert' | 'success';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const styles = {
    default: "bg-slate-100 text-slate-800",
    alert: "bg-red-100 text-red-600",
    success: "bg-green-100 text-green-700"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;