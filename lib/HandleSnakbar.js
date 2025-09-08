import { useSnackbar } from 'notistack';

const useHandleSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbarOpen = (msg, vrnt,duration) => {

    let newDuration = duration || 1000;
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: newDuration,
    });
  };

  return handleSnackbarOpen;
};

export default useHandleSnackbar;