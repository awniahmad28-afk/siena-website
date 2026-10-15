/** Prefix for static files when the site is served from a sub-path (not needed on siena-solutions.com; set NEXT_PUBLIC_BASE_PATH for a sub-path preview). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE_PATH}${p}`;
