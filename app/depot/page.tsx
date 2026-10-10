"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const formatFCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

export default function DepotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    network: "Orange Money",
    phone: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Lexus</p>
            <h1>Dépôt</h1>
          </div>
          <Link href="/" className="back-link">Accueil</Link>
        </header>

        <main className="main-content">
          <section className="premium-panel">
            <span className="tag">Mobile Money</span>
            <h2>Dépot / Recharger</h2>
            <p>Méthode de paiement : Mobile Money</p>
            <p>Réseaux utilisés : Orange Money, Moov Money, MTN Money, Wave</p>
          </section>

          <div className="deposit-box">
            <label>Montant minimum 2 000 FCFA</label>
            <input
              type="number"
              min={2000}
              placeholder="Montant"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Ex : Numéro de téléphone sans indicatif"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <label>Indiquez le numéro mobile money utilisé</label>
            <select
              value={form.network}
              onChange={(e) => setForm({ ...form, network: e.target.value })}
            >
              <option>Orange Money</option>
              <option>Moov Money</option>
              <option>MTN Money</option>
              <option>Wave</option>
            </select>

            <a className="primary-button full-width" href="https://payliv.shop/pay/plv_rkermm7f-" target="_blank" rel="noreferrer">
              Payer
            </a>

            <div className="step-box">
              <strong>1. Effectuez le paiement</strong>
              <strong>2. Cliquez sur le bouton ci-dessous</strong>
            </div>

            <button className="secondary-button full-width" type="button" onClick={handleSubmit}>
              Confirmation de dépôt
            </button>
          </div>

          {submitted && (
            <div className="success-box">
              Demande de dépôt envoyée. En attente de validation Admin.
            </div>
          )}
        </main>

        <nav className="bottom-nav">
          <Link href="/">Accueil</Link>
          <Link href="/investir">Invest</Link>
          <Link href="/depot" className="active">Dépôt</Link>
          <Link href="/moi">Moi</Link>
        </nav>
      </div>
    </div>
  );
}
