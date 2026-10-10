"use client";

import Link from "next/link";

const depositHistory = [
  { name: "Awa Diallo", phone: "+229 64 00 00 01", amount: 25000, date: "2026-10-10 08:12" },
  { name: "Moussa Adam", phone: "+227 90 00 00 10", amount: 32000, date: "2026-10-09 17:30" },
];

const withdrawalHistory = [
  { name: "Kouassi Yao", phone: "+225 07 88 00 11", amount: 15000, date: "2026-10-08 15:20" },
  { name: "Abdou Issa", phone: "+227 90 01 02 03", amount: 20000, date: "2026-10-07 10:10" },
];

export default function HistoriquePage() {
  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Historiques</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <section className="admin-section">
            <h3>Historique des dépôts</h3>
            <div className="request-list">
              {depositHistory.map((row, index) => (
                <div key={index} className="request-card">
                  <div className="detail-row"><span>Nom</span><strong>{row.name}</strong></div>
                  <div className="detail-row"><span>Numéro</span><strong>{row.phone}</strong></div>
                  <div className="detail-row"><span>Montant</span><strong>{row.amount.toLocaleString("fr-FR")} FCFA</strong></div>
                  <div className="detail-row"><span>Date</span><strong>{row.date}</strong></div>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-section">
            <h3>Historique des retraits</h3>
            <div className="request-list">
              {withdrawalHistory.map((row, index) => (
                <div key={index} className="request-card">
                  <div className="detail-row"><span>Nom</span><strong>{row.name}</strong></div>
                  <div className="detail-row"><span>Numéro</span><strong>{row.phone}</strong></div>
                  <div className="detail-row"><span>Montant</span><strong>{row.amount.toLocaleString("fr-FR")} FCFA</strong></div>
                  <div className="detail-row"><span>Date</span><strong>{row.date}</strong></div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
