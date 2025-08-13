import React from "react";
import { useSnackbarStore } from '../stores/snackbarStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Snackbar, Alert, Stack } from '@mui/material';

export default function SnackbarList() {
  const snackbars = useSnackbarStore(s => s.snackbars);
  const closeSnackbar = useSnackbarStore(s => s.closeSnackbar);

  return (
    <Stack 
      spacing={1} 
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        alignItems: 'flex-end',
      }}
    >
      <AnimatePresence initial={false}>
        {snackbars.map(({ id, message, severity }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            style={{ overflow: 'hidden' }}
          >
            <Snackbar
              open
              autoHideDuration={3000}
              onClose={(e, reason) => {
                if (reason === 'clickaway') return;
                closeSnackbar(id);
              }}
              sx={{
                position: 'static',
                transform: 'none',
                width: 'auto',
                alignSelf: 'flex-end'
              }}
            >
              <Alert
                onClose={() => closeSnackbar(id)}
                severity={severity}
                variant="filled"
                sx={{
                  width: 'auto',
                  maxWidth: '100%',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {message}
              </Alert>
            </Snackbar>
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
}
