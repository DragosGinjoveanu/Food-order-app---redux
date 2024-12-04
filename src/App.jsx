import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Meal from "./components/Meal";
import ErrorMessage from "./components/ErrorMessage";
import Cart from "./components/Cart";

import { fetchMeals } from "./http";
import Order from "./components/Order";

function App() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetchingMeals, setErrorFetchingMeals] = useState("");

  useEffect(() => {
    async function getMeals() {
      setIsFetching(true);

      try {
        const meals = await fetchMeals();

        setMeals(meals);
      } catch (error) {
        setErrorFetchingMeals(error.message || "Failed to fetch meals");
      }
      setIsFetching(false);
    }

    getMeals();
  }, []);

  const cartIsDisplayed = useSelector((state) => {
    return state.cart.showCart;
  });

  const orderIsDisplayed = useSelector((state) => {
    console.log(state.order.showOrder);
    return state.order.showOrder;
  });

  return (
    <>
      {orderIsDisplayed && <Order isOpen={orderIsDisplayed} />}
      {cartIsDisplayed && <Cart isOpen={cartIsDisplayed} />}
      <Navbar />
      <div id="meals">
        {errorFetchingMeals && <ErrorMessage message={errorFetchingMeals} />}
        {isFetching && <p>The meals are loading...</p>}
        {meals.map((meal) => {
          return (
            <Meal
              key={meal.id}
              id={meal.id}
              title={meal.name}
              price={meal.price}
              description={meal.description}
              image={meal.image}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
