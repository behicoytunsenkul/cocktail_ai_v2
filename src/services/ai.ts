import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY, AI_MODEL, RECIPE_FORMAT } from '../config/constants';
import type { Recipe, RecipeError } from '../types/recipe';

if (!API_KEY) {
  throw new Error('Google AI API key is not configured');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getCocktailRecipe(ingredients: string[]): Promise<Recipe> {
  try {
    if (!ingredients?.length) {
      throw new Error('En az bir malzeme girmelisiniz');
    }

    const model = genAI.getGenerativeModel({ model: AI_MODEL });
    const prompt = `Bana şu malzemelerle yapılabilecek en iyi kokteyl tarifini ver: ${ingredients.join(', ')}. 
      Lütfen şu formatta ver:${RECIPE_FORMAT}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    if (!content) {
      throw new Error('Tarif oluşturulamadı');
    }

    return { content };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu';
    throw new Error(`Kokteyl tarifi alınamadı: ${message}`);
  }
}