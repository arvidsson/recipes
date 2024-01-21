import React from "react";

type RecipeProps = {
  title: string;
  ingredients: string[];
  steps: string[];
};

const replaceIngredients = (step: string, ingredients: string[]) => {
  // Replace {index} with the corresponding ingredient
  return step.replace(/\{(\d+)\}/g, (match, index) => {
    const ingredientIndex = parseInt(index, 10) - 1;
    return "(" + ingredients[ingredientIndex] + ")" || match;
  });
};

const Recipe = ({ title, ingredients, steps }: RecipeProps) => {
  return (
    <article className="prose">
      <h2>{title}</h2>
      <h3>Ingredienser</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steg</h3>
      <div className="mb-4 border-b">
        {steps.map((step, index) => (
          //<li key={index}>{replaceIngredients(step, ingredients)}</li>
          <div key={index} className="flex">
            <div className="flex border-t border-r p-2 font-serif">
              <div className="w-2">{index + 1}</div>
            </div>
            <div className="flex border-t border-r p-1"> </div>
            <div className="flex border-t p-2">
              <div>{replaceIngredients(step, ingredients)}</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Recipe;
