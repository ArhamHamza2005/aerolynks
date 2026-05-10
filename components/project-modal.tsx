'use client';

import { X, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    category: string;
    industry: string;
    problem: string;
    solution: string;
    result: string;
    beforeImage: string;
    afterImage: string;
    projectType: 'website' | 'app';
    metrics?: {
      label: string;
      value: string;
    }[];
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // small delay so animation plays on open
      requestAnimationFrame(() => setMounted(true));
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    } else {
      setMounted(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sections = [
    { label: 'Problem', icon: '⚠', text: project.problem, color: '#ff6b9d' },
    { label: 'Solution', icon: '⚡', text: project.solution, color: '#7c6fff' },
    { label: 'Result', icon: '✦', text: project.result, color: '#34d399' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .pm-backdrop {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          transition: opacity 0.35s;
        }
        .pm-sheet {
          position: relative;
          background: #0d0d18;
          border: 1px solid rgba(124,111,255,0.18);
          border-radius: 24px;
          width: 100%;
          max-width: 860px;
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,111,255,0.1);
          transition: transform 0.45s cubic-bezier(.22,1,.36,1), opacity 0.35s;
          scrollbar-width: thin;
          scrollbar-color: rgba(124,111,255,0.3) transparent;
        }
        .pm-sheet::-webkit-scrollbar { width: 5px; }
        .pm-sheet::-webkit-scrollbar-track { background: transparent; }
        .pm-sheet::-webkit-scrollbar-thumb { background: rgba(124,111,255,0.3); border-radius: 10px; }

        /* top purple glow bar */
        .pm-sheet::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,111,255,0.6), rgba(255,107,157,0.4), transparent);
          border-radius: 50%;
        }

        .pm-close {
          position: sticky;
          top: 0; left: 100%;
          float: right;
          margin: 16px 16px 0 0;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          z-index: 10;
          color: rgba(240,239,248,0.7);
        }
        .pm-close:hover {
          background: rgba(255,107,157,0.15);
          border-color: rgba(255,107,157,0.35);
          color: #ff6b9d;
        }

        .pm-body { padding: 24px 32px 36px; }
        @media(max-width: 600px) { .pm-body { padding: 16px 18px 28px; } }

        /* ── header ── */
        .pm-header { margin-bottom: 28px; }
        .pm-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .pm-badge {
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.8px; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
        }
        .pm-badge-type { color: #7c6fff; background: rgba(124,111,255,0.12); border: 1px solid rgba(124,111,255,0.25); }
        .pm-badge-ind  { color: #ff6b9d; background: rgba(255,107,157,0.1);  border: 1px solid rgba(255,107,157,0.2); }
        .pm-title {
          font-family:  sans-serif;
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          color: #f0eff8;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 6px;
        }
        .pm-cat { font-size: 14px; color: rgba(240,239,248,0.45); }

        /* ── IMAGES ── */
        .pm-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }
        @media(max-width: 600px) { .pm-images { grid-template-columns: 1fr; } }

        .pm-img-block { display: flex; flex-direction: column; gap: 10px; }

        .pm-img-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(240,239,248,0.5);
        }
        .pm-img-label-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }

        /* KEY FIX: no fixed aspect-ratio, image drives the height */
        .pm-img-wrap {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          background: #0a0a14;
          position: relative;
          /* Let the image's natural height show fully */
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 140px;
        }
        .pm-img-wrap img {
          width: 100% !important;
          height: auto !important;
          position: static !important;
          object-fit: contain !important;
          display: block;
        }

        /* ── sections ── */
        .pm-sections {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        @media(max-width: 700px) { .pm-sections { grid-template-columns: 1fr; } }

        .pm-section {
          padding: 18px 18px 20px;
          border-radius: 14px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s;
          position: relative;
          overflow: hidden;
        }
        .pm-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 14px 14px 0 0;
        }
        .pm-section-icon {
          font-size: 20px;
          margin-bottom: 10px;
          display: block;
        }
        .pm-section-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .pm-section-text {
          font-size: 13px;
          color: rgba(240,239,248,0.65);
          line-height: 1.7;
        }

        /* ── metrics ── */
        .pm-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px,1fr));
          gap: 12px;
        }
        .pm-metric {
          text-align: center;
          padding: 18px 12px;
          border-radius: 14px;
          background: rgba(124,111,255,0.06);
          border: 1px solid rgba(124,111,255,0.15);
        }
        .pm-metric-val {
          font-family: 'Syne', sans-serif;
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #7c6fff, #ff6b9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 6px;
        }
        .pm-metric-label { font-size: 12px; color: rgba(240,239,248,0.45); }

        /* ── divider ── */
        .pm-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 24px 0;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="pm-backdrop"
        style={{ opacity: mounted ? 1 : 0 }}
        onClick={onClose}
      >
        {/* Sheet */}
        <div
          className="pm-sheet"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button className="pm-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>

          <div className="pm-body">
            {/* Header */}
            <div className="pm-header">
              <div className="pm-badges">
                <span className="pm-badge pm-badge-type">{project.projectType}</span>
                <span className="pm-badge pm-badge-ind">{project.industry}</span>
              </div>
              <h5 className="pm-title">{project.title}</h5>
              <p className="pm-cat">{project.category}</p>
            </div>

            {/* Before & After Images — full image, no crop */}
            <div className="pm-images">
              <div className="pm-img-block">
                <div className="pm-img-label">
                  <span
                    className="pm-img-label-dot"
                    style={{ background: 'rgba(255,107,157,0.7)' }}
                  />
                  Before
                </div>
                <div className="pm-img-wrap">
                  {/* Use <img> directly so the natural dimensions are respected */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.beforeImage} alt="Before" loading="eager" />
                </div>
              </div>

              <div className="pm-img-block">
                <div className="pm-img-label">
                  <span
                    className="pm-img-label-dot"
                    style={{ background: 'rgba(52,211,153,0.7)' }}
                  />
                  After
                </div>
                <div className="pm-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.afterImage} alt="After" loading="eager" />
                </div>
              </div>
            </div>

            <div className="pm-divider" />

            {/* Problem / Solution / Result */}
            <div className="pm-sections">
              {sections.map((s) => (
                <div
                  key={s.label}
                  className="pm-section"
                  style={{
                    // top color bar per section
                    ['--sec-color' as string]: s.color,
                  }}
                >
                  <style>{`
                    .pm-section:nth-child(1)::before { background: linear-gradient(90deg, #ff6b9d, transparent); }
                    .pm-section:nth-child(2)::before { background: linear-gradient(90deg, #7c6fff, transparent); }
                    .pm-section:nth-child(3)::before { background: linear-gradient(90deg, #34d399, transparent); }
                  `}</style>
                  <span className="pm-section-icon">{s.icon}</span>
                  <div className="pm-section-label" style={{ color: s.color }}>
                    {s.label}
                  </div>
                  <p className="pm-section-text">{s.text}</p>
                </div>
              ))}
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <>
                <div className="pm-divider" />
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(240,239,248,0.4)',
                    marginBottom: 14,
                  }}
                >
                  Key Metrics
                </p>
                <div className="pm-metrics">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="pm-metric">
                      <div className="pm-metric-val">{m.value}</div>
                      <div className="pm-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}