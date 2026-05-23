export const getNotifications = () => {
  return (
    JSON.parse(localStorage.getItem("notifications")) || []
  );
};

export const saveNotifications = (notifications) => {
  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
};

export const addNotification = (message) => {
  const notifications = getNotifications();

  const newNotification = {
    id: Date.now(),
    message,
    time: new Date().toLocaleString(),
  };

  notifications.unshift(newNotification);

  saveNotifications(notifications);
};

export const clearNotifications = () => {
  localStorage.removeItem("notifications");
};