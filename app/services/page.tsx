'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useRef } from 'react';

const VIDEO_URLS = {
  development:
    'https://res.cloudinary.com/dmmepvgfy/video/upload/v1778357362/Professional_software_development_workflow_video_sequence__opens_with_client_requirement_PDF_document_on_screen_transitions_to_intense_developer_coding_shots_with_hands_typing_on_keyboard_and_multiple_code_editor_rchizb.mp4',
  mobile:
    'https://res.cloudinary.com/dmmepvgfy/video/upload/v1778358030/Mobile_smartphone_in_portrait_orientation_floating_in_cloud-like_environment__starts_with_poorly_designed_mobile_app_on_portrait_smartphone_screen_with_broken_layout_misaligned_data_overflowing_elements_messy_U_nlds3b.mp4',
  design:
    'https://res.cloudinary.com/dmmepvgfy/video/upload/v1778358301/Cinematic_looping_animation_of_graphic_design_transformation_process._Black_and_white_color_scheme_with_vibrant_orange_rgb_244_137_5_accents._Opens_with_messy_unorganized_graphic_design_elements_scattered_chaot_h2isqm.mp4',
};

function ServiceVideo({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays even after visibility changes (tab switch, etc.)
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Force play on mount
    video.play().catch(() => {});

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    /* Responsive 16/9 container — video fills it completely, zero letterboxing */
    <div className="relative w-full rounded-2xl overflow-hidden border border-accent/30 shadow-lg shadow-accent/10"
         style={{ aspectRatio: '16 / 9' }}>
      <video
        ref={videoRef}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Subtle gradient overlay so edges blend with card */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(var(--accent-rgb,244,137,5),0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default function ServicesPage() {
  const servicesData = [
    {
      id: 'development',
      title: 'Custom Development',
      subtitle: 'Tailored Web Solutions',
      description:
        'We build fast, scalable, and secure web applications using modern technologies and best practices.',
      features: [
        'Full-stack web development',
        'Progressive web apps (PWA)',
        'API development & integration',
        'Database design & optimization',
        'Performance optimization',
        'Security implementation',
      ],
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
      videoUrl: VIDEO_URLS.development,
    },
    {
      id: 'mobile',
      title: 'Mobile Solutions',
      subtitle: 'iOS & Android Apps',
      description:
        'High-performance mobile applications that engage users and deliver exceptional user experiences.',
      features: [
        'Native iOS development',
        'Native Android development',
        'Cross-platform development',
        'App store optimization',
        'Push notifications',
        'Offline functionality',
      ],
      technologies: ['React Native', 'Flutter', 'Firebase'],
      videoUrl: VIDEO_URLS.mobile,
    },
    {
      id: 'design',
      title: 'Graphic Design',
      subtitle: 'Visual Identity & Branding',
      description:
        'Creative visual designs that tell your brand story and captivate your audience with compelling aesthetics.',
      features: [
        'Logo design & branding',
        'UI/UX design',
        'Marketing collateral',
        'Brand identity design',
        'Packaging design',
        'Social media graphics',
      ],
      technologies: ['Figma', 'Canva', 'Photoshop', 'Illustrator', 'Vector Tracing'],
      videoUrl: VIDEO_URLS.design,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-card overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-float-slow" />
          <div
            className="absolute bottom-10 right-20 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to help your business thrive in the modern landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/15 rounded-full filter blur-3xl animate-pulse-glow" />
          <div
            className="absolute top-1/3 -left-32 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-24 relative">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-slide-up ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <p className="text-accent font-semibold mb-2">{service.subtitle.toUpperCase()}</p>
                <h2 className="text-4xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-lg text-foreground/70 mb-8">{service.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-accent mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>

              {/* Video Element */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ServiceVideo url={service.videoUrl} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Which service interests you?</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Contact us today to discuss your project requirements and get a custom proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}