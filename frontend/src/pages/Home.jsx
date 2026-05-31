import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.navbar}>
        <div style={s.navInner}>
          <div style={s.navBrand}>
            <span style={{ fontSize: "1.5rem" }}>🩸</span>
            <span style={s.navTitle}>BloodBank</span>
          </div>
          <div style={s.navLinks}>
            <Link to="/login" style={s.navOutlineBtn}
              onMouseOver={(e) => (e.currentTarget.style.background = "#fef2f2")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >Login</Link>
            <Link to="/register-hospital" style={s.navSolidBtn}
              onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
            >Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div className="hero-inner" style={s.heroInner}>
          {/* Left */}
          <div style={s.heroLeft}>
            <span style={s.heroPill}>🏥 Blood Bank Management System</span>
            <h1 style={s.heroHeading}>
              Need Blood<br />
              <span style={{ color: "#dc2626" }}>Urgently?</span>
            </h1>
            <p style={s.heroDesc}>
              Find available blood samples from registered hospitals instantly.
              Hospitals manage inventory while receivers request compatible blood with ease.
            </p>
            <div className="hero-btns" style={s.heroButtons}>
              <Link to="/available-blood" style={s.btnPrimary}
                onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
              >View Available Blood →</Link>
              <Link to="/register-receiver" style={s.btnOutline}
                onMouseOver={(e) => (e.currentTarget.style.background = "#fef2f2")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >Register as Receiver</Link>
            </div>
          </div>

          {/* Right — Stats Card */}
          <div className="hero-right" style={s.heroRight}>
            <div style={s.statsCard}>
              <div className="stats-grid" style={s.statsGrid}>
                {[
                  { val: "24/7", label: "Blood Availability", icon: "⏰" },
                  { val: "Fast", label: "Blood Requests", icon: "⚡" },
                  { val: "Secure", label: "Hospital Access", icon: "🔒" },
                  { val: "Easy", label: "Management", icon: "✅" },
                ].map(({ val, label, icon }) => (
                  <div key={val} style={s.statItem}>
                    <span style={{ fontSize: "1.6rem" }}>{icon}</span>
                    <span style={s.statVal}>{val}</span>
                    <span style={s.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div style={s.floatingBadge}>
              <span style={{ fontSize: "1.2rem" }}>🩸</span>
              <span style={{ fontWeight: "700", color: "#dc2626" }}>Live Inventory</span>
              <span style={s.liveGreen} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionHead}>
            <span style={s.sectionPill}>Features</span>
            <h2 style={s.sectionTitle}>System Features</h2>
            <p style={s.sectionSub}>Everything you need in one platform</p>
          </div>
          <div className="feat-grid" style={s.featGrid}>
            {[
              { icon: "🏥", title: "Hospitals", desc: "Register and manage available blood samples. Approve or reject incoming receiver requests in real time." },
              { icon: "🩸", title: "Available Blood", desc: "Browse blood inventory from all registered hospitals without needing to log in." },
              { icon: "❤️", title: "Receivers", desc: "Register, request compatible blood quickly, and track your request status from one dashboard." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={s.featCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(220,38,38,0.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.07)";
                }}
              >
                <div style={s.featIcon}>{icon}</div>
                <h3 style={s.featTitle}>{title}</h3>
                <p style={s.featDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ ...s.section, background: "linear-gradient(135deg,#fff1f2 0%,#f8fafc 100%)" }}>
        <div style={s.sectionInner}>
          <div style={s.sectionHead}>
            <span style={s.sectionPill}>Process</span>
            <h2 style={s.sectionTitle}>How It Works</h2>
            <p style={s.sectionSub}>5 simple steps to get the blood you need</p>
          </div>
          <div className="steps-row" style={s.stepsRow}>
            {[
              { num: "1", icon: "🏥", label: "Hospital Registers" },
              { num: "2", icon: "➕", label: "Add Blood Samples" },
              { num: "3", icon: "👁️", label: "View Available Blood" },
              { num: "4", icon: "📋", label: "Request Blood" },
              { num: "5", icon: "✅", label: "Hospital Reviews" },
            ].map(({ num, icon, label }, idx, arr) => (
              <div key={num} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={s.stepCard}>
                  <div style={s.stepNum}>{num}</div>
                  <div style={{ fontSize: "1.8rem", margin: "0.5rem 0" }}>{icon}</div>
                  <p style={s.stepLabel}>{label}</p>
                </div>
                {idx < arr.length - 1 && <div className="step-arrow" style={s.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={s.ctaBanner}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaTitle}>Every Second Counts</h2>
          <p style={s.ctaSub}>Register your hospital or find blood right now — it's free and instant.</p>
          <div className="cta-btns" style={s.ctaBtns}>
            <Link to="/available-blood" style={s.ctaBtnWhite}
              onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >View Blood Inventory</Link>
            <Link to="/register-hospital" style={s.ctaBtnOutline}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >Register Hospital</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerBrand}>
            <span style={{ fontSize: "1.4rem" }}>🩸</span>
            <span style={s.footerTitle}>BloodBank</span>
          </div>
          <p style={s.footerSub}>Blood Bank Management System</p>
          <p style={s.footerCopy}>© 2026 All Rights Reserved</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Sora', sans-serif; margin: 0; overflow-x: hidden; }
        a { text-decoration: none; }

        /* HERO */
        .hero-inner {
          flex-direction: row;
        }
        .hero-right {
          flex: 1;
          min-width: 280px;
          position: relative;
        }

        /* FEATURES GRID — 3 cols desktop */
        .feat-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }

        /* STEPS */
        .steps-row {
          flex-wrap: nowrap;
        }
        .step-arrow {
          display: block;
        }

        /* CTA BUTTONS */
        .cta-btns {
          flex-direction: row;
        }

        /* HERO BUTTONS */
        .hero-btns {
          flex-direction: row;
        }

        /* STATS GRID — 2 cols always */
        .stats-grid {
          grid-template-columns: 1fr 1fr !important;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column !important;
            gap: 3rem !important;
          }
          .hero-right {
            width: 100% !important;
            max-width: 500px;
            margin: 0 auto;
          }
          .steps-row {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .step-arrow {
            display: none !important;
          }
          .feat-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .feat-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-btns {
            flex-direction: column !important;
            width: 100%;
          }
          .hero-btns a {
            text-align: center;
            width: 100%;
          }
          .cta-btns {
            flex-direction: column !important;
            align-items: center !important;
            width: 100%;
          }
          .cta-btns a {
            width: 100%;
            text-align: center;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    fontFamily: "'Sora', sans-serif",
    overflowX: "hidden",
  },
  // Navbar
  navbar: {
    background: "#fff",
    borderBottom: "1px solid #fee2e2",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 8px rgba(220,38,38,0.08)",
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBrand: { display: "flex", alignItems: "center", gap: "0.5rem" },
  navTitle: { fontSize: "1.4rem", fontWeight: "800", color: "#dc2626", letterSpacing: "0.02em" },
  navLinks: { display: "flex", gap: "0.75rem", alignItems: "center" },
  navOutlineBtn: {
    padding: "8px 20px",
    border: "1.5px solid #dc2626",
    color: "#dc2626",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontWeight: "600",
    background: "transparent",
    transition: "background 0.2s",
    fontFamily: "inherit",
  },
  navSolidBtn: {
    padding: "8px 20px",
    background: "#dc2626",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontWeight: "600",
    border: "none",
    transition: "background 0.2s",
    fontFamily: "inherit",
  },
  // Hero
  hero: {
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 60%, #fff 100%)",
    padding: "5rem 1.5rem 4rem",
    overflowX: "hidden",
  },
  heroInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "4rem",
  },
  heroLeft: { flex: 1, minWidth: "0" },
  heroPill: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "1.5rem",
  },
  heroHeading: {
    fontSize: "clamp(2rem, 6vw, 4.5rem)",
    fontWeight: "900",
    color: "#111827",
    lineHeight: 1.05,
    margin: "0 0 1.5rem",
    letterSpacing: "-0.02em",
    wordBreak: "break-word",
  },
  heroDesc: {
    color: "#6b7280",
    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
    lineHeight: 1.7,
    margin: "0 0 2.5rem",
    maxWidth: "500px",
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#dc2626",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.95rem",
    transition: "background 0.2s",
    display: "inline-block",
  },
  btnOutline: {
    background: "transparent",
    color: "#dc2626",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.95rem",
    border: "2px solid #dc2626",
    transition: "background 0.2s",
    display: "inline-block",
  },
  heroRight: { flex: 1, minWidth: "0" },
  statsCard: {
    background: "#fff",
    borderRadius: "24px",
    padding: "2rem",
    boxShadow: "0 20px 60px rgba(220,38,38,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    border: "1px solid #fee2e2",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  statItem: {
    background: "linear-gradient(135deg, #fff1f2, #fef2f2)",
    borderRadius: "16px",
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    border: "1px solid #fecdd3",
  },
  statVal: { fontSize: "1.6rem", fontWeight: "800", color: "#dc2626", lineHeight: 1 },
  statLabel: { fontSize: "0.78rem", color: "#6b7280", fontWeight: "500", textAlign: "center" },
  floatingBadge: {
    position: "absolute",
    bottom: "-16px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1.5px solid #fecdd3",
    borderRadius: "20px",
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    boxShadow: "0 4px 12px rgba(220,38,38,0.1)",
    whiteSpace: "nowrap",
  },
  liveGreen: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "#16a34a", display: "inline-block",
    boxShadow: "0 0 6px #16a34a",
  },
  // Sections
  section: { padding: "5rem 1.5rem", background: "#fff" },
  sectionInner: { maxWidth: "1200px", margin: "0 auto" },
  sectionHead: { textAlign: "center", marginBottom: "3.5rem" },
  sectionPill: {
    background: "#fee2e2", color: "#dc2626",
    padding: "5px 16px", borderRadius: "20px",
    fontSize: "0.78rem", fontWeight: "700",
    display: "inline-block", marginBottom: "0.75rem",
    letterSpacing: "0.06em", textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: "800", color: "#111827",
    margin: "0 0 0.75rem", letterSpacing: "-0.02em",
  },
  sectionSub: { color: "#9ca3af", fontSize: "1rem", margin: 0 },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
  },
  featCard: {
    background: "#fff",
    border: "1.5px solid #fee2e2",
    borderRadius: "20px",
    padding: "2rem",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
    cursor: "default",
  },
  featIcon: { fontSize: "3rem", marginBottom: "1rem" },
  featTitle: { fontSize: "1.2rem", fontWeight: "700", color: "#111827", margin: "0 0 0.75rem" },
  featDesc: { color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 },
  // How it works
  stepsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  stepCard: {
    background: "#fff",
    border: "1.5px solid #fee2e2",
    borderRadius: "16px",
    padding: "1.5rem 1rem",
    textAlign: "center",
    width: "130px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
  },
  stepNum: {
    background: "#dc2626",
    color: "#fff",
    borderRadius: "50%",
    width: "32px", height: "32px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "800", fontSize: "0.9rem",
    margin: "0 auto",
  },
  stepLabel: { margin: 0, fontSize: "0.78rem", color: "#374151", fontWeight: "600", marginTop: "0.4rem" },
  stepArrow: {
    color: "#fca5a5",
    fontSize: "1.4rem",
    fontWeight: "700",
  },
  // CTA
  ctaBanner: {
    background: "linear-gradient(120deg, #dc2626 0%, #9f1239 100%)",
    padding: "5rem 1.5rem",
  },
  ctaInner: { maxWidth: "700px", margin: "0 auto", textAlign: "center" },
  ctaTitle: {
    color: "#fff",
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: "900",
    margin: "0 0 1rem",
    letterSpacing: "-0.02em",
  },
  ctaSub: { color: "#fecdd3", fontSize: "1.05rem", margin: "0 0 2.5rem", lineHeight: 1.6 },
  ctaBtns: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaBtnWhite: {
    background: "#fff",
    color: "#dc2626",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.95rem",
    transition: "background 0.2s",
    display: "inline-block",
  },
  ctaBtnOutline: {
    background: "transparent",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.95rem",
    border: "2px solid rgba(255,255,255,0.6)",
    transition: "background 0.2s",
    display: "inline-block",
  },
  // Footer
  footer: {
    background: "#111827",
    padding: "3rem 1.5rem",
  },
  footerInner: { maxWidth: "1200px", margin: "0 auto", textAlign: "center" },
  footerBrand: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "0.5rem", marginBottom: "0.75rem",
  },
  footerTitle: { color: "#ef4444", fontSize: "1.4rem", fontWeight: "800" },
  footerSub: { color: "#9ca3af", margin: "0 0 0.5rem", fontSize: "0.9rem" },
  footerCopy: { color: "#4b5563", fontSize: "0.82rem", margin: 0 },
};

export default Home;