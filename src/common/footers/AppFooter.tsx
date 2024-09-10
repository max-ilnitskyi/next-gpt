import React from 'react';

export function AppFooter() {
  return (
    <footer className="shrink-0 p-4 pt-6 text-center">
      <span className="text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
    </footer>
  );
}
