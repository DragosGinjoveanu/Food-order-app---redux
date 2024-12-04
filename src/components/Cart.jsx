import { useSelector, useDispatch } from "react-redux";

import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { calculateTotal } from "../helper/cart.js";
import { cartActions } from "../store/cart";
import { orderActions } from "../store/order";

export default function Cart({ isOpen }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  function handleCloseCart() {
    dispatch(cartActions.toggleCart());
  }

  function handleIncrementItem(id) {
    dispatch(cartActions.incrementItem({ id }));
  }

  function handleDecrementItem(id) {
    dispatch(cartActions.decrementItem({ id }));
  }

  function handleCheckout() {
    dispatch(cartActions.toggleCart());
    dispatch(orderActions.toggleOrder());
  }

  const totalPrice = calculateTotal(cartItems);

  return (
    <Modal isOpen={isOpen}>
      <div className="cart">
        <h2>Your items</h2>
        {cartItems.length === 0 ? (
          <p>You have no items</p>
        ) : (
          <>
            <ul>
              {cartItems.map((cartItem) => (
                <li key={cartItem.id} className="cart-item">
                  <p>
                    ${cartItem.quantity * cartItem.price}: {cartItem.quantity} x
                    ${cartItem.price} - {cartItem.title}
                  </p>
                  <div className="cart-item-actions">
                    <Button
                      className="button"
                      onClick={() => handleIncrementItem(cartItem.id)}
                    >
                      +
                    </Button>
                    <Button
                      className="button"
                      onClick={() => handleDecrementItem(cartItem.id)}
                    >
                      -
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <Button className="button" onClick={handleCheckout}>
              Go to checkout
            </Button>
          </>
        )}
        <Button className="button" onClick={handleCloseCart}>
          Close cart
        </Button>
      </div>
    </Modal>
  );
}
