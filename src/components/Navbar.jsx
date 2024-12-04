import { useDispatch, useSelector } from "react-redux";

import Button from "../ui/Button";
import mainLogo from "../assets/logo.jpg";
import { cartActions } from "../store/cart";

export default function Navbar() {
  const dispatch = useDispatch();

  const totalItems = useSelector((state) => state.cart.totalItems);

  function displayCart() {
    dispatch(cartActions.toggleCart());
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={mainLogo} />
        <h1>Food order app</h1>
      </div>
      <Button className="button" onClick={displayCart}>
        Cart ({totalItems})
      </Button>
    </div>
  );
}
