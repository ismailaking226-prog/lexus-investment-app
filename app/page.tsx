"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const products = [
  { amount: 2000, daily: 300, total: 54000, label: "Lexus S", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?..." },
  { amount: 5000, daily: 800, total: 144000, label: "Lexus RX", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?..." },
  { amount: 15000, daily: 2400, total: 432000, label: "Lexus ES", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?..." },
  { amount: 35000, daily: 5600, total: 1008000, label: "Lexus IS", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?..." },
  { amount: 50000, daily: 8500, total: 1530000, label: "Lexus GX", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?..." },
  { amount: 100000, daily: 17000, total: 3060000, label: "Lexus LC", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?..." },
  { amount: 250000, daily: 45000, total: 8100000, label: "Lexus LX", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?..." },
  { amount: 500000, daily: 100000, total: 18000000, label: "Lexus UX", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?..." },
  { amount: 800000, daily: 200000, total: 36000000, label: "Lexus F Sport", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?..." },
];

const formatFCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

export default function HomePage() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("lexus-info-modal") === "1";
    if (!seen) {
      setShowInfoModal(true);
    }
  }, []);

  const closeInfo = () => {
    localStorage.setItem("lexus-info-modal", "1");
    setShowInfoModal(false);
  };

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar premium">
          <div>
            <p className="eyebrow">Lexus</p>
            <h1>Investissement</h1>
          </div>
          <div className="header-actions">
            <a href="https://t.me/+74TGsMBlIwwyYTI0" target="_blank" rel="noreferrer" className="icon-button telegram">
              TG
            </a>
            <Link href="/moi" className="icon-button user">
              Moi
            </Link>
          </div>
        </header>

        <main className="main-content">
          <section className="hero-card">
            <div className="hero-copy">
              <span className="tag">Lexus</span>
              <h2>Investissez intelligemment</h2>
              <p>Des rendements automatiques, une validation admin sécurisée et des produits premium.</p>
            </div>
            <div className="hero-image-wrap">
              <div className="car-art" aria-label="Voiture Lexus" />
            </div>
          </section>

          <section className="banner telegram-banner">
            <div>
              <p className="eyebrow">Canal Telegram</p>
              <strong>Rejoignez notre Canal Telegram</strong>
            </div>
            <a href="https://t.me/+74TGsMBlIwwyYTI0" target="_blank" rel="noreferrer" className="primary-button small">
              Rejoindre
            </a>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <span>Solde</span>
              <strong>1 250 000 FCFA</strong>
            </div>
            <div className="stat-card">
              <span>Gains du jour</span>
              <strong>12 800 FCFA</strong>
            </div>
            <div className="stat-card">
              <span>Investissements</span>
              <strong>8 actifs</strong>
            </div>
          </section>

          <section className="menu-grid">
            <Link href="/depot" className="menu-card accent">
              <span>⬆</span>
              <strong>Dépot</strong>
            </Link>
            <Link href="/retrait" className="menu-card">
              <span>⬇</span>
              <strong>Retrait</strong>
            </Link>
            <Link href="/investir" className="menu-card">
              <span>◈</span>
              <strong>Investir</strong>
            </Link>
            <Link href="/moi" className="menu-card">
              <span>☰</span>
              <strong>Moi</strong>
            </Link>
          </section>

          <section className="section-head">
            <h3>Produits d'investissement 180 jours</h3>
            <Link href="/investir">Voir tout</Link>
          </section>

          <div className="product-list">
            {products.slice(0, 4).map((item) => (
              <article key={item.amount} className="product-card">
                <div className="product-visual" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})` }}>
                  <span>{item.label}</span>
                </div>
                <div className="product-body">
                  <h4>{formatFCFA(item.amount)}</h4>
                  <p>+ {formatFCFA(item.daily)}/jour</p>
                  <small>Total : {formatFCFA(item.total)}</small>
                </div>
              </article>
            ))}
          </div>
        </main>

        <nav className="bottom-nav">
          <Link href="/" className="active">Accueil</Link>
          <Link href="/investir">Invest</Link>
          <Link href="/depot">Dépôt</Link>
          <Link href="/moi">Moi</Link>
        </nav>
      </div>

      {showInfoModal && (
        <div className="modal-backdrop" onClick={closeInfo}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <h3>INFORMATION</h3>
            <ul>
              <li>Inscrivez-vous maintenant et recevez 500 FCFA gratuitement.</li>
              <li>Invitez vos amis à investir et gagnez 25% / 3% / 2% sur 3 niveaux.</li>
              <li>Les rendements sont versés automatiquement chaque jour pendant 180 jours.</li>
              <li>Investissez dès 2 000 FCFA et commencez à gagner dès le lendemain.</li>
            </ul>
            <div className="modal-actions">
              <button className="primary-button" onClick={closeInfo}>D'accord</button>
              <a className="telegram-button" href="https://t.me/+avYieGqPfUtlNDI0" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
