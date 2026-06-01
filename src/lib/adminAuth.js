/** Sunucu tarafinda admin_allowlist veya app_metadata.role ile eslesmeli. */
export const isAdminUser = (user) => {
  if (!user) return false;

  if (user.app_metadata?.role === "admin") {
    return true;
  }

  const allowlist = (import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowlist.length) {
    return false;
  }

  return allowlist.includes((user.email || "").toLowerCase());
};
