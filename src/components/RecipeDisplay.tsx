import React from "react";

interface RecipeDisplayProps {
  recipe: string;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-yellow-500/30">
      <pre className="whitespace-pre-wrap text-white font-mono">{recipe}</pre>
    </div>
  );
}
