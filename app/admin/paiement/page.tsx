"use client";

import Link from "next/link";
import { useState } from "react";

export default function PaymentPage() {
  const [paymentLink, setPaymentLink] = useState("https://payliv.shop/pay/plv_rkermm7f-");

  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Gestion Paiement</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <div className="request-card form-card">
            <label>URL de paiement</label>
            <input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} />
            <button className="primary-button full-width">Enregistrer</button>
          </div>
        </main>
      </div>
    </div>
  );
}
