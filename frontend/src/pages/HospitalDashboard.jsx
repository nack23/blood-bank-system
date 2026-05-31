import { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../config";

function HospitalDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [bloodSamples, setBloodSamples] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingAction, setLoadingAction] = useState({});

  useEffect(() => {
    fetchBloodSamples();
    fetchRequests();
  }, []);

  const fetchBloodSamples = async () => {
    try {
      const response = await axios.post(
        API_URL,
        { action: "get_blood_samples" }
      );
      setBloodSamples(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.post(
        API_URL,
        { action: "get_requests", hospital_id: user.id }
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveRequest = async (id) => {
    setLoadingAction((p) => ({ ...p, [id]: "approving" }));
    try {
      const response = await axios.post(
        API_URL,
        { action: "approve_request", id }
      );
      if (response.data.success) fetchRequests();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAction((p) => ({ ...p, [id]: null }));
    }
  };

  const rejectRequest = async (id) => {
    setLoadingAction((p) => ({ ...p, [id]: "rejecting" }));
    try {
      const response = await axios.post(
        API_URL,
        { action: "reject_request", id }
      );
      if (response.data.success) fetchRequests();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAction((p) => ({ ...p, [id]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL,
        { action: "add_blood", hospital_id: user.id, blood_group: bloodGroup, units }
      );
      if (response.data.success) {
        setMessage({ text: "Blood Sample Added Successfully!", type: "success" });
        setBloodGroup("");
        setUnits("");
        fetchBloodSamples();
      } else {
        setMessage({ text: "Failed To Add Blood Sample", type: "error" });
      }
    } catch (error) {
      console.log(error);
      setMessage({ text: "Server Error", type: "error" });
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const pendingCount = requests.filter((r) => r.status?.toLowerCase() === "pending").length;
  const approvedCount = requests.filter((r) => r.status?.toLowerCase() === "approved").length;

  const statusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "approved")
      return <span style={badge.approved}><span style={dot("#16a34a")} />Approved</span>;
    if (s === "rejected")
      return <span style={badge.rejected}><span style={dot("#dc2626")} />Rejected</span>;
    return <span style={badge.pending}><span style={dot("#d97706")} />Pending</span>;
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.navbar}>
        <div style={s.navBrand}>
          <span style={{ fontSize: "1.5rem" }}>🏥</span>
          <span style={s.navTitle}>BloodBank</span>
          <span style={s.navSeparator}>|</span>
          <span style={s.navSubtitle}>Hospital Portal</span>
        </div>
        <div style={s.navRight}>
          {user && (
            <span style={s.navUser}>
              <span style={s.avatarCircle}>{user.name?.charAt(0).toUpperCase()}</span>
              {user.name}
            </span>
          )}
          <button
            style={s.logoutBtn}
            onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div style={s.heroBanner}>
        <div>
          <h2 style={s.heroTitle}>
            Hospital Dashboard —{" "}
            <span style={{ color: "#fca5a5" }}>{user?.name}</span>
          </h2>
          <p style={s.heroSub}>Manage blood inventory and receiver requests</p>
        </div>
        <div style={s.heroStats}>
          {[
            { num: bloodSamples.length, label: "Blood Samples" },
            { num: requests.length, label: "Total Requests" },
            { num: pendingCount, label: "Pending" },
            { num: approvedCount, label: "Approved" },
          ].map(({ num, label }) => (
            <div key={label} style={s.statCard}>
              <span style={s.statNum}>{num}</span>
              <span style={s.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.mainContent}>
        {/* Add Blood Sample Form */}
        <section style={s.card}>
          <div style={s.cardHeader}>
            <div>
              <h3 style={s.cardTitle}>Add Blood Sample</h3>
              <p style={s.cardSub}>Register new blood units to the inventory</p>
            </div>
            <span style={{ fontSize: "2rem" }}>🩸</span>
          </div>
          <div style={{ padding: "1.5rem" }}>
            {message.text && (
              <div style={message.type === "success" ? s.alertSuccess : s.alertError}>
                {message.type === "success" ? "✅" : "❌"} {message.text}
              </div>
            )}
            <div style={s.formGrid}>
              <div style={s.formGroup}>
                <label style={s.label}>Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  style={s.select}
                  required
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Units Available</label>
                <input
                  type="number"
                  placeholder="Enter units"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  style={s.input}
                  required
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={handleSubmit}
                  style={s.submitBtn}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
                >
                  + Add Sample
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Blood Inventory Table */}
        <section style={{ ...s.card, marginTop: "2rem" }}>
          <div style={s.cardHeader}>
            <div>
              <h3 style={s.cardTitle}>Blood Inventory</h3>
              <p style={s.cardSub}>All available blood samples across hospitals</p>
            </div>
            <span style={s.tagRed}>{bloodSamples.length} records</span>
          </div>

          {/* Desktop */}
          <div style={{ overflowX: "auto" }} className="desk-table">
            <table style={s.table}>
              <thead>
                <tr>
                  {["Hospital", "Blood Group", "Units", "Date Added"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bloodSamples.length === 0 && (
                  <tr><td colSpan={4} style={s.emptyRow}>No blood samples found</td></tr>
                )}
                {bloodSamples.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#fef2f2", transition: "background 0.15s" }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#fee2e2")}
                    onMouseOut={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fef2f2")}
                  >
                    <td style={s.td}><span style={s.hospitalName}>{item.hospital_name}</span></td>
                    <td style={s.td}><span style={s.bloodBadge}>{item.blood_group}</span></td>
                    <td style={s.td}><span style={s.unitBadge}>{item.units}</span></td>
                    <td style={{ ...s.td, color: "#6b7280", fontSize: "0.85rem" }}>{item.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div style={{ display: "none", flexDirection: "column", gap: "1rem", padding: "1rem" }} className="mob-cards">
            {bloodSamples.map((item) => (
              <div key={item.id} style={s.mobileCard}>
                <div style={s.mobileRow}>
                  <span style={s.bloodBadge}>{item.blood_group}</span>
                  <span style={s.unitBadge}>{item.units} units</span>
                </div>
                <p style={s.mobileHospital}>{item.hospital_name}</p>
                <p style={s.mobileDate}>{item.created_at}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Receiver Requests Table */}
        <section style={{ ...s.card, marginTop: "2rem", marginBottom: "2rem" }}>
          <div style={s.cardHeader}>
            <div>
              <h3 style={s.cardTitle}>Receiver Requests</h3>
              <p style={s.cardSub}>Review and manage incoming blood requests</p>
            </div>
            <span style={s.tagRed}>{requests.length} requests</span>
          </div>

          {/* Desktop */}
          <div style={{ overflowX: "auto" }} className="desk-table">
            <table style={s.table}>
              <thead>
                <tr>
                  {["Receiver", "Hospital", "Blood Group", "Requested", "Available", "Status", "Date", "Action"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 && (
                  <tr><td colSpan={8} style={s.emptyRow}>No requests found</td></tr>
                )}
                {requests.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#fef2f2", transition: "background 0.15s" }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#fee2e2")}
                    onMouseOut={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fef2f2")}
                  >
                    <td style={s.td}><span style={s.hospitalName}>{item.receiver_name}</span></td>
                    <td style={s.td}><span style={{ color: "#374151", fontSize: "0.85rem" }}>{item.hospital_name}</span></td>
                    <td style={s.td}><span style={s.bloodBadge}>{item.blood_group}</span></td>
                    <td style={s.td}><span style={s.unitBadge}>{item.requested_units}</span></td>
                    <td style={s.td}><span style={s.unitBadge}>{item.available_units}</span></td>
                    <td style={s.td}>{statusBadge(item.status)}</td>
                    <td style={{ ...s.td, color: "#6b7280", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                      {new Date(item.request_date).toLocaleString()}
                    </td>
                    <td style={s.td}>
                      {item.status?.toLowerCase() === "pending" && item.hospital_name === user?.name ? (
                        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center" }}>
                          <button
                            style={s.approveBtn}
                            disabled={loadingAction[item.id]}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#15803d")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#16a34a")}
                            onClick={() => approveRequest(item.id)}
                          >
                            {loadingAction[item.id] === "approving" ? "…" : "✓ Approve"}
                          </button>
                          <button
                            style={s.rejectBtn}
                            disabled={loadingAction[item.id]}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
                            onClick={() => rejectRequest(item.id)}
                          >
                            {loadingAction[item.id] === "rejecting" ? "…" : "✕ Reject"}
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#d1d5db", fontSize: "0.8rem" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div style={{ display: "none", flexDirection: "column", gap: "1rem", padding: "1rem" }} className="mob-cards">
            {requests.map((item) => (
              <div key={item.id} style={s.mobileCard}>
                <div style={s.mobileRow}>
                  <span style={s.bloodBadge}>{item.blood_group}</span>
                  {statusBadge(item.status)}
                </div>
                <p style={s.mobileHospital}>{item.receiver_name}</p>
                <p style={{ ...s.mobileDate, marginBottom: "0.3rem" }}>{item.hospital_name}</p>
                <div style={s.mobileRow}>
                  <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>
                    Req: {item.requested_units} | Avail: {item.available_units}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>
                    {new Date(item.request_date).toLocaleDateString()}
                  </span>
                </div>
                {item.status?.toLowerCase() === "pending" && item.hospital_name === user?.name && (
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button style={{ ...s.approveBtn, flex: 1 }} onClick={() => approveRequest(item.id)}>
                      ✓ Approve
                    </button>
                    <button style={{ ...s.rejectBtn, flex: 1 }} onClick={() => rejectRequest(item.id)}>
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
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

const badge = {
  approved: {
    background: "#dcfce7", color: "#16a34a", padding: "4px 12px",
    borderRadius: "20px", fontSize: "0.78rem", fontWeight: "700",
    display: "inline-flex", alignItems: "center", gap: "5px",
  },
  rejected: {
    background: "#fee2e2", color: "#dc2626", padding: "4px 12px",
    borderRadius: "20px", fontSize: "0.78rem", fontWeight: "700",
    display: "inline-flex", alignItems: "center", gap: "5px",
  },
  pending: {
    background: "#fef3c7", color: "#d97706", padding: "4px 12px",
    borderRadius: "20px", fontSize: "0.78rem", fontWeight: "700",
    display: "inline-flex", alignItems: "center", gap: "5px",
  },
};

const dot = (color) => ({
  width: "6px", height: "6px", borderRadius: "50%",
  background: color, display: "inline-block",
});

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 60%, #fff 100%)",
    fontFamily: "'Sora', sans-serif",
  },
  navbar: {
    background: "linear-gradient(90deg, #be123c 0%, #dc2626 100%)",
    padding: "0 2rem",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 16px rgba(220,38,38,0.25)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navBrand: { display: "flex", alignItems: "center", gap: "0.5rem" },
  navTitle: { color: "#fff", fontSize: "1.4rem", fontWeight: "700", letterSpacing: "0.04em" },
  navSeparator: { color: "rgba(255,255,255,0.4)", fontSize: "1.2rem", margin: "0 0.2rem" },
  navSubtitle: { color: "#fca5a5", fontSize: "0.85rem", fontWeight: "500" },
  navRight: { display: "flex", alignItems: "center", gap: "1rem" },
  navUser: {
    color: "#fecdd3", fontSize: "0.9rem", fontWeight: "500",
    display: "flex", alignItems: "center", gap: "0.5rem",
  },
  avatarCircle: {
    background: "#fff", color: "#dc2626", borderRadius: "50%",
    width: "30px", height: "30px", display: "inline-flex",
    alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.9rem",
  },
  logoutBtn: {
    background: "transparent", border: "1.5px solid rgba(255,255,255,0.6)",
    color: "#fff", padding: "6px 18px", borderRadius: "8px",
    cursor: "pointer", fontSize: "0.85rem", fontWeight: "600",
    transition: "background 0.2s", fontFamily: "inherit",
  },
  heroBanner: {
    background: "linear-gradient(120deg, #dc2626 0%, #9f1239 100%)",
    padding: "2.5rem 2rem",
    display: "flex", flexWrap: "wrap", gap: "2rem",
    alignItems: "center", justifyContent: "space-between",
  },
  heroTitle: {
    color: "#fff", fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
    fontWeight: "700", margin: "0 0 0.4rem",
  },
  heroSub: { color: "#fecdd3", margin: 0, fontSize: "0.9rem" },
  heroStats: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  statCard: {
    background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
    borderRadius: "12px", padding: "1rem 1.5rem", textAlign: "center",
    minWidth: "90px", border: "1px solid rgba(255,255,255,0.2)",
  },
  statNum: { display: "block", color: "#fff", fontSize: "1.8rem", fontWeight: "700", lineHeight: 1 },
  statLabel: { display: "block", color: "#fecdd3", fontSize: "0.72rem", marginTop: "0.3rem", fontWeight: "500" },
  mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" },
  card: {
    background: "#fff", borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
    overflow: "hidden", border: "1px solid #fee2e2",
  },
  cardHeader: {
    padding: "1.5rem 1.5rem 1rem",
    display: "flex", alignItems: "flex-start",
    justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
    borderBottom: "1px solid #fef2f2",
  },
  cardTitle: { margin: "0 0 0.2rem", fontSize: "1.15rem", fontWeight: "700", color: "#111827" },
  cardSub: { margin: 0, color: "#9ca3af", fontSize: "0.82rem" },
  tagRed: {
    background: "#fee2e2", color: "#dc2626", padding: "4px 12px",
    borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600", whiteSpace: "nowrap",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    alignItems: "end",
  },
  formGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.82rem", fontWeight: "600", color: "#374151" },
  select: {
    border: "1.5px solid #fca5a5", borderRadius: "8px", padding: "10px 12px",
    fontSize: "0.88rem", fontFamily: "inherit", color: "#111827",
    outline: "none", background: "#fff", cursor: "pointer",
  },
  input: {
    border: "1.5px solid #fca5a5", borderRadius: "8px", padding: "10px 12px",
    fontSize: "0.88rem", fontFamily: "inherit", color: "#111827", outline: "none",
  },
  submitBtn: {
    background: "#dc2626", color: "#fff", border: "none",
    borderRadius: "8px", padding: "10px 24px", fontSize: "0.88rem",
    fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
    transition: "background 0.2s", whiteSpace: "nowrap",
  },
  alertSuccess: {
    background: "#dcfce7", color: "#15803d", padding: "10px 14px",
    borderRadius: "8px", marginBottom: "1rem", fontSize: "0.88rem", fontWeight: "500",
  },
  alertError: {
    background: "#fee2e2", color: "#b91c1c", padding: "10px 14px",
    borderRadius: "8px", marginBottom: "1rem", fontSize: "0.88rem", fontWeight: "500",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th: {
    background: "#1f2937", color: "#f9fafb", padding: "12px 16px",
    textAlign: "left", fontWeight: "600", fontSize: "0.78rem",
    letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap",
  },
  td: { padding: "12px 16px", verticalAlign: "middle", borderBottom: "1px solid #fee2e2", color: "#374151" },
  emptyRow: { padding: "2.5rem", textAlign: "center", color: "#9ca3af", fontStyle: "italic" },
  hospitalName: { fontWeight: "600", color: "#111827", fontSize: "0.88rem" },
  bloodBadge: {
    background: "#dc2626", color: "#fff", padding: "3px 10px",
    borderRadius: "20px", fontSize: "0.8rem", fontWeight: "700", display: "inline-block",
  },
  unitBadge: {
    background: "#f3f4f6", color: "#374151", padding: "3px 10px",
    borderRadius: "20px", fontSize: "0.82rem", fontWeight: "600", display: "inline-block",
  },
  approveBtn: {
    background: "#16a34a", color: "#fff", border: "none",
    borderRadius: "7px", padding: "6px 12px", fontSize: "0.78rem",
    fontWeight: "600", cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  rejectBtn: {
    background: "#dc2626", color: "#fff", border: "none",
    borderRadius: "7px", padding: "6px 12px", fontSize: "0.78rem",
    fontWeight: "600", cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  mobileCard: {
    background: "#fff", border: "1.5px solid #fecdd3", borderRadius: "12px",
    padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem",
    boxShadow: "0 1px 4px rgba(220,38,38,0.07)",
  },
  mobileRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" },
  mobileHospital: { margin: 0, fontWeight: "600", color: "#111827", fontSize: "0.95rem" },
  mobileDate: { margin: 0, color: "#9ca3af", fontSize: "0.8rem" },
};

export default HospitalDashboard;