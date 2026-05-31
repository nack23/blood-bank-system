import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import API_URL from "../config";

function AvailableBlood() {
  const [bloodSamples, setBloodSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlood();
  }, []);

  const fetchBlood = async () => {
    try {
      const response = await axios.post(
        API_URL,
        { action: "get_blood_samples" }
      );
      setBloodSamples(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (sampleId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/receiver-dashboard");
  };

  // Group by blood group for summary bar
  const groups = bloodSamples.reduce((acc, item) => {
    acc[item.blood_group] = (acc[item.blood_group] || 0) + Number(item.units);
    return acc;
  }, {});

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerLeft}>
            <span style={{ fontSize: "2rem" }}>🩸</span>
            <div>
              <h1 style={s.headerTitle}>Available Blood Inventory</h1>
              <p style={s.headerSub}>Find and request blood from registered hospitals</p>
            </div>
          </div>
          <span style={s.tagWhite}>{bloodSamples.length} samples</span>
        </div>
      </div>

      <div style={s.main}>
        {/* Blood Group Summary Chips */}
        {Object.keys(groups).length > 0 && (
          <div style={s.chipRow}>
            {Object.entries(groups).map(([grp, total]) => (
              <div key={grp} style={s.chip}>
                <span style={s.chipGroup}>{grp}</span>
                <span style={s.chipUnits}>{total} units</span>
              </div>
            ))}
          </div>
        )}

        {/* Table Card */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div>
              <h2 style={s.cardTitle}>Blood Samples</h2>
              <p style={s.cardSub}>Click "Request Blood" to proceed</p>
            </div>
          </div>

          {/* Desktop Table */}
          <div style={{ overflowX: "auto" }} className="desk-table">
            <table style={s.table}>
              <thead>
                <tr>
                  {["Hospital", "Blood Group", "Available Units", "Action"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} style={s.emptyRow}>Loading...</td>
                  </tr>
                )}
                {!loading && bloodSamples.length === 0 && (
                  <tr>
                    <td colSpan={4} style={s.emptyRow}>No blood samples available right now</td>
                  </tr>
                )}
                {bloodSamples.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#fef2f2", transition: "background 0.15s" }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#fee2e2")}
                    onMouseOut={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fef2f2")}
                  >
                    <td style={s.td}>
                      <span style={s.hospitalName}>{item.hospital_name}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.bloodBadge}>{item.blood_group}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.unitBadge}>{item.units}</span>
                    </td>
                    <td style={s.td}>
                      <button
                        style={s.requestBtn}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
                        onClick={() => handleRequest(item.id)}
                      >
                        Request Blood
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div style={{ display: "none", flexDirection: "column", gap: "1rem", padding: "1rem" }} className="mob-cards">
            {loading && (
              <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>Loading...</p>
            )}
            {!loading && bloodSamples.length === 0 && (
              <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                No blood samples available right now
              </p>
            )}
            {bloodSamples.map((item) => (
              <div key={item.id} style={s.mobileCard}>
                <div style={s.mobileRow}>
                  <span style={s.bloodBadge}>{item.blood_group}</span>
                  <span style={s.unitBadge}>{item.units} units</span>
                </div>
                <p style={s.mobileHospital}>{item.hospital_name}</p>
                <button
                  style={{ ...s.requestBtn, width: "100%", marginTop: "0.3rem" }}
                  onClick={() => handleRequest(item.id)}
                >
                  Request Blood
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Sora', sans-serif; margin: 0; }
        @media (max-width: 768px) {
          .desk-table { display: none !important; }
          .mob-cards { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desk-table { display: block !important; }
          .mob-cards { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 60%, #fff 100%)",
    fontFamily: "'Sora', sans-serif",
  },
  header: {
    background: "linear-gradient(120deg, #dc2626 0%, #9f1239 100%)",
    padding: "2.5rem 2rem",
    boxShadow: "0 2px 16px rgba(220,38,38,0.25)",
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "1rem" },
  headerTitle: {
    color: "#fff",
    fontSize: "clamp(1.3rem, 3vw, 2rem)",
    fontWeight: "700",
    margin: "0 0 0.3rem",
  },
  headerSub: { color: "#fecdd3", margin: 0, fontSize: "0.88rem" },
  tagWhite: {
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "600",
    border: "1px solid rgba(255,255,255,0.3)",
    whiteSpace: "nowrap",
  },
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  chip: {
    background: "#fff",
    border: "1.5px solid #fecdd3",
    borderRadius: "12px",
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(220,38,38,0.08)",
    minWidth: "70px",
  },
  chipGroup: {
    background: "#dc2626",
    color: "#fff",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "0.82rem",
    fontWeight: "700",
    display: "inline-block",
    marginBottom: "3px",
  },
  chipUnits: { color: "#6b7280", fontSize: "0.75rem", fontWeight: "500" },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
    overflow: "hidden",
    border: "1px solid #fee2e2",
  },
  cardHeader: {
    padding: "1.5rem 1.5rem 1rem",
    borderBottom: "1px solid #fef2f2",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  cardTitle: { margin: "0 0 0.2rem", fontSize: "1.15rem", fontWeight: "700", color: "#111827" },
  cardSub: { margin: 0, color: "#9ca3af", fontSize: "0.82rem" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th: {
    background: "#1f2937",
    color: "#f9fafb",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.78rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 16px",
    verticalAlign: "middle",
    borderBottom: "1px solid #fee2e2",
    color: "#374151",
  },
  emptyRow: {
    padding: "2.5rem",
    textAlign: "center",
    color: "#9ca3af",
    fontStyle: "italic",
  },
  hospitalName: { fontWeight: "600", color: "#111827", fontSize: "0.88rem" },
  bloodBadge: {
    background: "#dc2626",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "700",
    display: "inline-block",
  },
  unitBadge: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "600",
    display: "inline-block",
  },
  requestBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "0.82rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  mobileCard: {
    background: "#fff",
    border: "1.5px solid #fecdd3",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    boxShadow: "0 1px 4px rgba(220,38,38,0.07)",
  },
  mobileRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  },
  mobileHospital: {
    margin: 0,
    fontWeight: "600",
    color: "#111827",
    fontSize: "0.95rem",
  },
};

export default AvailableBlood;