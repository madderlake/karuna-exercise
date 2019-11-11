export const formatDateTime = dateStr => {
  const opts = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short"
  };
  return new Date(dateStr).toLocaleDateString([], opts);
};

export const truncateMsg = (str, num) => {
  return str
    .split(" ")
    .splice(0, num)
    .join(" ");
};

export default { formatDateTime, truncateMsg };
