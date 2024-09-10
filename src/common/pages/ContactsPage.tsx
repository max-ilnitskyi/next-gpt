'use client';
import React from 'react';

import { pages, strings, words } from '@/texts';
import { contactsData } from '@/main/contacts/contactsConstants';

export function ContactsPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">{pages.contacts.shortName}</h1>
      <p className="text-gray-400 mb-4">
        {strings.ifYouHaveAnyQuestionsOrWantToLearnMore}
      </p>

      <div className="">
        <p className="text-lg mb-2">
          <strong>{words.email}:</strong>{' '}
          <a
            href={`mailto:${contactsData.email}`}
            className="text-gray-300 hover:underline"
          >
            {contactsData.email}
          </a>
        </p>

        <p className="text-lg mb-2">
          <strong>{words.phone}:</strong>{' '}
          <a
            href={`tel:${contactsData.phone}`}
            className="text-gray-300 hover:underline"
          >
            {contactsData.phone}
          </a>
        </p>
      </div>
    </>
  );
}
