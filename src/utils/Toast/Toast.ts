import { toast } from 'react-toastify';

export class Toast {
  static showError(content: string) {
    toast(content, {
      type: 'error',
    });
  }
  static showSuccess(content: string) {
    toast(content, {
      type: 'success',
    });
  }
}
