import React from "react";
import { Plus, X } from "lucide-react";

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export function IngredientInput({
  ingredients,
  setIngredients,
}: IngredientInputProps) {
  const [newIngredient, setNewIngredient] = React.useState("");

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addIngredient()}
          placeholder="Malzeme ekle..."
          className="flex-1 px-4 py-2 bg-gray-800 border border-yellow-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={addIngredient}
          className="p-2 bg-blue-800 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-yellow-900 rounded-full flex items-center gap-2"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(index)}
              className="hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
