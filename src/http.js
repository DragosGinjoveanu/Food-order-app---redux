export async function fetchMeals() {
  const res = await fetch("http://localhost:3000/meals");
  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch meals");
  }

  return resData;
}

export async function placeOrder(orderData) {
  const res = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: orderData }),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return resData;
}
