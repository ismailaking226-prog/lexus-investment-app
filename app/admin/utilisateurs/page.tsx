"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const users = [
  { id: 1, name: "Awa Diallo", country: "Bénin", phone: "+229 64 00 00 01", balance: 250000 },
  { id: 2, name: "Yves Nguema", country: "Cameroun", phone: "+237 655 111 222", balance: 180000 },
  { id: 3, name: "Mariam Diop", country: "Côte d’Ivoire", phone: "+225 07 58 88 10", balance: 920000 },
  { id: 4, name: "Rabiat Kabore", country: "Burkina Faso", phone: "+226 70 00 11 22", balance: 420000 },
  { id: 5, name: "Abdou Issa", country: "Niger", phone: "+227 90 01 02 03", balance: 640000 },
];

export default function UsersPage() {
  const [country, setCountry] = useState("Tous");

  const filteredUsers = useMemo(() => {
    return country === "Tous" ? users : users.filter((user) => user.country === country);
  }, [country]);

  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Gestion Utilisateurs</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>Tous</option>
            <option>Bénin</option>
            <option>Cameroun</option>
            <option>Côte d’Ivoire</option>
            <option>Burkina Faso</option>
            <option>Niger</option>
          </select>

          <div className="request-list">
            {filteredUsers.map((user) => (
              <div key={user.id} className="request-card">
                <div className="detail-row"><span>Nom</span><strong>{user.name}</strong></div>
                <div className="detail-row"><span>Pays</span><strong>{user.country}</strong></div>
                <div className="detail-row"><span>Numéro</span><strong>{user.phone}</strong></div>
                <div className="detail-row"><span>Solde</span><strong>{user.balance.toLocaleString("fr-FR")} FCFA</strong></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
