/** Dates as YYYY-MM-DD, worked out from today so tests never go stale. */
function isoDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function yearsAgo(years, extraDays = 0) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  d.setDate(d.getDate() + extraDays);
  return isoDate(d);
}

function daysFromToday(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

module.exports = { isoDate, yearsAgo, daysFromToday };
