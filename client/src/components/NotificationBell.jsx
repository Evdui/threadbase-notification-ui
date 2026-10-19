
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  const { state } = useNotifications();
  const { unreadCount } = state;

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "#fff",
        }}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        🔔
      </button>

      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            background: "#ef4444",
            color: "#fff",
            borderRadius: "999px",
            fontSize: "0.65rem",
            fontWeight: "700",
            minWidth: "16px",
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 3px",
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {open && (
        <NotificationDropdown onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
