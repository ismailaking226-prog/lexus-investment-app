"use client";

import Link from "next/link";
import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Lexus S", amount: 2000, daily: 300, total: 54000 },
  { id: 2, name: "Lexus RX", amount: 5000, daily: 800, total: 144000 },
  { id: 3, name: "Lexus ES", amount: 15000, daily: 2400, total: 432000 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [daily, setDaily] = useState("");

  const addProduct = () => {
    if (!name || !amount || !daily) return;
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), name, amount: Number(amount), daily: Number(daily), total: Number(amount) * 27 },
    ]);
    setName("");
    setAmount("");
    setDaily("");
  };

  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Gestion Produits</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <div className="request-card form-card">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du produit" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Montant" type="number" />
            <input value={daily} onChange={(e) => setDaily(e.target.value)} placeholder="Gain quotidien" type="number" />
            <button className="primary-button full-width" onClick={addProduct}>Ajouter produit</button>
          </div>

          <div className="request-list">
            {products.map((product) => (
              <div key={product.id} className="request-card">
                <div className="detail-row"><span>Produit</span><strong>{product.name}</strong></div>
                <div className="detail-row"><span>Montant</span><strong>{product.amount.toLocaleString("fr-FR")} FCFA</strong></div>
                <div className="detail-row"><span>Gain / jour</span><strong>{product.daily.toLocaleString("fr-FR")} FCFA</strong></div>
                <div className="detail-row"><span>Total</span><strong>{product.total.toLocaleString("fr-FR")} FCFA</strong></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
