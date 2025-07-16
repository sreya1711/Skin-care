import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false); // 👈 New state

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert("🛒 Added to cart!");
  };

  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
    alert("💖 Added to wishlist!");
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter by category & search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Only show 5 initially, then all if toggled
  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 5);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}
      >
        Welcome to <span style={{ color: "#ff69b4" }}>GlowNest</span> 🧴
      </h1>

      {/* Filter + Search Layout */}
      <div
        className="search-filter-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Filter Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <strong style={{ marginRight: "10px" }}>Filter by:</strong>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false); // Reset view when filter changes
              }}
              style={{
                padding: "8px 14px",
                background:
                  selectedCategory === cat
                    ? "linear-gradient(to right, #ffb6c1, #add8e6)"
                    : "#f0f0f0",
                border:
                  selectedCategory === cat
                    ? "2px solid #ff8fa3"
                    : "1px solid #ccc",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search skincare..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAll(false); // Reset view when search changes
          }}
          style={{
            padding: "10px 16px",
            width: "280px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 12px rgba(255,182,193,0.2)",
          }}
        />
      </div>

      {/* Product Grid */}
      <div className="grid-container">
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products match your search.</p>
        ) : (
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          ))
        )}
      </div>

      {/* View All / Show Less Button */}
      {filteredProducts.length > 5 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff69b4",
              color: "white",
              border: "none",
              borderRadius: "20px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
