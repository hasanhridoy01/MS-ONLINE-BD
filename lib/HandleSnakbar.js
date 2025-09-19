"use client";

import { useSnackbar } from 'notistack';

const useHandleSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbarOpen = (msg, variant, duration) => {
    let newDuration = duration || 3000; 
    enqueueSnackbar(msg, {
      variant: variant,
      autoHideDuration: newDuration,
    });
  };

  return handleSnackbarOpen;
};

export default useHandleSnackbar;