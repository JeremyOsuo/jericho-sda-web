"use client";

import React from "react";
import { AlertTriangle, X, MessageCircle, RefreshCw } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  supportPhone?: string;
  onRetry?: () => void;
}

export default function ErrorModal({
  isOpen,
  onClose,
  title = "Notice from Church Desk",
  message = "We could not complete your request at this moment. Please check your internet connection or try again shortly.",
  supportPhone = "254700000000",
  onRetry,
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Notice Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Header & Body */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-semibold uppercase tracking-wider border border-slate-200">
            System Notice
          </span>
          <h3 className="text-xl font-serif font-black text-slate-950">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
            {message}
          </p>
        </div>

        {/* Treasury Support Note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
          <p className="font-semibold text-slate-800">Need immediate help?</p>
          <p className="text-[11px] text-slate-500">
            If your transaction does not reflect, the church treasury desk can reconcile it directly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          {onRetry && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRetry();
              }}
              className="flex-1 bg-[#001f44] hover:bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Try Again</span>
            </button>
          )}

          <a
            href={`https://wa.me/${supportPhone}?text=${encodeURIComponent(
              `Hello Church Desk, I need help verifying a contribution reference on the website: ${title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Desk</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}