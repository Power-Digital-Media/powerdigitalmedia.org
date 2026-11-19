/**
 * HIGH-AUTHORITY AUTH CONSTANTS
 * Only emails listed here will be granted access to the Nexus HUD (Command Center).
 */
export const ADMIN_EMAILS = [
    "damein@powerdigitalmedia.org",
    // Add additional administrative protocols here
];

export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email);
}

/**
 * Strictly restricts local sandbox/bypass tokens to local development (`NODE_ENV === "development"`)
 * served from `localhost` or `127.0.0.1` so bypass tokens NEVER authenticate in production.
 */
export function isLocalDevBypassAllowed(req: Request): boolean {
    if (process.env.NODE_ENV !== "development") return false;
    const host = (req.headers.get("host") || "").toLowerCase();
    return (
        host === "localhost" ||
        host.startsWith("localhost:") ||
        host === "127.0.0.1" ||
        host.startsWith("127.0.0.1:")
    );
}
