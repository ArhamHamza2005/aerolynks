'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowRight, Zap, TrendingUp, Shield, BookOpen, Building2, Rocket } from 'lucide-react';

const industriesData = [
  { id: 'startup', step: '01', name: 'Startup', icon: Rocket, description: 'Help early-stage companies build their digital presence and scale rapidly.', services: ['MVP Development', 'Scalable Architecture', 'Growth Hacking'], side: 'right' },
  { id: 'ecommerce', step: '02', name: 'E-commerce', icon: TrendingUp, description: 'Build high-converting online stores and marketplaces.', services: ['Store Development', 'Payment Integration', 'Marketing Automation'], side: 'left' },
  { id: 'healthcare', step: '03', name: 'Healthcare', icon: Shield, description: 'Secure, HIPAA-compliant solutions for healthcare providers.', services: ['Patient Portals', 'Telemedicine', 'Health Records'], side: 'right' },
  { id: 'fintech', step: '04', name: 'FinTech', icon: Zap, description: 'Innovative financial solutions with security & compliance.', services: ['Payment Systems', 'Trading Platforms', 'Risk Management'], side: 'left' },
  { id: 'education', step: '05', name: 'Education', icon: BookOpen, description: 'Learning platforms with smart analytics.', services: ['LMS Development', 'Virtual Classrooms', 'Student Analytics'], side: 'right' },
  { id: 'construction', step: '06', name: 'Construction', icon: Building2, description: 'Project management tools for construction firms.', services: ['Project Management', 'Resource Scheduling', 'Budget Tracking'], side: 'left' },
];

function TimelineCard({ industry, index }: { industry: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = industry.side === 'left';
  const Icon = industry.icon;

  return (
    <div
      ref={cardRef}
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Vertical Line Dot */}
      <div className="timeline-dot" />

      {/* Card */}
      <div className={`timeline-card ${isLeft ? 'card-left' : 'card-right'}`}>
        <div className="icon-wrapper">
          <Icon size={22} />
        </div>

        <span className="step-label">
          {industry.step} — {industry.name}
        </span>

        <h3 className="card-title">{industry.name}</h3>
        <p className="card-desc">{industry.description}</p>

        <div className="tags">
          {industry.services.map((service: string) => (
            <span key={service} className="tag">{service}</span>
          ))}
        </div>

        <Link href="/contact" className="cta-link">
          Explore <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(244,137,5,0.08)_0%,transparent_60%)]" />
        
        <p className="text-orange-500 text-sm font-bold tracking-[3px] uppercase mb-3">What We Do</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Industry <span className="text-[#f48905]">Solutions</span>
        </h1>
        <p className="mt-6 text-gray-400 max-w-md mx-auto text-lg">
          Specialized expertise across multiple industries.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="pb-24 px-4 relative">
        <div className="max-w-3xl mx-auto relative">
          {/* Center Animated Line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-[3px] bg-gradient-to-b from-transparent via-[#f48905] to-transparent -translate-x-1/2" />

          {/* Glowing light animation */}
          <div className="absolute left-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-white to-transparent -translate-x-1/2 animate-runLight" />

          {/* Timeline Items */}
          <div className="space-y-20">
            {industriesData.map((industry, index) => (
              <TimelineCard key={industry.id} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0d0d0d] text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your industry?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Partner with us to build powerful solutions.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-[#f48905] text-black font-semibold px-8 py-4 rounded-xl hover:bg-orange-400 transition-all duration-200"
        >
          Start Your Project <ArrowRight size={20} />
        </Link>
      </section>

      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        .timeline-item {
          display: flex;
          align-items: center;
          position: relative;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-item.left { justify-content: flex-start; }
        .timeline-item.right { justify-content: flex-end; }

        .timeline-dot {
          position: absolute;
          left: 50%;
          width: 18px;
          height: 18px;
          background: #f48905;
          border: 4px solid #0a0a0a;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
          transition: all 0.3s;
        }

        .timeline-item:hover .timeline-dot {
          box-shadow: 0 0 0 10px rgba(244, 137, 5, 0.2);
        }

        .timeline-card {
          width: 48%;
          background: #111;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 28px 26px;
          position: relative;
          transition: all 0.4s ease;
        }

        .timeline-card:hover {
          border-color: #f48905;
          background: #161616;
          transform: translateY(-4px);
        }

        /* Arrow Pointers */
        .card-right::before {
          content: '';
          position: absolute;
          left: -11px;
          top: 32px;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 11px solid #222;
        }

        .card-left::after {
          content: '';
          position: absolute;
          right: -11px;
          top: 32px;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 11px solid #222;
        }

        .timeline-item:hover .card-right::before,
        .timeline-item:hover .card-left::after {
          border-right-color: #f48905;
          border-left-color: #f48905;
        }

        .icon-wrapper {
          width: 42px;
          height: 42px;
          background: rgba(244, 137, 5, 0.1);
          color: #f48905;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .step-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #f48905;
          text-transform: uppercase;
        }

        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: white;
          margin: 10px 0;
        }

        .card-desc {
          color: #aaa;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .tag {
          font-size: 12px;
          padding: 4px 10px;
          background: rgba(244, 137, 5, 0.1);
          color: #f48905;
          border: 1px solid rgba(244, 137, 5, 0.3);
          border-radius: 6px;
        }

        .cta-link {
          margin-top: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #f48905;
          font-weight: 600;
          font-size: 14px;
        }

        /* Animation */
        @keyframes runLight {
          0% { transform: translate(-50%, -100%); }
          100% { transform: translate(-50%, 800%); }
        }

        .animate-runLight {
          animation: runLight 3s linear infinite;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline-item {
            flex-direction: column !important;
            align-items: center;
            text-align: center;
          }

          .timeline-card {
            width: 100% !important;
            max-width: 420px;
          }

          .card-left::after,
          .card-right::before {
            display: none;
          }

          .timeline-dot {
            left: 50%;
          }
        }
      `}</style>
    </main>
  );
}