import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
      <p className="text-red-200">{message}</p>
    </div>
  );
}