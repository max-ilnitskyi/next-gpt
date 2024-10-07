import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkHelper } from './LinkHelper';
import { BaseLinkHelperProps } from '../BaseLinkHelper';

jest.mock('../BaseLinkHelper', () => {
  return {
    BaseLinkHelper: function MockBaseLinkHelper({
      children,
      href,
      className,
      onClick,
    }: BaseLinkHelperProps) {
      return (
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      );
    },
  };
});

describe('LinkHelper', () => {
  it('should render a link with the correct href', () => {
    const href = '/test-url';
    render(<LinkHelper href={href} text="Test Link" />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('should render text inside the link if provided', () => {
    const href = '/test-url';
    const linkText = 'Test Link Content';

    render(<LinkHelper href={href} text={linkText} />);

    const linkElement = screen.getByText(linkText);
    expect(linkElement).toBeInTheDocument();
  });

  it('should not render text if not provided', () => {
    const href = '/test-url';
    render(<LinkHelper href={href} />);

    const spanElement = screen.queryByRole('span');
    expect(spanElement).toBeNull();
  });

  it('should apply the provided className to the link', () => {
    const href = '/test-url';
    const className = 'custom-class';

    render(<LinkHelper href={href} text="Test Link" className={className} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass(className);
  });

  it('should call the onClick handler when the link is clicked', () => {
    const href = '/test-url';
    const handleClick = jest.fn();

    render(<LinkHelper href={href} text="Test Link" onClick={handleClick} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
