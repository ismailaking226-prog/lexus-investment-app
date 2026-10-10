"use client";

import Link from "next/link";

const stats = [
  { label: "Utilisateurs", value: "12 430" },
  { label: "Dépôts", value: "8 900" },
  { label: "Retraits", value: "5 500" },
  { label: "Gains versés", value: "25 000 000 FCFA" },
];

const countryStats = [
  { country: "Bénin", users: 3200, net: "5.4M FCFA" },
  { country: "Cameroun", users: 2980, net: "4.2M FCFA" },
  { country: "Côte d’Ivoire", users: 2650, net: "3.8M FCFA" },
  { country: "Burkina Faso", users: 1820, net: "2.7M FCFA" },
  { country: "Niger", users: 1780, net: "2.3M FCFA" },
];

export default function AdminPage() {
  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Tableau de bord</h1>
          </div>
          <Link href="/" className="back-link">Site</Link>
        </header>

        <main className="main-content admin-content">
          <div className="admin-grid">
            {stats.map((item) => (
              <div className="stat-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <section className="admin-section">
            <h3>Stats par pays</h3>
            <div className="country-table">
              {countryStats.map((country) => (
                <div key={country.country} className="detail-row">
                  <span>{country.country}</span>
                  <strong>{country.users} users</strong>
                  <small>{country.net}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-menu">
            <Link href="/admin/utilisateurs">Utilisateurs</Link>
            <Link href="/admin/demandes">Demandes en attente</Link>
            <Link href="/admin/produits">Produits</Link>
            <Link href="/admin/paiement">Paiement</Link>
            <Link href="/admin/telegram">Telegram</Link>
            <Link href="/admin/parrainage">Parrainage</Link>
            <Link href="/admin/historique">Historique</Link>
          </section>
        </main>
      </div>
    </div>
  );
}
