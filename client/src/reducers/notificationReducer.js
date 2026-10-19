
export const initialState = {
  notifications: [],
  unreadCount: 0,
};

export function notificationReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [action.payload, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1,
      };

    case "MARK_READ": {
      const target = state.notifications.find(
        (n) => n.id === action.payload
      );

      if (!target || target.isRead) {
        return state;
      }

      return {
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }

    case "MARK_ALL_READ":
      return {
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
        })),
        unreadCount: 0,
      };

    case "LOAD_NOTIFICATIONS":
      return {
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.isRead).length,
      };

    default:
      return state;
  }
}
