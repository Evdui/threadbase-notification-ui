
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications, unreadCount } = state;

  function handleMarkAllRead() {
    dispatch({ type: "MARK_ALL_READ" });
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: "360px",
        maxWidth: "90vw",
        background: "#fff",
        color: "#111827",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1rem" }}>
          Notifications
        </h3>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          style={{
            background: "none",
            border: "none",
            color: unreadCount === 0 ? "#9ca3af" : "#2563eb",
            cursor: unreadCount === 0 ? "default" : "pointer",
            fontSize: "0.8rem",
          }}
        >
          Mark all as read
        </button>
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxHeight: "360px",
          overflowY: "auto",
        }}
      >
        {notifications.length === 0 ? (
          <li
            style={{
              padding: "2rem 1rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.9rem",
            }}
          >
            You're all caught up!
          </li>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))
        )}
      </ul>
    </div>
  );
}
