import React from 'react';
import Image from 'next/image';

const InnovationsPage = () => {
    return (
        <main className="pt-32">
            <section className="stacking-section">
                <div className="section-header">
                    <h2>Our Innovations</h2>
                    <p>Deep dive into the specialized technologies we are developing to redefine the digital landscape.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="card-number">01</div>
                        <h3>Quantum Interaction</h3>
                        <p>Leveraging quantum computing concepts to predict and respond to user intent before a single touch.</p>
                    </div>
                    <div className="feature-card">
                        <div className="card-number">02</div>
                        <h3>Bio-Metric Security</h3>
                        <p>Seamlessly integrated hardware and software solutions that use advanced bio-metrics for ironclad privacy.</p>
                    </div>
                    <div className="feature-card">
                        <div className="card-number">03</div>
                        <h3>Sustainable Cloud</h3>
                        <p>Eco-friendly infrastructure that powers millions of users with zero carbon footprint.</p>
                    </div>
                </div>

                <div className="about-section mt-20">
                    <div className="about-image">
                        <Image
                            src="/assets/images/new_card1.jpg"
                            alt="Innovation UI"
                            width={600}
                            height={400}
                            className="rounded-2xl"
                        />
                    </div>
                    <div className="about-content">
                        <h3>Fluid Design Language</h3>
                        <p>Our design system isn't just a set of colors and fonts; it's a living, breathing language that adapts to the user's emotional state and environment.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InnovationsPage;
