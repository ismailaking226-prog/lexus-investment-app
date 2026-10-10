"use client";

import Link from "next/link";
import { useState } from "react";

export default function TelegramPage() {
  const [telegramLink, setTelegramLink] = useState("https://t.me/+74TGsMBlIwwyYTI0");

  return (
    <div className="app-shell">
      <div className="mobile-frame admin-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Gestion Telegram</h1>
          </div>
          <Link href="/admin" className="back-link">Dashboard</Link>
        </header>

        <main className="main-content admin-content">
          <div className="request-card form-card">
            <label>Lien Telegram</label>
            <input value={telegramLink} onChange={(e) => setTelegramLink(e.target.value)} />
            <button className="primary-button full-width">Enregistrer</button>
          </div>
        </main>
      </div>
    </div>
  );
}
