/**
 * Centralized booking configuration.
 * Update CALENDAR_URL once you have your real Google Calendar Appointment Schedule embed URL.
 */
export const BOOKING_CONFIG = {
    /** Google Calendar Appointment Schedule embed URL — fallback if needed */
    calendarUrl:
        "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1yVhR6Bz8eRpubRUJiakNV_gc0faubHouaEnsmdCLLky8N2W3SmlKlIT_hqh0aCJaueOmJIT4e?gv=true",
    /** Calendly configuration for dynamic format routing */
    calendly: {
        username: "damein-powerdigitalmedia", // Your actual Calendly username
        slugs: {
            meet: "30min", // Using the single event type for Google Meet
            phone: "30min", // Using the single event type for Phone Call
            lunch: "30min", // Using the single event type for Business Lunch
        }
    },
    /** Fallback contact phone */
    phone: "(601) 446-2393",
    /** Fallback contact email */
    email: "info@powerdigitalmedia.org",
    /** Default meeting duration label */
    duration: "30 min",
    /** Meeting title shown in UI copy */
    title: "Strategy Call",
} as const;
