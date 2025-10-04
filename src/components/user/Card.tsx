import React from "react";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode; // Optional children to allow nested components
  className?: string; // To add additional styling if needed
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;
