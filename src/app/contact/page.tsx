import React from 'react';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {

    return (
        <main className="pt-32 pb-20">
            <section className="contact-section">
                <div className="contact-container">
                    <h2>Start Your Journey</h2>
                    <ContactForm />
                </div>
            </section>
        </main>
    );
};

export default ContactPage;