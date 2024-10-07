import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlertMessage } from './AlertMessage';

describe('AlertMessage Component', () => {
  it('should not render anything if message is null or undefined', () => {
    const { container } = render(<AlertMessage message={null} />);
    expect(container.firstChild).toBeNull();

    const { container: containerUndefined } = render(<AlertMessage />);
    expect(containerUndefined.firstChild).toBeNull();
  });

  it('should render the alert message when message is provided', () => {
    const testMessage = 'This is an alert!';
    render(<AlertMessage message={testMessage} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(testMessage);
  });

  it('should have the correct styles applied', () => {
    const testMessage = 'Style check alert!';
    render(<AlertMessage message={testMessage} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(
      'p-4',
      'my-4',
      'text-sm',
      'text-red-800',
      'rounded-lg',
      'bg-red-50',
      'dark:bg-gray-800',
      'dark:text-red-400',
    );
  });
});
