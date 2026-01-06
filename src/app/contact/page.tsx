"use client";

import React, { useState } from 'react';

const ContactPage = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <main className="pt-32 pb-20">
            <section className="contact-section">
                <div className="contact-container">
                    <h2>Start Your Journey</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input name="name" type="text" placeholder="Your Name" required disabled={status === 'submitting'} />
                        </div>
                        <div className="form-group">
                            <input name="email" type="email" placeholder="Your Email" required disabled={status === 'submitting'} />
                        </div>
                        <div className="form-group">
                            <textarea name="message" placeholder="Tell us about your project" required disabled={status === 'submitting'}></textarea>
                        </div>
                        <button
                            type="submit"
                            className="cta-button"
                            style={{
                                border: 'none',
                                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                background: status === 'success' ? '#4CAF50' : (status === 'error' ? '#f44336' : '')
                            }}
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Sending...' : (status === 'success' ? 'Message Sent!' : (status === 'error' ? 'Error! Try Again' : 'Send Message'))}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;