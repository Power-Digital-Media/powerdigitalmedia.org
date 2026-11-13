"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone } from "lucide-react";
import { useEffect } from "react";
import { BOOKING_CONFIG } from "@/lib/booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string;
}

export default function BookingModal({ isOpen, onClose, calLink }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[82vh] bg-[#0b0c10] border border-amber-500/30 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#12141c]/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-xs font-black uppercase tracking-wider text-white block truncate">
                    Book a 15-Minute Strategy Call
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Direct with Damein Donald • Jackson, MS Studio
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:6014462393"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-amber-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>(601) 446-2393</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close booking calendar"
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full h-full pt-16" style={{ background: "#0b0c10" }}>
              <iframe
                src={calLink || BOOKING_CONFIG.calendarUrl}
                className="w-full h-full border-none"
                style={{
                  filter: "invert(0.88) hue-rotate(180deg)",
                  colorScheme: "light",
                }}
                title="Schedule a 15-minute strategy call with Power Digital Media"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
