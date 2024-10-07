import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loading } from './Loading';

describe('Loading Component', () => {
  it('should render children if loaded is true', () => {
    const childText = 'Loaded Content';
    render(
      <Loading loaded={true}>
        <div>{childText}</div>
      </Loading>,
    );

    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
  });

  it('should render the loading spinner if loaded is false', () => {
    render(<Loading loaded={false} />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should render the loading spinner if loaded is not provided (default)', () => {
    render(<Loading />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should apply default container and icon classes if none are provided', () => {
    render(<Loading loaded={false} />);

    const container = screen.getByRole('status').parentElement;
    expect(container).toHaveClass(
      'h-full',
      'flex',
      'items-center',
      'justify-center',
      'text-gray-400',
    );

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-24', 'h-24', 'animate-spin');
  });

  it('should apply custom container and icon classes if provided', () => {
    const customClassName = 'custom-container-class';
    const customIconClassName = 'custom-icon-class';

    render(
      <Loading
        loaded={false}
        className={customClassName}
        iconClassName={customIconClassName}
      />,
    );

    const container = screen.getByRole('status').parentElement;
    expect(container).toHaveClass(customClassName);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(customIconClassName);
  });
});
