import '@testing-library/jest-dom'
import { act, renderHook, waitFor  } from '@testing-library/react'
import useFetchUsers from '.'

global.fetch = jest.fn();

describe('useFetchUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set loading to true initially', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useFetchUsers());
    
    await act(() => {expect(result.current.loading).toBe(true);})
  });

  it('should fetch users successfully', async () => {
    const users = [{ id: 1, name: 'John Doe' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => users,
    });

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => expect(result.current).toMatchObject({ users: users, loading: false, error: null }));
  });

  it('should handle fetch error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => expect(result.current).toMatchObject({ users: null, loading: false, error: "Error: User fetch failed" }));
  });

  it.skip('should handle network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchUsers());
    
    await waitFor(() => expect(result.current).toMatchObject({ users: null, loading: false, error: "Error: Network error" }));
  });
});