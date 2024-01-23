import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { styles } from "../styles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Recipe, { Ingredient } from "../components/Recipe";
import { Link } from "react-router-dom";

type RecipeDoc = {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: string[];
};

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<RecipeDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const getRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      let recipes: RecipeDoc[] = [];
      querySnapshot.forEach((doc) => {
        recipes.push({
          id: doc.id,
          title: doc.data().title,
          ingredients: doc.data().ingredients,
          steps: doc.data().steps,
        });
      });
      setRecipes([...recipes]);
      setLoading(false);
    };

    getRecipes();
  }, []);

  if (loading) return null;

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="mt-2">
        {recipes.map((recipe, index) => (
          <Recipe key={index} {...recipe} />
        ))}
      </div>
      <div className="w-full flex justify-between mt-8">
        <Link className="underline font-semibold" to="/create">
          Lägg till recept
        </Link>
        <button className="underline font-semibold" onClick={logOut}>
          Logga ut
        </button>
      </div>
    </div>
  );
};

export default HomePage;
