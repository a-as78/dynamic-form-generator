import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormRenderer from './FormRenderer';
import { Form } from '../../models/formInterfaces';

const mockForm: Form = {
  id: 'test-form',
  name: 'Test Form',
  elements: [
    { id: 'text1', type: 'text', label: 'Text Field', isRequired: true },
    { id: 'check1', type: 'checkbox', label: 'Agree to Terms', isRequired: true },
  ],
};

describe('FormRenderer', () => {
  test('renders required fields and shows validation errors', async () => {
    render(<FormRenderer form={mockForm} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.click(submitButton);

    const textErrors = screen.getAllByText('Text Field is required');
    expect(textErrors.length).toBeGreaterThan(0);

    const checkboxErrors = screen.getAllByText('Agree to Terms is required');
    expect(checkboxErrors.length).toBeGreaterThan(0);
  });

  test('fills fields and submits without errors', async () => {
    render(<FormRenderer form={mockForm} />);
    const textInput = screen.getByLabelText('Text Field');
    const checkbox = screen.getByLabelText('Agree to Terms');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(textInput, 'Hello');
    await userEvent.click(checkbox);

    await userEvent.click(submitButton);

    expect(screen.queryByText(/is required/)).toBeNull();
  });
});
