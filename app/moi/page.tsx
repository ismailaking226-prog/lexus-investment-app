"use client";

import Link from "next/link";

export default function MoiPage() {
  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Lexus</p>
            <h1>Moi</h1>
          </div>
          <a href="https://t.me/+74TGsMBlIwwyYTI0" target="_blank" rel="noreferrer" className="telegram-button small">
            Telegram
          </a>
        </header>

        <main className="main-content">
          <section className="profile-card">
            <div className="avatar">L</div>
            <div>
              <h3>Louis Martin</h3>
              <p>Benin • 123456789</p>
            </div>
          </section>

          <div className="menu-grid single">
            <Link href="/depot" className="menu-card accent">Dépôt</Link>
            <Link href="/retrait" className="menu-card">Retrait</Link>
            <Link href="/investir" className="menu-card">Investments</Link>
            <Link href="/historique" className="menu-card">Historique</Link>
          </div>

          <div className="profile-details">
            <div className="detail-row"><span>Solde</span><strong>1 250 000 FCFA</strong></div>
            <div className="detail-row"><span>Paiement</span><strong>Orange Money</strong></div>
            <div className="detail-row"><span>Parrain</span><strong>Jean</strong></div>
            <div className="detail-row"><span>Service client</span><strong>Disponible 24/7</strong></div>
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
