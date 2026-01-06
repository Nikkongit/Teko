import React from 'react';

const FeaturesPage = () => {
    return (
        <main className="pt-32 pb-20">
            <section className="features-section">
                <div className="section-header">
                    <h2>Advanced Features</h2>
                    <p>Discover the core capabilities that set Teko apart from the competition.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Edge Performance</h3>
                        <p>Our global edge network ensures your data is processed closest to your users, reducing latency to near zero.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Zero-Trust Security</h3>
                        <p>We implement a strict zero-trust model, ensuring every request is verified and secured at the highest level.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">☁️</div>
                        <h3>Elastic Scaling</h3>
                        <p>Our infrastructure scales automatically based on demand, so you never have to worry about downtime or performance drops.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>AI Orchestration</h3>
                        <p>Automate complex workflows with our built-in AI orchestration layer, designed for speed and accuracy.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Deep Analytics</h3>
                        <p>Gain unprecedented insights into your data with our real-time analytics engine and customizable dashboards.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔗</div>
                        <h3>Unified API</h3>
                        <p>Connect your entire tech stack with our robust and easy-to-use unified API, supporting all modern protocols.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FeaturesPage;
