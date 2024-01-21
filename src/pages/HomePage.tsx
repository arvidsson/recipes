import { useContext } from "react";
import { AuthContext } from "../auth";
import { styles } from "../styles";

const HomePage = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div>
      <div>Recipes...</div>
      <button className={styles.button} onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
