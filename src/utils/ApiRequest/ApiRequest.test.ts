import axios from 'axios';
import { ApiRequest } from './ApiRequest';
import { API_PATH } from '@/config';

jest.mock('axios');

describe('ApiRequest', () => {
  const apiUrl = `${window.location.origin}${API_PATH}`;

  describe('_url', () => {
    it('should return the correct URL', () => {
      const path = 'test-path';
      expect(ApiRequest._url(path)).toBe(`${apiUrl}/${path}`);
    });
  });

  describe('_urlWithParams', () => {
    it('should return the correct URL without params', () => {
      const path = 'test-path';
      expect(ApiRequest._urlWithParams(path)).toBe(`${apiUrl}/${path}`);
    });

    it('should return the correct URL with params', () => {
      const path = 'test-path';
      const options = {
        limit: 10,
        page: 1,
        sort: ['name'],
        filters: { status: 'active' },
      };
      const expectedUrl = `${apiUrl}/${path}?limit=10&page=1&sort=["name"]&filters={"status":"active"}`;
      expect(ApiRequest._urlWithParams(path, options)).toBe(expectedUrl);
    });
  });

  describe('get', () => {
    it('should call axios.get with the correct URL and headers', async () => {
      const path = 'test-path';
      const options = {
        limit: 10,
        page: 1,
        sort: ['name'],
        filters: { status: 'active' },
      };
      const expectedUrl = `${apiUrl}/${path}?limit=10&page=1&sort=["name"]&filters={"status":"active"}`;
      await ApiRequest.get(path, options);
      expect(axios.get).toHaveBeenCalledWith(
        expectedUrl,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });

  describe('post', () => {
    it('should call axios.post with the correct URL, data, and headers', async () => {
      const path = 'test-path';
      const data = { key: 'value' };
      await ApiRequest.post(path, data);
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrl}/${path}`,
        data,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });

  describe('patch', () => {
    it('should call axios.patch with the correct URL, data, and headers', async () => {
      const path = 'test-path';
      const data = { key: 'value' };
      await ApiRequest.patch(path, data);
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrl}/${path}`,
        data,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });

  describe('delete', () => {
    it('should call axios.delete with the correct URL, data, and headers', async () => {
      const path = 'test-path';
      const data = { key: 'value' };
      await ApiRequest.delete(path, data);
      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrl}/${path}`,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        }),
      );
    });
  });
});
