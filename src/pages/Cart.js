import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQty = savedCart.map((item) => ({ ...item, qty: 1 }));
    setCart(cartWithQty);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const changeQty = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <img src={item.image} alt={item.name} width="80" />
              <div style={{ flex: 1, paddingLeft: "10px" }}>
                <h4>{item.name}</h4>
                <p>₹{item.price} x {item.qty}</p>
              </div>
              <div>
                <button onClick={() => changeQty(item.id, -1)}>-</button>
                <span style={{ margin: "0 8px" }}>{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)}>+</button>
              </div>
              <button onClick={() => removeItem(item.id)}>🗑 Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
