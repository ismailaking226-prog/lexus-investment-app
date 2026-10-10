"use client";

import Link from "next/link";
import { useState } from "react";

export default function RetraitPage() {
  const [amount, setAmount] = useState(0);

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Lexus</p>
            <h1>Retrait</h1>
          </div>
          <Link href="/" className="back-link">Accueil</Link>
        </header>

        <main className="main-content">
          <section className="premium-panel">
            <span className="tag">Retrait</span>
            <h2>Retirer vos gains</h2>
            <p>Frais de retrait : 15%</p>
            <p>Heure de retrait : 24h/7</p>
            <p>Montant minimum : 800 FCFA</p>
          </section>

          <div className="deposit-box">
            <input
              type="number"
              min={800}
              placeholder="Montant à retirer"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select>
              <option>Orange Money</option>
              <option>Moov Money</option>
              <option>MTN Money</option>
              <option>Wave</option>
            </select>
            <input type="tel" placeholder="Numéro de téléphone" />
            <button className="primary-button full-width">Demander un retrait</button>
          </div>
        </main>

        <nav className="bottom-nav">
          <Link href="/">Accueil</Link>
          <Link href="/investir">Invest</Link>
          <Link href="/depot">Dépôt</Link>
          <Link href="/moi" className="active">Moi</Link>
        </nav>
      </div>
    </div>
  );
}
