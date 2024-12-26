import React, { useState } from "react";
import { Wine, GlassWater } from "lucide-react";
import { IngredientInput } from "./components/IngredientInput";
import { ErrorMessage } from "./components/ErrorMessage";
import { RecipeDisplay } from "./components/RecipeDisplay";
import { getCocktailRecipe } from "./services/ai";

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecipe = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getCocktailRecipe(ingredients);
      setRecipe(result.content);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu"
      );
      console.error("Error getting recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-800 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-6xl font-bold text-white">Cocktail AI</h1>
          </div>
          <p className="text-purple-100 text-2xl">
            Elindeki malzemeleri gir, sana en uygun kokteyl tarifini bulalım!
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-purple-500/30">
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
          />

          <button
            onClick={handleGetRecipe}
            disabled={ingredients.length === 0 || loading}
            className="w-full mt-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Tarif Bulunuyor..." : "Tarif Bul"}
          </button>

          {error && <ErrorMessage message={error} />}
          {recipe && <RecipeDisplay recipe={recipe} />}
        </div>
      </div>
    </div>
  );
}

export default App;
