"use client";

import Link from "next/link";

export default function ParrainagePage() {
  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Gestion Parrainage</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <div className="request-card">
            <div className="detail-row"><span>Niveau 1</span><strong>25%</strong></div>
            <div className="detail-row"><span>Niveau 2</span><strong>3%</strong></div>
            <div className="detail-row"><span>Niveau 3</span><strong>2%</strong></div>
          </div>
        </main>
      </div>
    </div>
  );
}
