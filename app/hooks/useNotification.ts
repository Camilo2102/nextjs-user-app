import Swal, { SweetAlertOptions } from 'sweetalert2';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

const defaultTitle = 'Notification';

export default function useNotification() {
  const showAlert = (
    type: AlertType,
    message: string,
    title: string = defaultTitle,
    options?: SweetAlertOptions
  ) => {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
      confirmButtonText: 'OK',
      ...options,
    });
  };

  const showSuccessAlert = (message: string, title: string = "Success", options?: SweetAlertOptions) => {
    showAlert('success', message, title, options);
  };

  const showErrorAlert = (message: string, title: string = "Error", options?: SweetAlertOptions) => {
    showAlert('error', message, title, options);
  };

  const showWarningAlert = (message: string, title: string = "Warning", options?: SweetAlertOptions) => {
    showAlert('warning', message, title, options);
  };

  const showInfoAlert = (message: string, title: string = "Info", options?: SweetAlertOptions) => {
    showAlert('info', message, title, options);
  };

  const showConfirmationAlert = (
    message: string,
    title: string = "Confirm",
    confirmationCallback?: () => void,
    options?: SweetAlertOptions
  ) => {
    Swal.fire({
      title: title || defaultTitle,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      ...options,
    }).then((result) => {
      if (result.isConfirmed && confirmationCallback) {
        confirmationCallback();
      }
    });
  };

  return {
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showInfoAlert,
    showConfirmationAlert,
  };
}