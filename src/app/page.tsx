"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);

  // Card refs for scroll vanish effect
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Slider Autoplay
    startAutoPlay();

    // Scroll Logic for Cards and Header (Header handled in component, cards here for now)
    const handleScroll = () => {
      const stickyTop = window.innerHeight * 0.15;
      const startFade = window.innerHeight * 0.8;
      const endFade = stickyTop + 50;

      cardRefs.current.forEach((card, index) => {
        if (!card || index === cardRefs.current.length - 1) return;

        const nextCard = cardRefs.current[index + 1];
        if (!nextCard) return;

        const nextCardTop = nextCard.getBoundingClientRect().top;

        if (nextCardTop < startFade) {
          const progress = (startFade - nextCardTop) / (startFade - endFade);
          const p = Math.max(0, Math.min(1, progress));

          card.style.transform = `scale(${1 - (p * 0.1)})`;
          card.style.opacity = `${1 - p}`;
          card.style.filter = `blur(${p * 10}px)`;
        } else {
          card.style.transform = 'scale(1)';
          card.style.opacity = '1';
          card.style.filter = 'blur(0px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      stopAutoPlay();
    };
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    sliderInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (sliderInterval.current) clearInterval(sliderInterval.current);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    startAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoPlay();
  };

  return (
    <main>
      {/* Banner Section */}
      <section className="banner-container" id="home">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1 */}
          <div className="slide">
            <div className="overlay"></div>
            <Image
              src="/assets/images/new_banner1.jpg"
              alt="Futuristic City"
              fill
              className="slide-image"
              priority
            />
            <div className="slide-content">
              <h1>Future is Now.</h1>
              <p>Experience the next generation of digital innovation with our cutting-edge solutions designed for the modern world.</p>
              <Link href="/features" className="cta-button">Explore More</Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <div className="overlay"></div>
            <Image
              src="/assets/images/new_banner2.jpg"
              alt="Cyberpunk Metropolis"
              fill
              className="slide-image"
            />
            <div className="slide-content">
              <h1>Neon Horizons.</h1>
              <p>Where technology meets imagination. Navigate the illuminated paths of tomorrow's infrastructure.</p>
              <Link href="/contact" className="cta-button">Get Started</Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <div className="overlay"></div>
            <Image
              src="/assets/images/new_banner3.jpg"
              alt="Digital Nightscape"
              fill
              className="slide-image"
            />
            <div className="slide-content">
              <h1>Urban Pulse.</h1>
              <p>Feel the rhythm of the connected city. Systems that breathe and adapt to the flow of life.</p>
              <Link href="/about" className="cta-button">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="slider-controls">
          <button className="control-btn btn-prev" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="control-btn btn-next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="slider-indicators">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`indicator ${currentSlide === i ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            ></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>At Teko, we believe that technology should be an extension of human potential, not a replacement. Our team of visionaries, engineers, and designers work tirelessly to bridge the gap between imagination and reality.</p>
          <p>Founded on the principles of innovation and integrity, we are dedicated to creating digital ecosystems that empower individuals and organizations to achieve more.</p>
          <Link href="/about" className="cta-button">Read Our Story</Link>
        </div>
        <div className="about-image">
          <Image
            src="/assets/images/new_about.jpg"
            alt="About Teko Office"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Innovations / Stacking Section */}
      <section className="stacking-section" id="innovations">
        <div className="section-header">
          <h2>Our Innovation</h2>
          <p>Scroll down to explore the core pillars of our future vision.</p>
        </div>

        <div className="stack-container">
          {/* Card 1 */}
          <div className="card-item" ref={el => { cardRefs.current[0] = el; }}>
            <div className="card-content">
              <div className="card-number">01. Interaction</div>
              <h3>Fluid Interfaces</h3>
              <p>Experience touch compatibility like never before. Our systems adapt to your usage patterns, creating a seamless bond between human and machine.</p>
              <Link href="/innovations" className="cta-button">See Demo</Link>
            </div>
            <div className="card-image-wrapper">
              <Image src="/assets/images/new_card1.jpg" alt="Card UI" fill />
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-item" ref={el => { cardRefs.current[1] = el; }}>
            <div className="card-content">
              <div className="card-number">02. Intelligence</div>
              <h3>Smart Analytics</h3>
              <p>Data drives decision. With real-time processing and AI-driven insights, you carry the power of a supercomputer in your pocket.</p>
              <Link href="/innovations" className="cta-button">Learn More</Link>
            </div>
            <div className="card-image-wrapper">
              <Image src="/assets/images/new_card2.jpg" alt="Dashboard UI" fill />
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-item" ref={el => { cardRefs.current[2] = el; }}>
            <div className="card-content">
              <div className="card-number">03. Ecosystem</div>
              <h3>Connected World</h3>
              <p>No device is an island. Our unified ecosystem ensures that your workflow remains uninterrupted, no matter where you are.</p>
              <Link href="/innovations" className="cta-button">Join Us</Link>
            </div>
            <div className="card-image-wrapper">
              <Image src="/assets/images/new_card3.jpg" alt="Connected City" fill />
            </div>
          </div>
        </div>
        <div style={{ height: '50vh' }}></div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>We deliver excellence across every dimension of digital experience.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Lightning Fast</h3>
            <p>Optimized for speed and performance, ensuring your applications run smoothly under any load.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure by Design</h3>
            <p>Enterprise-grade security protocols built into the core of everything we develop.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Native</h3>
            <p>Scalable infrastructure that grows with your business, leveraging the power of modern cloud computing.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Trusted by Visionaries</h2>
          <p>See what our partners say about the future we build together.</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">"Teko revolutionized our entire workflow. The fluid interface is unlike anything we've ever used. It feels like magic."</p>
            <div className="testimonial-author">
              <h4>Sarah Jenkins</h4>
              <span>CTO, Nexus Industries</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-quote">"The security and speed are unmatched. We scaled to millions of users seamlessly thanks to Teko's cloud-native approach."</p>
            <div className="testimonial-author">
              <h4>David Chen</h4>
              <span>Founder, Orbit AI</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-quote">"Finally, a tech partner that understands design. The user experience is simply breathtaking."</p>
            <div className="testimonial-author">
              <h4>Elena Rodriguez</h4>
              <span>Product Lead, Aether Design</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
