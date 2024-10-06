import { Toast } from './Toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('Toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showError', () => {
    it('should call toast with error type', () => {
      const content = 'Error message';
      Toast.showError(content);
      expect(toast).toHaveBeenCalledWith(content, { type: 'error' });
    });
  });

  describe('showSuccess', () => {
    it('should call toast with success type', () => {
      const content = 'Success message';
      Toast.showSuccess(content);
      expect(toast).toHaveBeenCalledWith(content, { type: 'success' });
    });
  });
});
