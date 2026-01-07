import React, { useState } from "react";
import deleteIcon from "./assets/delete.svg";

const categoryIcons = {
  Stationery: "src/assets/ink_pen.svg",
  Kitchenware: "src/assets/flatware.svg",
  Appliance: "src/assets/electrical_services.svg",
};

const availableCategories = Object.keys(categoryIcons);

export default function ItemManager() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [idCounter, setIdCounter] = useState(1);

  const handleAddItem = () => {
    if (!name.trim()) {
      setError("Item name must not be empty");
      return;
    }

    const isDuplicate = items.some(
      (item) => item.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError("Item must not be duplicated");
      return;
    }

    if (!availableCategories.includes(category)) {
      setError("Please select a category");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      setError("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: idCounter,
      name: name.trim(),
      category,
      price: numericPrice.toFixed(2),
    };

    setItems([...items, newItem]);
    setIdCounter(idCounter + 1);
    setName("");
    setCategory("");
    setPrice("");
    setError("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Item Management</h2>

   
      <table border="" cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No items added
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={categoryIcons[item.category]}
                    alt={item.category}
                    style={{ width: "20px", height: "20px" }}
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    style={{ cursor: "pointer", width: "20px" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
         <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100px" }}
        />

        {}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">       </option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick ={handleAddItem}>Add Item</button>
      </div>


      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
