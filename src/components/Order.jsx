import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { placeOrder } from "../http";
import { orderActions } from "../store/order";
import { calculateTotal } from "../helper/cart";
import ErrorMessage from "./ErrorMessage";

export default function Order({ isOpen }) {
  // could also implement some optional validation state
  const [confirmed, setIsConfirmed] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = calculateTotal(cartItems);

  function handleCloseOrder() {
    dispatch(orderActions.toggleOrder());
  }

  async function handleSendOrder(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const orderData = {
      items: cartItems,
      customer: {
        email: formData.email,
        name: formData.name,
        street: formData.address,
        "postal-code": formData["postal-code"],
        city: formData.city,
      },
    };

    try {
      await placeOrder(orderData);
      setIsConfirmed(true);
      // can implement a email send to the adress with the order
    } catch (error) {
      return <ErrorMessage message="Failed to place order" />;
    }
  }

  return (
    <Modal isOpen={isOpen}>
      {confirmed ? (
        <p>Your order has been confirmed</p>
      ) : (
        <>
          <p>Your total is ${totalPrice}</p>
          <form onSubmit={handleSendOrder}>
            <div className="control">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="control">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="e.g. vlad@gmail.com"
              />
            </div>

            <div className="control">
              <label htmlFor="tel">Mobile phone number</label>
              <input
                id="tel"
                type="tel"
                name="tel"
                required
                placeholder="e.g. 0751192784"
                minLength={10}
                maxLength={10}
              />
            </div>

            <div className="control">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Please be detailed"
                minLength={10}
              />
            </div>

            <div className="control-row">
              <div className="control">
                <label htmlFor="postal-code">Postal Code</label>
                <input
                  type="number"
                  id="postal-code"
                  name="postal-code"
                  required
                  minLength={6}
                  maxLength={6}
                />
              </div>

              <div className="control">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  minLength={3}
                />
              </div>
            </div>
            <Button className="button" type="submit">
              Send order
            </Button>
          </form>
        </>
      )}
      <Button className="button" onClick={handleCloseOrder}>
        Close
      </Button>
    </Modal>
  );
}
