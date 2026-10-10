"use client";

import Link from "next/link";
import { useState } from "react";

const productList = [
  { amount: 2000, daily: 300, total: 54000, name: "Lexus S" },
  { amount: 5000, daily: 800, total: 144000, name: "Lexus RX" },
  { amount: 15000, daily: 2400, total: 432000, name: "Lexus ES" },
  { amount: 35000, daily: 5600, total: 1008000, name: "Lexus IS" },
  { amount: 50000, daily: 8500, total: 1530000, name: "Lexus GX" },
  { amount: 100000, daily: 17000, total: 3060000, name: "Lexus LC" },
  { amount: 250000, daily: 45000, total: 8100000, name: "Lexus LX" },
  { amount: 500000, daily: 100000, total: 18000000, name: "Lexus UX" },
  { amount: 800000, daily: 200000, total: 36000000, name: "Lexus F Sport" },
];

const formatFCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

export default function InvestPage() {
  const [selected, setSelected] = useState(productList[0]);

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Lexus</p>
            <h1>Investir</h1>
          </div>
          <Link href="/" className="back-link">Accueil</Link>
        </header>

        <main className="main-content">
          <section className="premium-panel">
            <span className="tag">180 jours</span>
            <h2>Produits premium Lexus</h2>
            <p>Investissement automatique avec gains quotidiens.</p>
          </section>

          <div className="product-grid-large">
            {productList.map((item) => (
              <button
                key={item.amount}
                className={`product-invest-card ${selected.amount === item.amount ? "selected" : ""}`}
                onClick={() => setSelected(item)}
              >
                <div className="mini-car" />
                <strong>{item.name}</strong>
                <span>{formatFCFA(item.amount)}</span>
                <small>+ {formatFCFA(item.daily)}/jour</small>
              </button>
            ))}
          </div>

          <section className="selection-panel">
            <h3>Plan sélectionné</h3>
            <div className="detail-row">
              <span>Produit</span>
              <strong>{selected.name}</strong>
            </div>
            <div className="detail-row">
              <span>Montant</span>
              <strong>{formatFCFA(selected.amount)}</strong>
            </div>
            <div className="detail-row">
              <span>Gain quotidien</span>
              <strong>{formatFCFA(selected.daily)}/jour</strong>
            </div>
            <div className="detail-row">
              <span>Montant final</span>
              <strong>{formatFCFA(selected.total)}</strong>
            </div>
            <button className="primary-button full-width">Investir maintenant</button>
          </section>
        </main>

        <nav className="bottom-nav">
          <Link href="/">Accueil</Link>
          <Link href="/investir" className="active">Invest</Link>
          <Link href="/depot">Dépôt</Link>
          <Link href="/moi">Moi</Link>
        </nav>
      </div>
    </div>
  );
}
