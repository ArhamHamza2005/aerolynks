"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Code2, Smartphone, Zap } from "lucide-react";

function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 480,
      H = 480;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2,
      cy = H / 2,
      R = 180;
    const tilt = 0.25;

    const techNodes = [
      { lat: 51.5, lon: -0.1, label: "AI" },
      { lat: 37.7, lon: -122.4, label: "ML" },
      { lat: 35.7, lon: 139.7, label: "API" },
      { lat: 1.3, lon: 103.8, label: "IoT" },
      { lat: -33.9, lon: 151.2, label: "Cloud" },
      { lat: 40.7, lon: -74, label: "Web3" },
      { lat: 48.8, lon: 2.3, label: "AR" },
      { lat: 55.7, lon: 37.6, label: "5G" },
      { lat: -23.5, lon: -46.6, label: "Dev" },
      { lat: 28.6, lon: 77.2, label: "SaaS" },
      { lat: 19.1, lon: 72.9, label: "UX" },
      { lat: -1.3, lon: 36.8, label: "Edge" },
    ];

    function latLonTo3D(lat: number, lon: number, r: number) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      return {
        x: -r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
      };
    }

    function rotateY(p: { x: number; y: number; z: number }, a: number) {
      return {
        x: p.x * Math.cos(a) + p.z * Math.sin(a),
        y: p.y,
        z: -p.x * Math.sin(a) + p.z * Math.cos(a),
      };
    }

    function rotateX(p: { x: number; y: number; z: number }, a: number) {
      return {
        x: p.x,
        y: p.y * Math.cos(a) - p.z * Math.sin(a),
        z: p.y * Math.sin(a) + p.z * Math.cos(a),
      };
    }

    const gridLats = [-60, -30, 0, 30, 60];
    const gridLons = Array.from({ length: 12 }, (_, i) => i * 30 - 180);
    let angle = 0;
    let rafId: number;

    function draw(a: number) {
      ctx.clearRect(0, 0, W, H);

      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.2);
      grd.addColorStop(0, "rgba(244,137,5,0.07)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Globe circle outline
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,137,5,0.75)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Latitude grid lines
      for (const lat of gridLats) {
        ctx.beginPath();
        let first = true;
        const cr = R * Math.cos((lat * Math.PI) / 180);
        const yr = R * Math.sin((lat * Math.PI) / 180);
        for (let lo = -180; lo <= 180; lo += 4) {
          let p = {
            x: cr * Math.cos(((lo + 180) * Math.PI) / 180 - Math.PI),
            y: yr,
            z: cr * Math.sin(((lo + 180) * Math.PI) / 180 - Math.PI),
          };
          p = rotateX(rotateY(p, a), tilt);
          const pp = { x: cx + p.x, y: cy - p.y };
          if (first) {
            ctx.moveTo(pp.x, pp.y);
            first = false;
          } else if (p.z > 0) ctx.lineTo(pp.x, pp.y);
          else ctx.moveTo(pp.x, pp.y);
        }
        ctx.strokeStyle = "rgba(244,137,5,0.90)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitude grid lines
      for (const lon of gridLons) {
        ctx.beginPath();
        let first = true;
        for (let la = -90; la <= 90; la += 4) {
          const phi = ((90 - la) * Math.PI) / 180;
          const theta = ((lon + 180) * Math.PI) / 180;
          let p = {
            x: -R * Math.sin(phi) * Math.cos(theta),
            y: R * Math.cos(phi),
            z: R * Math.sin(phi) * Math.sin(theta),
          };
          p = rotateX(rotateY(p, a), tilt);
          const pp = { x: cx + p.x, y: cy - p.y };
          if (first) {
            ctx.moveTo(pp.x, pp.y);
            first = false;
          } else if (p.z > 0) ctx.lineTo(pp.x, pp.y);
          else ctx.moveTo(pp.x, pp.y);
        }
        ctx.strokeStyle = "rgba(244,137,5,0.55)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Project nodes
      const nodes = techNodes.map((n) => {
        let p = latLonTo3D(n.lat, n.lon, R);
        p = rotateX(rotateY(p, a), tilt);
        const depth = (p.z + R) / (2 * R);
        return {
          ...n,
          px: cx + p.x,
          py: cy - p.y,
          visible: p.z > -20,
          depth,
          z: p.z,
        };
      });

      // Connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ni = nodes[i],
            nj = nodes[j];
          if (!ni.visible || !nj.visible) continue;
          const d = Math.sqrt((ni.px - nj.px) ** 2 + (ni.py - nj.py) ** 2);
          if (d < 160) {
            const al = Math.min(ni.depth, nj.depth) * 0.5 * (1 - d / 160);
            ctx.beginPath();
            ctx.moveTo(ni.px, ni.py);
            ctx.lineTo(nj.px, nj.py);
            ctx.strokeStyle = `rgba(244,137,5,${al.toFixed(2)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (sorted by depth)
      nodes.sort((a, b) => a.z - b.z);
      for (const n of nodes) {
        if (!n.visible) continue;
        const al = 0.4 + n.depth * 0.6;
        const nr = 3 + n.depth * 3;

        // Pulse ring for front-facing nodes
        if (n.z > 80) {
          ctx.beginPath();
          ctx.arc(
            n.px,
            n.py,
            nr + 5 + Math.sin(Date.now() / 400 + n.lat) * 2,
            0,
            Math.PI * 2,
          );
          ctx.strokeStyle = `rgba(244,137,5,${(al * 0.3).toFixed(2)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.px, n.py, nr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,137,5,${al.toFixed(2)})`;
        ctx.fill();

        if (n.z > 40) {
          ctx.font = `bold ${10 + n.depth * 3}px monospace`;
          ctx.fillStyle = `rgba(244,137,5,${Math.min(1, al + 0.2).toFixed(2)})`;
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.px, n.py - nr - 5);
        }
      }

      // Inner ambient glow
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      inner.addColorStop(0, "rgba(244,137,5,0.04)");
      inner.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = inner;
      ctx.fill();
    }

    function loop() {
      angle += 0.004;
      draw(angle);
      rafId = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "480px",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}

export default function Home() {
  const services = [
    {
      icon: Code2,
      title: "Website Development",
      description:
        "Fast, scalable web applications and stunning websites built with modern technologies.",
      link: "/services#development",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description:
        "High-performance iOS & Android apps that engage users and drive real results.",
      link: "/services#mobile",
    },
    {
      icon: Zap,
      title: "Graphic Design",
      description:
        "Creative visual designs that tell your brand story and captivate your audience.",
      link: "/services#design",
    },
    {
      icon: Code2,
      title: "Strategic Consulting",
      description:
        "Expert guidance to transform your ideas into successful digital solutions.",
      link: "/services#consulting",
    },
  ];

  const stats = [
    { value: "8+", label: "Happy Clients" },
    { value: "3+", label: "Projects Completed" },
    { value: "1+", label: "Years Experience" },
    { value: "25+", label: "Countries Served" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/15 rounded-full filter blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 left-20 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full filter blur-3xl animate-pulse-glow opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(79, 104, 105, 0.5) 0%, transparent 70%)",
            }}
          ></div>
          <div
            className="absolute -top-20 -right-40 w-64 h-64 bg-accent/5 rounded-full filter blur-2xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent animate-pulse-glow opacity-30"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              <span className="inline-block animate-word-reveal text-white">
                Connecting
              </span>
              <span
                className="inline-block ml-2 animate-word-reveal text-white"
                style={{ animationDelay: "0.1s" }}
              >
                Ideas.
              </span>
              <br />
              <span
                className="inline-block animate-word-reveal text-accent animate-text-glow"
                style={{ animationDelay: "0.2s" }}
              >
                Delivering
              </span>
              <span
                className="inline-block ml-2 animate-word-reveal text-accent animate-text-glow"
                style={{ animationDelay: "0.3s" }}
              >
                Solutions.
              </span>
            </h1>
            <p
              className="text-lg text-foreground/80 mb-8 leading-relaxed max-w-lg animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              AeroLynks helps businesses take off with innovative digital
              solutions that drive real results. From app development to
              strategic consulting, we&apos;re your partner in digital
              transformation.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2" size={20} />
              </Link>
              {/* <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-accent/20">
                Watch Video
              </button> */}
            </div>
            <p className="text-sm text-foreground/60">
              Trusted by <span className="text-accent font-semibold">50+</span>{" "}
              businesses worldwide
            </p>
          </div>

          {/* Right Graphic - Tech Globe */}
          <div
            className="relative h-96 lg:h-full min-h-96 flex items-center justify-center animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <TechGlobe />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/3 w-96 h-96 bg-accent/15 rounded-full filter blur-3xl animate-float-slow"></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl animate-pulse-glow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-2">OUR SERVICES</p>
            <h2 className="text-4xl font-bold text-foreground">
              Solutions That Power Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.link}
                  className="group p-6 rounded-xl border border-border/50 hover:border-accent hover:bg-background/50 transition-all duration-300 animate-slide-up hover:shadow-xl hover:shadow-accent/30"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="text-accent group-hover:scale-125 transition-transform duration-300"
                      size={24}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {service.description}
                  </p>
                  <span className="text-accent text-sm font-semibold group-hover:translate-x-2 transition-transform inline-block">
                    Learn More →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div
            className="absolute top-0 -right-40 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="absolute bottom-0 -left-32 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl animate-float-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300 animate-text-glow"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {stat.value}
                </div>
                <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-card/50 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Let&apos;s discuss your project and explore how we can help you
            achieve your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Start Your Journey <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
