import { checkAdminCredentials } from './public/app/resource/js/common/process-login-admin.js';
import { ref, get, child } from 'firebase/database';

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/database', () => {
  return {
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    child: jest.fn(),
  };
});

jest.mock('./public/app/resource/js/configfb.js', () => ({
  db: {},
}));

describe('checkAdminCredentials', () => {
  it('should throw error if input is incomplete', async () => {
    await expect(checkAdminCredentials('', '')).rejects.toThrow('Input tidak lengkap');
  });

  it('should throw error if no admin data is found', async () => {
    get.mockResolvedValueOnce({ exists: () => false });
    await expect(checkAdminCredentials('ujang', '123')).rejects.toThrow('Tidak ada data admin yang ditemukan.');
  });

  it('should return true for valid credentials', async () => {
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        admin1: { username: 'ujang', password: '123' },
      }),
    });
    await expect(checkAdminCredentials('ujang', '123')).resolves.toBe(true);
  });

  it('should return false for invalid credentials', async () => {
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        admin1: { username: 'ujang', password: '123' },
      }),
    });
    await expect(checkAdminCredentials('invalid', 'invalid')).resolves.toBe(false);
  });
});
