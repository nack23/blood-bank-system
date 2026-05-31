import { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../config";

function ReceiverDashboard() {
  const [user, setUser] = useState(null);
  const [bloodSamples, setBloodSamples] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestUnits, setRequestUnits] = useState({});
  const [loadingSend, setLoadingSend] = useState({});

 

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

  const fetchMyRequests = async (receiverId) => {
    try {
      const response = await axios.post(
        API_URL,
        { action: "get_receiver_requests", receiver_id: receiverId }
      );
      setMyRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
   useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
    fetchBloodSamples();
    if (loggedUser) fetchMyRequests(loggedUser.id);
  }, []);

  const sendRequest = async (sampleId) => {
    const units = requestUnits[sampleId];
    if (!units || units <= 0) {
      alert("Please enter valid units");
      return;
    }
    setLoadingSend((prev) => ({ ...prev, [sampleId]: true }));
    try {
      const response = await axios.post(
        API_URL,
        {
          action: "send_request",
          receiver_id: user.id,
          sample_id: sampleId,
          units: units,
        }
      );
      if (response.data.success) {
        alert("Request Sent Successfully");
        fetchMyRequests(user.id);
      } else {
        alert("Failed To Send Request");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSend((prev) => ({ ...prev, [sampleId]: false }));
    }
  };

  const statusBadge = (status) => {
    if (status === "Approved")
      return (
        <span style={styles.badge.approved}>
          <span style={styles.badgeDot("#16a34a")} />
          Approved
        </span>
      );
    if (status === "Rejected")
      return (
        <span style={styles.badge.rejected}>
          <span style={styles.badgeDot("#dc2626")} />
          Rejected
        </span>
      );
    return (
      <span style={styles.badge.pending}>
        <span style={styles.badgeDot("#d97706")} />
        Pending
      </span>
    );
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <span style={styles.navIcon}>🩸</span>
          <span style={styles.navTitle}>BloodBank</span>
        </div>
        <div style={styles.navRight}>
          {user && (
            <span style={styles.navUser}>
              <span style={styles.avatarCircle}>
                {user.name?.charAt(0).toUpperCase()}
              </span>
              {user.name}
            </span>
          )}
          <button
            style={styles.logoutBtn}
            onMouseOver={(e) => (e.target.style.background = "#b91c1c")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>
            Welcome back,{" "}
            <span style={styles.heroName}>{user?.name ?? "..."}</span>
          </h2>
          <p style={styles.heroSub}>Receiver Dashboard · Manage your blood requests</p>
        </div>
        <div style={styles.heroStats}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{bloodSamples.length}</span>
            <span style={styles.statLabel}>Available Samples</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{myRequests.length}</span>
            <span style={styles.statLabel}>My Requests</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>
              {myRequests.filter((r) => r.status === "Approved").length}
            </span>
            <span style={styles.statLabel}>Approved</span>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Blood Inventory Table */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.cardTitle}>Available Blood Inventory</h3>
              <p style={styles.cardSub}>Browse and request blood from hospitals</p>
            </div>
            <span style={styles.tagRed}>{bloodSamples.length} records</span>
          </div>

          {/* Desktop table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Hospital", "Blood Group", "Available Units", "Date", "Request Units", "Action"].map(
                    (h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {bloodSamples.length === 0 && (
                  <tr>
                    <td colSpan={6} style={styles.emptyRow}>
                      No blood samples available
                    </td>
                  </tr>
                )}
                {bloodSamples.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{
                      ...styles.tr,
                      background: idx % 2 === 0 ? "#fff" : "#fef2f2",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#fee2e2")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background =
                        idx % 2 === 0 ? "#fff" : "#fef2f2")
                    }
                  >
                    <td style={styles.td}>
                      <span style={styles.hospitalName}>{item.hospital_name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.bloodGroupBadge}>{item.blood_group}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.unitCount}>{item.units}</span>
                    </td>
                    <td style={{ ...styles.td, color: "#6b7280", fontSize: "0.85rem" }}>
                      {item.created_at}
                    </td>
                    <td style={styles.td}>
                      <input
                        type="number"
                        min="1"
                        placeholder="Units"
                        style={styles.input}
                        onChange={(e) =>
                          setRequestUnits({ ...requestUnits, [item.id]: e.target.value })
                        }
                      />
                    </td>
                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.requestBtn,
                          opacity: loadingSend[item.id] ? 0.7 : 1,
                        }}
                        disabled={loadingSend[item.id]}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#b91c1c")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "#dc2626")
                        }
                        onClick={() => sendRequest(item.id)}
                      >
                        {loadingSend[item.id] ? "Sending…" : "Request"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards for inventory */}
          <div style={styles.mobileCards}>
            {bloodSamples.length === 0 && (
              <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                No blood samples available
              </p>
            )}
            {bloodSamples.map((item) => (
              <div key={item.id} style={styles.mobileCard}>
                <div style={styles.mobileCardRow}>
                  <span style={styles.bloodGroupBadge}>{item.blood_group}</span>
                  <span style={styles.unitCount}>{item.units} units</span>
                </div>
                <p style={styles.mobileCardHospital}>{item.hospital_name}</p>
                <p style={styles.mobileCardDate}>{item.created_at}</p>
                <div style={styles.mobileCardRow}>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter units"
                    style={{ ...styles.input, flex: 1 }}
                    onChange={(e) =>
                      setRequestUnits({ ...requestUnits, [item.id]: e.target.value })
                    }
                  />
                  <button
                    style={styles.requestBtn}
                    onClick={() => sendRequest(item.id)}
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Requests Table */}
        <section style={{ ...styles.card, marginTop: "2rem" }}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.cardTitle}>My Blood Requests</h3>
              <p style={styles.cardSub}>Track your submitted requests</p>
            </div>
            <span style={styles.tagRed}>{myRequests.length} requests</span>
          </div>

          {/* Desktop table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Hospital", "Blood Group", "Units", "Status", "Date"].map((h) => (
                    <th key={h} style={styles.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myRequests.length === 0 && (
                  <tr>
                    <td colSpan={5} style={styles.emptyRow}>
                      No requests submitted yet
                    </td>
                  </tr>
                )}
                {myRequests.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{
                      ...styles.tr,
                      background: idx % 2 === 0 ? "#fff" : "#fef2f2",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#fee2e2")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background =
                        idx % 2 === 0 ? "#fff" : "#fef2f2")
                    }
                  >
                    <td style={styles.td}>
                      <span style={styles.hospitalName}>{item.hospital_name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.bloodGroupBadge}>{item.blood_group}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.unitCount}>{item.units}</span>
                    </td>
                    <td style={styles.td}>{statusBadge(item.status)}</td>
                    <td style={{ ...styles.td, color: "#6b7280", fontSize: "0.85rem" }}>
                      {item.request_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards for requests */}
          <div style={styles.mobileCards}>
            {myRequests.length === 0 && (
              <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                No requests submitted yet
              </p>
            )}
            {myRequests.map((item) => (
              <div key={item.id} style={styles.mobileCard}>
                <div style={styles.mobileCardRow}>
                  <span style={styles.bloodGroupBadge}>{item.blood_group}</span>
                  {statusBadge(item.status)}
                </div>
                <p style={styles.mobileCardHospital}>{item.hospital_name}</p>
                <div style={styles.mobileCardRow}>
                  <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                    {item.units} units
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "0.82rem" }}>
                    {item.request_date}
                  </span>
                </div>
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
          .desktop-table { display: none !important; }
          .mobile-cards-wrap { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-table { display: block !important; }
          .mobile-cards-wrap { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
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
  navIcon: { fontSize: "1.5rem" },
  navTitle: {
    color: "#fff",
    fontSize: "1.4rem",
    fontWeight: "700",
    letterSpacing: "0.04em",
  },
  navRight: { display: "flex", alignItems: "center", gap: "1rem" },
  navUser: {
    color: "#fecdd3",
    fontSize: "0.9rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  avatarCircle: {
    background: "#fff",
    color: "#dc2626",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
  },
  logoutBtn: {
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.6)",
    color: "#fff",
    padding: "6px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "background 0.2s",
    fontFamily: "inherit",
  },
  heroBanner: {
    background: "linear-gradient(120deg, #dc2626 0%, #9f1239 100%)",
    padding: "2.5rem 2rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroContent: {},
  heroTitle: {
    color: "#fff",
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    fontWeight: "700",
    margin: "0 0 0.4rem",
  },
  heroName: { color: "#fca5a5" },
  heroSub: { color: "#fecdd3", margin: 0, fontSize: "0.9rem" },
  heroStats: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  statCard: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    borderRadius: "12px",
    padding: "1rem 1.5rem",
    textAlign: "center",
    minWidth: "100px",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  statNum: {
    display: "block",
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: "700",
    lineHeight: 1,
  },
  statLabel: {
    display: "block",
    color: "#fecdd3",
    fontSize: "0.75rem",
    marginTop: "0.3rem",
    fontWeight: "500",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
    overflow: "hidden",
    border: "1px solid #fee2e2",
  },
  cardHeader: {
    padding: "1.5rem 1.5rem 1rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
    borderBottom: "1px solid #fef2f2",
  },
  cardTitle: {
    margin: "0 0 0.2rem",
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#111827",
  },
  cardSub: { margin: 0, color: "#9ca3af", fontSize: "0.82rem" },
  tagRed: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  tableWrapper: {
    overflowX: "auto",
    className: "desktop-table",
    display: "block",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.88rem",
  },
  th: {
    background: "#1f2937",
    color: "#f9fafb",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  tr: {
    transition: "background 0.15s ease",
    cursor: "default",
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
  hospitalName: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "0.88rem",
  },
  bloodGroupBadge: {
    background: "#dc2626",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "700",
    display: "inline-block",
  },
  unitCount: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "600",
    display: "inline-block",
  },
  input: {
    border: "1.5px solid #fca5a5",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "0.85rem",
    width: "90px",
    outline: "none",
    fontFamily: "inherit",
    color: "#111827",
    transition: "border 0.2s",
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
  badge: {
    approved: {
      background: "#dcfce7",
      color: "#16a34a",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.78rem",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
    },
    rejected: {
      background: "#fee2e2",
      color: "#dc2626",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.78rem",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
    },
    pending: {
      background: "#fef3c7",
      color: "#d97706",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.78rem",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
    },
  },
  badgeDot: (color) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  }),
  // Mobile card styles
  mobileCards: {
    display: "none",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    className: "mobile-cards-wrap",
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
  mobileCardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  },
  mobileCardHospital: {
    margin: 0,
    fontWeight: "600",
    color: "#111827",
    fontSize: "0.95rem",
  },
  mobileCardDate: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "0.8rem",
  },
};

export default ReceiverDashboard;