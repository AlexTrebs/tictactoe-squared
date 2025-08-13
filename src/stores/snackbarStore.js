'use client';

import { create } from 'zustand';

const defaultDedupeKey = (message, severity) => `${severity}:${message}`;

export const useSnackbarStore = create((set) => ({
  snackbars: [],

  enqueueSnackbar: (message, severity = 'info', opts = {}) => {
    const now = Date.now();
    const { windowMs = 300 } = opts;
    const dedupeKey = defaultDedupeKey(message, severity);

    set(state => {
      const idx = state.snackbars.findIndex(
        snackbar => snackbar.dedupeKey === dedupeKey && (now - (snackbar.time ?? now)) <= windowMs
      );
      if (idx !== -1) return state; // duplicate within window, skip

      return {
        snackbars: [
          ...state.snackbars,
          {
            id: dedupeKey + now,
            dedupeKey: dedupeKey,
            message,
            severity,
            time: now
          }
        ]
      };
    });
  },

  closeSnackbar: (id) =>
    set(state => ({
      snackbars: state.snackbars.filter(sb => sb.id !== id)
    }))
  }
));

export const enqueueSnackbar = (message, severity = 'info', opts) => useSnackbarStore.getState().enqueue(message, severity, opts);