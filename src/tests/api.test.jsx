import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/mockApi';

// Mock the global fetch
global.fetch = vi.fn();

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('login should resolve successfully on valid credentials', async () => {
    const mockUser = { name: 'Mani', role: 'patient', email: 'patient@example.com' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await api.login('patient@example.com', '123456');
    expect(user.name).toBe('Mani');
    expect(fetch).toHaveBeenCalledWith('/api/login', expect.objectContaining({
      method: 'POST'
    }));
  });

  it('getDoctors should return a list of doctors', async () => {
    const mockDoctors = [{ id: 1, name: 'Dr. Priya Sharma' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDoctors,
    });

    const doctors = await api.getDoctors();
    expect(doctors).toHaveLength(1);
    expect(doctors[0].name).toBe('Dr. Priya Sharma');
    expect(fetch).toHaveBeenCalledWith('/api/doctors');
  });

  it('should handle fetch errors gracefully', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    await expect(api.login('wrong', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});
