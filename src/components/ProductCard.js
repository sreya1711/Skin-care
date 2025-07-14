import React from "react";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="product-card">
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>₹{product.price}</p>
  <p style={{ fontSize: "12px", color: "gray" }}>{product.category}</p>
  <button onClick={() => onAddToCart(product)}>Add to Cart</button>
  <button onClick={() => onAddToWishlist(product)}>❤️ Wishlist</button>
</div>

  );
};

export default ProductCard;
