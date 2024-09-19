'use client';
import React from 'react';

import { CopyToClipboardButtonHelper } from '@/helpers/buttons/CopyToClipboardButtonHelper';

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
        <p className="text-lg mb-2 flex items-center">
          <strong>{words.email}:</strong>
          &nbsp;
          <a
            href={`mailto:${contactsData.email}`}
            className="text-gray-300 hover:underline"
          >
            {contactsData.email}
          </a>
          &nbsp;
          <CopyToClipboardButtonHelper data={contactsData.email} />
        </p>

        <p className="text-lg mb-2 flex items-center">
          <strong>{words.phone}:</strong>
          &nbsp;
          <a
            href={`tel:${contactsData.phone}`}
            className="text-gray-300 hover:underline"
          >
            {contactsData.phone}
          </a>
          &nbsp;
          <CopyToClipboardButtonHelper data={contactsData.phone} />
        </p>
      </div>
    </>
  );
}
