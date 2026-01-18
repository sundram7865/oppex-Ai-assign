import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from './AuthForm';

describe('AuthForm Component Mocking', () => {
  it('Requirement 3: Triggers onSubmit with correct credentials for login', async () => {
    const mockOnSubmit = vi.fn();
    render(<AuthForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@ex.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        { email: 'test@ex.com', password: 'password123' },
        false // false indicates it is not signup mode
      );
    });
  });
});