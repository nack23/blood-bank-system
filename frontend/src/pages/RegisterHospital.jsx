import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import API_URL from "../config";

function RegisterHospital() {
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { name: hospitalName, email, password, role: "hospital" },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMessage("Hospital Registered Successfully! Redirecting to Login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setErrorMessage(response.data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      {/* Left Panel */}
      <div style={s.leftPanel} className="left-panel">
        {/* Back to Home */}
        <Link to="/" style={s.backHome}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
        >
          ← Back to Home
        </Link>

        <div style={s.leftContent}>
          <div style={s.leftBrand}>
            <span style={{ fontSize: "2rem" }}>🩸</span>
            <span style={s.leftBrandText}>BloodBank</span>
          </div>

          <h2 style={s.leftHeading}>
            Join Our<br />
            Blood Donation<br />
            <span style={{ color: "#fca5a5" }}>Network</span>
          </h2>

          <p style={s.leftDesc}>
            Register your hospital and manage blood inventory,
            requests, and availability in one secure platform.
          </p>

          <div style={s.checkList}>
            {[
              { icon: "🩸", text: "Manage Blood Samples" },
              { icon: "📋", text: "Receive Blood Requests" },
              { icon: "✅", text: "Approve or Reject Requests" },
              { icon: "🔒", text: "Secure Dashboard Access" },
            ].map(({ icon, text }) => (
              <div key={text} style={s.checkItem}>
                <span style={s.checkIcon}>{icon}</span>
                <span style={s.checkText}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative circles */}
        <div style={s.circle1} />
        <div style={s.circle2} />
      </div>

      {/* Right Panel */}
      <div style={s.rightPanel}>
        {/* Mobile back to home */}
        <Link to="/" style={s.mobileBack} className="mobile-back"
          onMouseOver={(e) => (e.currentTarget.style.color = "#b91c1c")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#dc2626")}
        >
          ← Home
        </Link>

        <div style={s.formCard}>
          {/* Header */}
          <div style={s.formHeader}>
            <div style={s.formIconWrap}>
              <span style={{ fontSize: "1.8rem" }}>🏥</span>
            </div>
            <h1 style={s.formTitle}>Hospital Register</h1>
            <p style={s.formSub}>Create your hospital account</p>
          </div>

          {/* Alerts */}
          {successMessage && (
            <div style={s.alertSuccess}>✅ {successMessage}</div>
          )}
          {errorMessage && (
            <div style={s.alertError}>❌ {errorMessage}</div>
          )}

          {/* Form Fields */}
          <div style={s.form}>
            {/* Hospital Name */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Hospital Name</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>🏥</span>
                <input
                  type="text"
                  placeholder="e.g. City General Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  style={s.input}
                  onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                  onBlur={(e) => (e.target.style.borderColor = "#fca5a5")}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Hospital Email</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>✉️</span>
                <input
                  type="email"
                  placeholder="hospital@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={s.input}
                  onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                  onBlur={(e) => (e.target.style.borderColor = "#fca5a5")}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Password</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...s.input, paddingRight: "3rem" }}
                  onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                  onBlur={(e) => (e.target.style.borderColor = "#fca5a5")}
                  required
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Confirm Password</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>🔐</span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    ...s.input,
                    paddingRight: "3rem",
                    borderColor: confirmPassword && confirmPassword !== password ? "#dc2626" : "#fca5a5",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                  onBlur={(e) => (e.target.style.borderColor =
                    confirmPassword && confirmPassword !== password ? "#dc2626" : "#fca5a5"
                  )}
                  required
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <span style={s.matchError}>Passwords do not match</span>
              )}
              {confirmPassword && confirmPassword === password && (
                <span style={s.matchSuccess}>✓ Passwords match</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.background = "#b91c1c")}
              onMouseOut={(e) => !loading && (e.currentTarget.style.background = "#dc2626")}
            >
              {loading ? "Registering..." : "Register Hospital →"}
            </button>
          </div>

          {/* Divider */}
          <div style={s.divider}>
            <div style={s.dividerLine} />
            <span style={s.dividerText}>OR</span>
            <div style={s.dividerLine} />
          </div>

          {/* Footer */}
          <div style={s.footerLinks}>
            <p style={s.footerText}>Already have an account?</p>
            <div style={s.footerRow}>
              <Link to="/login" style={s.linkRed}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
              >Login Here</Link>
              <span style={{ color: "#d1d5db" }}>|</span>
              <Link to="/register-receiver" style={s.linkRed}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
              >Register as Receiver</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Sora', sans-serif; margin: 0; }
        a { text-decoration: none; }
        @media (max-width: 900px) {
          .left-panel { display: none !important; }
          .mobile-back { display: inline-flex !important; }
        }
        @media (min-width: 901px) {
          .left-panel { display: flex !important; }
          .mobile-back { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Sora', sans-serif",
    background: "#f8fafc",
  },
  leftPanel: {
    width: "50%",
    background: "linear-gradient(140deg, #9f1239 0%, #dc2626 50%, #ef4444 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3rem 4rem",
    position: "relative",
    overflow: "hidden",
    className: "left-panel",
  },
  backHome: {
    position: "absolute",
    top: "1.5rem",
    left: "1.5rem",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "0.82rem",
    fontWeight: "600",
    transition: "background 0.2s",
    border: "1px solid rgba(255,255,255,0.2)",
    zIndex: 2,
  },
  leftContent: { position: "relative", zIndex: 2 },
  leftBrand: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" },
  leftBrandText: { color: "#fff", fontSize: "1.6rem", fontWeight: "800", letterSpacing: "0.02em" },
  leftHeading: {
    color: "#fff",
    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
    fontWeight: "900",
    margin: "0 0 1.2rem",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  leftDesc: {
    color: "#fecdd3",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    margin: "0 0 2.2rem",
    maxWidth: "380px",
  },
  checkList: { display: "flex", flexDirection: "column", gap: "0.85rem" },
  checkItem: { display: "flex", alignItems: "center", gap: "0.75rem" },
  checkIcon: {
    background: "rgba(255,255,255,0.2)",
    borderRadius: "8px",
    width: "36px", height: "36px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.1rem", flexShrink: 0,
  },
  checkText: { color: "#fff", fontSize: "0.92rem", fontWeight: "500" },
  circle1: {
    position: "absolute", bottom: "-80px", right: "-80px",
    width: "300px", height: "300px", borderRadius: "50%",
    background: "rgba(255,255,255,0.07)", zIndex: 1,
  },
  circle2: {
    position: "absolute", top: "-60px", right: "60px",
    width: "180px", height: "180px", borderRadius: "50%",
    background: "rgba(255,255,255,0.05)", zIndex: 1,
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1.5rem",
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 100%)",
    minHeight: "100vh",
  },
  mobileBack: {
    display: "none",
    alignSelf: "flex-start",
    color: "#dc2626",
    fontWeight: "600",
    fontSize: "0.88rem",
    marginBottom: "1.5rem",
    transition: "color 0.2s",
    className: "mobile-back",
  },
  formCard: {
    background: "#fff",
    borderRadius: "24px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 20px 60px rgba(220,38,38,0.1), 0 4px 16px rgba(0,0,0,0.06)",
    border: "1px solid #fee2e2",
  },
  formHeader: { textAlign: "center", marginBottom: "1.6rem" },
  formIconWrap: {
    background: "#fee2e2",
    borderRadius: "16px",
    width: "60px", height: "60px",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 1rem",
  },
  formTitle: {
    fontSize: "1.8rem", fontWeight: "800", color: "#111827",
    margin: "0 0 0.3rem", letterSpacing: "-0.02em",
  },
  formSub: { color: "#9ca3af", margin: 0, fontSize: "0.88rem" },
  alertSuccess: {
    background: "#dcfce7", color: "#15803d",
    padding: "10px 14px", borderRadius: "10px",
    marginBottom: "1.2rem", fontSize: "0.88rem",
    fontWeight: "500", textAlign: "center",
    border: "1px solid #bbf7d0",
  },
  alertError: {
    background: "#fee2e2", color: "#b91c1c",
    padding: "10px 14px", borderRadius: "10px",
    marginBottom: "1.2rem", fontSize: "0.88rem",
    fontWeight: "500", textAlign: "center",
    border: "1px solid #fecdd3",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.82rem", fontWeight: "600", color: "#374151" },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: "12px", fontSize: "1rem", pointerEvents: "none" },
  input: {
    width: "100%",
    padding: "11px 12px 11px 38px",
    border: "1.5px solid #fca5a5",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontFamily: "inherit",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fff",
  },
  eyeBtn: {
    position: "absolute", right: "10px",
    background: "none", border: "none",
    cursor: "pointer", fontSize: "1rem", padding: "4px",
  },
  matchError: { fontSize: "0.75rem", color: "#dc2626", fontWeight: "500", marginTop: "2px" },
  matchSuccess: { fontSize: "0.75rem", color: "#16a34a", fontWeight: "500", marginTop: "2px" },
  submitBtn: {
    background: "#dc2626", color: "#fff",
    border: "none", borderRadius: "10px",
    padding: "13px", fontSize: "0.95rem",
    fontWeight: "700", cursor: "pointer",
    fontFamily: "inherit", transition: "background 0.2s",
    width: "100%", marginTop: "0.4rem",
  },
  divider: {
    display: "flex", alignItems: "center",
    gap: "0.75rem", margin: "1.4rem 0 1.1rem",
  },
  dividerLine: { flex: 1, height: "1px", background: "#fee2e2" },
  dividerText: { color: "#9ca3af", fontSize: "0.78rem", fontWeight: "600" },
  footerLinks: { textAlign: "center" },
  footerText: { color: "#6b7280", fontSize: "0.88rem", margin: "0 0 0.5rem" },
  footerRow: { display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center" },
  linkRed: { color: "#dc2626", fontWeight: "600", fontSize: "0.85rem", transition: "text-decoration 0.2s" },
};

export default RegisterHospital;