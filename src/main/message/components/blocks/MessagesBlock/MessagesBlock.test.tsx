// MessagesBlock.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessagesBlock } from './MessagesBlock';

// TODO rewrite the test

jest.mock('../../buttons/DeleteAllMessagesConfirmButton', () => ({
  DeleteAllMessagesConfirmButton: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <button>{children}</button>,
}));
jest.mock('@/main/message/components/lists/MessagesList', () => ({
  MessagesList: () => <div>Messages List</div>,
}));
jest.mock('@/main/message/components/lists/MessagesList.loading', () => ({
  MessagesListLoading: ({
    loaded,
    children,
  }: {
    loaded: boolean;
    children: React.ReactNode;
  }) => <div>{loaded ? children : 'Loading...'}</div>,
}));
jest.mock('@/helpers/AlertMessage', () => ({
  AlertMessage: ({ message }: { message: string }) => <div>{message}</div>,
}));
jest.mock('@/helpers/links/LinkHelper', () => ({
  LinkHelper: ({ text, href }: { text: string; href: string }) => (
    <a href={href}>{text}</a>
  ),
}));

describe('MessagesBlock', () => {
  it('should render the title', () => {
    const title = 'Test Title';
    render(<MessagesBlock title={title} messages={[]} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render DeleteAllMessagesConfirmButton if withDeleteAllButton is true', () => {
    render(
      <MessagesBlock title="Title" messages={[]} withDeleteAllButton={true} />,
    );

    const deleteButton = screen.getByRole('button', { name: /clear all/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('should render loading component when messagesLoading is true', () => {
    render(
      <MessagesBlock title="Title" messages={[]} messagesLoading={true} />,
    );

    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render AlertMessage if messagesErrorMessage is provided', () => {
    const errorMessage = 'Test Error Message';
    render(
      <MessagesBlock
        title="Title"
        messages={[]}
        messagesErrorMessage={errorMessage}
      />,
    );

    const alertMessage = screen.getByText(errorMessage);
    expect(alertMessage).toBeInTheDocument();
  });

  it('should render MessagesList if messages are provided', () => {
    const messages = [
      {
        id: 1,
        content: 'Test message',
        valence: 0.5,
        arousal: 0.5,
        createdAt: '2024-10-01',
      },
    ];
    render(<MessagesBlock title="Title" messages={messages} />);

    const messagesList = screen.getByText(/messages list/i);
    expect(messagesList).toBeInTheDocument();
  });

  it('should render empty message notice and navigation link if messages are empty', () => {
    render(<MessagesBlock title="Title" messages={[]} />);

    const noMessagesText = screen.getByText(/there is no messages yet/i);
    expect(noMessagesText).toBeInTheDocument();

    const linkElement = screen.getByRole('link', {
      name: /go to the analyzer/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
