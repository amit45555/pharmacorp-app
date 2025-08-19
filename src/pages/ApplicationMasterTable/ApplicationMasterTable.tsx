import React from "react";
import styles from "./ApplicationMasterTable.module.css";
import { Eye } from "lucide-react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../../components/Common/ConfirmDeleteModal";
import { useApplications } from "../../context/ApplicationsContext";
// Removed unused local applications array. Use context instead.

export default function ApplicationMasterTable() {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showFilterPopover, setShowFilterPopover] = React.useState(false);
  const [filterColumn, setFilterColumn] = React.useState("name");
  const [filterValue, setFilterValue] = React.useState("");
  const [tempFilterColumn, setTempFilterColumn] = React.useState(filterColumn);
  const [tempFilterValue, setTempFilterValue] = React.useState(filterValue);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const { applications, setApplications } = useApplications();
  const navigate = require("react-router-dom").useNavigate();

  React.useEffect(() => {
    if (!showFilterPopover) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setShowFilterPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilterPopover]);

  const filteredData = applications.filter(
    (
      app: import("../../context/ApplicationsContext").Application,
      idx: number
    ) => {
      if (!filterValue.trim()) return true;
      const value = filterValue.toLowerCase();
      switch (filterColumn) {
        case "name":
          return app.name?.toLowerCase().includes(value);
        case "version":
          return app.version?.toLowerCase().includes(value);
        case "equipmentId":
          return app.equipmentId?.toLowerCase().includes(value);
        case "computer":
          return app.computer?.toLowerCase().includes(value);
        case "plant":
          return app.plant?.toLowerCase().includes(value);
        case "status":
          return app.status?.toLowerCase().includes(value);
        default:
          return true;
      }
    }
  );

  const handleDelete = () => setShowDeleteModal(true);
  const confirmDelete = () => {
    if (selectedRow === null) return;
    const updated = [...applications];
    updated.splice(selectedRow, 1);
    setApplications(updated);
    setSelectedRow(null);
    setShowDeleteModal(false);
    // After delete, navigate to SuperAdmin with Application tab active
    navigate("/superadmin", { state: { activeTab: "application" } });
  };

  const handleExportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({ orientation: "landscape" });
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const fileName = `ApplicationMasterTable_${yyyy}-${mm}-${dd}.pdf`;
    const headers = [
      ["Application", "Version", "Equipment ID", "Computer", "Plant", "Status"],
    ];
    const rows = filteredData.map((app: any) => [
      app.name,
      app.version,
      app.equipmentId,
      app.computer,
      app.plant,
      app.status,
    ]);
    doc.setFontSize(18);
    doc.text("Application Master Table", 14, 18);
    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 28,
      styles: {
        fontSize: 11,
        cellPadding: 3,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [11, 99, 206],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255],
      },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
    });
    doc.save(fileName);
  };
  return (
    <div>
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Application Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}>
            <NotificationsIcon fontSize="small" />
          </span>
          <span className={styles["header-icon"]}>
            <SettingsIcon fontSize="small" />
          </span>
        </div>
      </header>

      <div className={styles.headerTopRow}>
        <div className={styles.actionHeaderRow}>
          <button
            className={styles.addUserBtn}
            onClick={() => navigate("/add-application")}
            aria-label="Add New"
          >
            + Add New
          </button>
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilterPopover((prev) => !prev)}
            type="button"
            aria-label="Filter applications"
          >
            🔍 Filter
          </button>
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            disabled={selectedRow === null}
            title="Edit Selected Application"
            onClick={() => {
              if (selectedRow !== null) {
                navigate(`/edit-application/${selectedRow}`, {
                  state: {
                    applicationData: filteredData[selectedRow],
                    applicationIdx: selectedRow,
                  },
                });
              }
            }}
          >
            <FaEdit size={14} /> Edit
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            disabled={selectedRow === null}
            title="Delete Selected Application"
            onClick={handleDelete}
          >
            <FaTrash size={14} /> Delete
          </button>
          <ConfirmDeleteModal
            open={showDeleteModal}
            name={
              selectedRow !== null && filteredData[selectedRow]
                ? filteredData[selectedRow].name
                : "application"
            }
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
          />
          <button
            className={styles.exportPdfBtn}
            onClick={handleExportPDF}
            aria-label="Export table to PDF"
            type="button"
            style={{ border: "1px solid #0b63ce" }}
          >
            <span role="img" aria-label="Export PDF" style={{ fontSize: 18 }}>
              🗎
            </span>
            PDF
          </button>
        </div>
      </div>
      {/* Filter Popover */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.controls}>
            {showFilterPopover && (
              <div className={styles.filterPopover} ref={popoverRef}>
                <div className={styles.filterPopoverHeader}>
                  Advanced Filter
                </div>
                <div className={styles.filterPopoverBody}>
                  <div className={styles.filterFieldRow}>
                    <label className={styles.filterLabel}>Column</label>
                    <select
                      className={styles.filterDropdown}
                      value={tempFilterColumn}
                      onChange={(e) => setTempFilterColumn(e.target.value)}
                    >
                      <option value="name">Name</option>
                      <option value="version">Version</option>
                      <option value="equipmentId">Equipment ID</option>
                      <option value="computer">Computer</option>
                      <option value="plant">Plant</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                  <div className={styles.filterFieldRow}>
                    <label className={styles.filterLabel}>Value</label>
                    <input
                      className={styles.filterInput}
                      type="text"
                      placeholder={`Enter ${
                        tempFilterColumn.charAt(0).toUpperCase() +
                        tempFilterColumn.slice(1)
                      }`}
                      value={tempFilterValue}
                      onChange={(e) => setTempFilterValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.filterPopoverFooter}>
                  <button
                    className={styles.applyBtn}
                    onClick={() => {
                      setFilterColumn(tempFilterColumn);
                      setFilterValue(tempFilterValue);
                      setShowFilterPopover(false);
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className={styles.clearBtn}
                    onClick={() => {
                      setTempFilterValue("");
                      setFilterValue("");
                      setShowFilterPopover(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Table */}
          <div
            style={{
              maxHeight: 500,
              overflowY: "auto",
              borderRadius: 8,
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e2e8f0",
              height: "100",
              marginTop: 25,
            }}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Application</th>
                  <th>Version</th>
                  <th>Equipment ID</th>
                  <th>Computer</th>
                  <th>Plant</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((app, idx) => (
                  <tr
                    key={idx}
                    style={{
                      background: selectedRow === idx ? "#f0f4ff" : undefined,
                    }}
                  >
                    <td>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        checked={selectedRow === idx}
                        onChange={() => setSelectedRow(idx)}
                        aria-label={`Select ${app.name}`}
                      />
                    </td>
                    <td>{app.name}</td>
                    <td>{app.version}</td>
                    <td>{app.equipmentId}</td>
                    <td>{app.computer}</td>
                    <td>{app.plant}</td>
                    <td>
                      <span className={styles.status}>{app.status}</span>
                    </td>
                    <td>
                      <Eye className={styles.icon} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
