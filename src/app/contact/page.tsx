import React from 'react';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import ContactMap from './components/ContactMap';

export const metadata = {
  title: 'Contact Us | Nest Mart',
  description: 'Get in touch with Nest Mart for any questions, feedback, or support.',
};

const ContactPage = () => {
  return (
    <div className='my-20 space-y-16'>
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
};

export default ContactPage; 