import React from 'react';

const ContactMap = () => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425882426698!3d40.74076684375838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1677876983977!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nest Mart Location"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactMap; 