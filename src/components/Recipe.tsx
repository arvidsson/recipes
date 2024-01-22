import React from "react";

export type Ingredient = {
  title: string;
  amount: string;
};

export type RecipeModel = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
};

type RecipeProps = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
};

const replaceIngredients = (step: string, ingredients: Ingredient[]) => {
  // Replace {index} with the corresponding ingredient
  return step.replace(/\{(\d+)\}/g, (match, index) => {
    const ingredientIndex = parseInt(index, 10) - 1;
    return "(" + ingredients[ingredientIndex].amount + ")" || match;
  });
};

const Recipe = ({ title, ingredients, steps }: RecipeProps) => {
  return (
    <article className="prose">
      <h2>{title}</h2>
      <h3>Ingredienser</h3>
      <div className="mb-4 border-b">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex flex-grow">
            <div className="shrink-0 border-t border-r p-2 w-20 text-right">
              <div className="font-bold">{ingredient.amount}</div>
            </div>
            <div className="flex border-t border-r px-[2px]"> </div>
            <div className="flex border-t p-2 grow">
              <div>{ingredient.title}</div>
            </div>
          </div>
        ))}
      </div>
      <h3>Steg</h3>
      <div className="mb-4 border-b">
        {steps.map((step, index) => (
          <div key={index} className="flex">
            <div className="shrink-0 border-t border-r p-2 w-10 text-center">
              <input type="checkbox" />
            </div>
            <div className="flex border-t border-r px-[2px]"> </div>
            <div className="flex border-t p-2 grow">
              <div>{replaceIngredients(step, ingredients)}</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Recipe;
