"use client";

import Link from "next/link";
import { useState } from "react";

const initialDeposits = [
  { id: 1, name: "Awa Diallo", amount: 25000, phone: "+229 64 00 00 01", country: "Bénin", proof: "photo_001.jpg", date: "2026-10-10" },
  { id: 2, name: "Kouassi Yao", amount: 50000, phone: "+225 07 88 00 11", country: "Côte d’Ivoire", proof: "photo_002.jpg", date: "2026-10-10" },
];

const initialWithdrawals = [
  { id: 11, name: "Moussa Adam", amount: 15000, network: "Orange Money", phone: "+227 99 55 22 11", country: "Niger", date: "2026-10-09" },
  { id: 12, name: "Jules Nganou", amount: 22000, network: "MTN Money", phone: "+237 697 000 123", country: "Cameroun", date: "2026-10-09" },
];

export default function AdminDemandesPage() {
  const [tab, setTab] = useState<"depot" | "retrait">("depot");
  const [deposits, setDeposits] = useState(initialDeposits);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);

  const approveDeposit = (id: number) => {
    setDeposits((items) => items.filter((item) => item.id !== id));
  };

  const rejectDeposit = (id: number) => {
    setDeposits((items) => items.filter((item) => item.id !== id));
  };

  const approveWithdrawal = (id: number) => {
    setWithdrawals((items) => items.filter((item) => item.id !== id));
  };

  const rejectWithdrawal = (id: number) => {
    setWithdrawals((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Demandes en attente</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <div className="segment-control">
            <button className={tab === "depot" ? "active" : ""} onClick={() => setTab("depot")}>Dépôts</button>
            <button className={tab === "retrait" ? "active" : ""} onClick={() => setTab("retrait")}>Retraits</button>
          </div>

          {tab === "depot" ? (
            <div className="request-list">
              {deposits.map((item) => (
                <div key={item.id} className="request-card">
                  <div className="detail-row"><span>Nom</span><strong>{item.name}</strong></div>
                  <div className="detail-row"><span>Montant</span><strong>{item.amount} FCFA</strong></div>
                  <div className="detail-row"><span>Numéro</span><strong>{item.phone}</strong></div>
                  <div className="detail-row"><span>Pays</span><strong>{item.country}</strong></div>
                  <div className="detail-row"><span>Preuve</span><strong>{item.proof}</strong></div>
                  <div className="detail-row"><span>Date</span><strong>{item.date}</strong></div>
                  <div className="request-actions">
                    <button className="approve" onClick={() => approveDeposit(item.id)}>Approuver</button>
                    <button className="reject" onClick={() => rejectDeposit(item.id)}>Rejeter</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="request-list">
              {withdrawals.map((item) => (
                <div key={item.id} className="request-card">
                  <div className="detail-row"><span>Nom</span><strong>{item.name}</strong></div>
                  <div className="detail-row"><span>Montant</span><strong>{item.amount} FCFA</strong></div>
                  <div className="detail-row"><span>Réseau</span><strong>{item.network}</strong></div>
                  <div className="detail-row"><span>Numéro</span><strong>{item.phone}</strong></div>
                  <div className="detail-row"><span>Pays</span><strong>{item.country}</strong></div>
                  <div className="detail-row"><span>Date</span><strong>{item.date}</strong></div>
                  <div className="request-actions">
                    <button className="approve" onClick={() => approveWithdrawal(item.id)}>Approuver</button>
                    <button className="reject" onClick={() => rejectWithdrawal(item.id)}>Rejeter</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
