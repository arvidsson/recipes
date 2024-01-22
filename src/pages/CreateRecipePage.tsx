import React, { useState } from "react";
import { RecipeModel } from "../components/Recipe";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateRecipePage = () => {
  const [recipe, setRecipe] = useState<RecipeModel>({
    title: "",
    ingredients: [],
    steps: [],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const handleStepChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedSteps,
    }));
  };

  const handleAddIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { amount: "", title: "" }],
    }));
  };

  const handleAddStep = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recipesCollection = collection(db, "recipes");
      await addDoc(recipesCollection, recipe);
      console.log("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="prose px-8 py-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <label>
          Titel
          <input
            className="mx-2"
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleTitleChange}
            required
          />
        </label>

        <h3>Ingredienser</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div className="mt-2" key={index}>
            <label>
              Mängd
              <input
                className="mx-2"
                type="text"
                name="amount"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(e, index)}
                required
              />
            </label>
            <label>
              Ingrediens
              <input
                className="mx-2"
                type="text"
                name="title"
                value={ingredient.title}
                onChange={(e) => handleIngredientChange(e, index)}
                required
              />
            </label>
          </div>
        ))}
        <button
          className="underline font-semibold mt-2"
          type="button"
          onClick={handleAddIngredient}
        >
          Lägg till ingrediens
        </button>

        <h3>Steg</h3>
        {recipe.steps.map((step, index) => (
          <div key={index}>
            <label>
              Steg {index + 1}:
              <textarea
                className="mx-2"
                value={step}
                onChange={(e) => handleStepChange(e, index)}
                required
              />
            </label>
          </div>
        ))}
        <button
          className="underline font-semibold mt-2"
          type="button"
          onClick={handleAddStep}
        >
          Lägg till steg
        </button>

        <button
          className="mt-8 block underline font-semibold uppercase"
          type="submit"
        >
          Spara recept
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
