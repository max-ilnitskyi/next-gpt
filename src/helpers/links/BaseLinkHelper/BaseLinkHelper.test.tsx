import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BaseLinkHelper } from './BaseLinkHelper';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  };
});

describe('BaseLinkHelper', () => {
  it('should render a link with the correct href', () => {
    const href = '/test-url';
    render(<BaseLinkHelper href={href}>Test Link</BaseLinkHelper>);

    const linkElement = screen.getByRole('link', { name: 'Test Link' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('should render children within the link', () => {
    const href = '/test-url';
    const childText = 'Test Link Content';

    render(<BaseLinkHelper href={href}>{childText}</BaseLinkHelper>);

    const linkElement = screen.getByText(childText);
    expect(linkElement).toBeInTheDocument();
  });

  it('should apply the provided className to the link', () => {
    const href = '/test-url';
    const className = 'custom-class';

    render(
      <BaseLinkHelper href={href} className={className}>
        Test Link
      </BaseLinkHelper>,
    );

    const linkElement = screen.getByRole('link', { name: 'Test Link' });
    expect(linkElement).toHaveClass(className);
  });

  it('should call the onClick handler when the link is clicked', () => {
    const href = '/test-url';
    const handleClick = jest.fn();

    render(
      <BaseLinkHelper href={href} onClick={handleClick}>
        Test Link
      </BaseLinkHelper>,
    );

    const linkElement = screen.getByRole('link', { name: 'Test Link' });
    fireEvent.click(linkElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
