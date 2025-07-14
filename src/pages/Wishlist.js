import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wishlist 💖</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <img src={item.image} alt={item.name} width="80" />
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
            <button onClick={() => removeItem(item.id)}>🗑 Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
