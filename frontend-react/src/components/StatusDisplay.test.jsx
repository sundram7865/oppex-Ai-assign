import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatusDisplay from './StatusDisplay';
import * as authApi from '../api/auth';

// Requirement 5: Mocking the API layer
vi.mock('../api/auth', () => ({
  validate: vi.fn(),
}));

describe('StatusDisplay Component Mocking', () => {
  const mockUser = { email: 'sundaram@example.com', isValidated: false };

  it('Requirement 3: Shows unvalidated status initially', () => {
    render(<StatusDisplay user={mockUser} onLogout={() => {}} />);
    expect(screen.getByText(/You need to validate your email/i)).toBeInTheDocument();
  });

  it('Requirement 2: Successfully updates UI after validation mock', async () => {
    // Mocking the success response from the Node Proxy
    authApi.validate.mockResolvedValueOnce({ data: { message: 'Validated' } });

    render(<StatusDisplay user={mockUser} onLogout={() => {}} />);
    
    const validateBtn = screen.getByText(/Validate Email/i);
    fireEvent.click(validateBtn);

    // Verify visual transition to success state
    await waitFor(() => {
      expect(screen.getByText(/Your email is validated/i)).toBeInTheDocument();
      expect(screen.getByText(/✅ Email validated successfully!/i)).toBeInTheDocument();
    });
  });
});