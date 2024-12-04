import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import Button from "../ui/Button";

export default function Meal({ id, title, image, description, price }) {
  const dispatch = useDispatch();

  function addItemToCart() {
    dispatch(cartActions.addItem({ id, title, price }));
  }

  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={`${title} image`} />
        <h3>{title}</h3>
        <div className="meal-item-price">
          <p>${price}</p>
        </div>
        <div className="meal-item-description">
          <p>{description}</p>
        </div>
        <div className="meal-item-actions">
          <Button className="text-button" onClick={addItemToCart}>
            Add to cart
          </Button>
        </div>
      </article>
    </div>
  );
}
