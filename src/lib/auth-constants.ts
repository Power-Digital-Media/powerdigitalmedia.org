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
