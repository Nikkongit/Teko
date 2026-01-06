import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <main className="pt-32">
            <section className="about-section">
                <div className="about-content">
                    <h2>Our Vision</h2>
                    <p>At Teko, we envision a world where technology and humanity coexist in perfect harmony. We aren't just building software; we're crafting the future of human interaction.</p>
                    <p>Our journey began in 2020 with a simple idea: that digital tools should be as intuitive and natural as a conversation. Today, we are a global team of dreamers and doers, pushing the boundaries of what's possible every single day.</p>
                </div>
                <div className="about-image">
                    <Image
                        src="/assets/images/new_about.jpg"
                        alt="Teko Future Vision"
                        width={600}
                        height={400}
                        className="rounded-2xl"
                    />
                </div>
            </section>

            <section className="testimonials-section">
                <div className="section-header">
                    <h2>Our Values</h2>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Innovation</h3>
                        <p>We never settle for "good enough." We constantly iterate and explore new horizons.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Integrity</h3>
                        <p>We build with purpose and transparency, ensuring our technology serves humanity's best interests.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Inclusivity</h3>
                        <p>We design for everyone, everywhere. Our tools are built to empower every individual on the planet.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
