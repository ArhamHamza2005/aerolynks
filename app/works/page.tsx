"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectModal } from "@/components/project-modal";
import { ArrowRight } from "lucide-react";

const projectsData = [
  {
    id: "ecommerce-site",
    title: "E-Commerce Platform Optimization",
    category: "Website Optimization",
    industry: "E-commerce",
    type: "website",
    problem:
      "Website was only displaying 72 products instead of the full catalog. Customers couldn't browse the complete inventory, leading to missed sales opportunities and poor user experience.",
    solution:
      "Our team updated the backend infrastructure to handle unlimited products and increased frontend flexibility with dynamic pagination and advanced filtering. Implemented optimized database queries and lazy loading to ensure fast performance even with thousands of products.",
    result:
      "Now all 2,500+ products are visible and searchable. Customers can browse the complete catalog with improved performance. Sales increased by 45% due to better product visibility and user experience.",
    beforeImage: "/portfolio/ecom before.png",
    afterImage: "/portfolio/ecom after.png",
    metrics: [],
  },
  {
    id: "Analysis platform",
    title: "Analysis Management Platform",
    category: "Full-Stack Web Application",
    industry: "FinTech",
    type: "website",
    problem:
      "Daily data updates were not syncing properly and analytics graphs were displaying incorrect data. The real-time dashboard metrics didn't match actual business data, causing poor decision-making.",
    solution:
      "Implemented robust data pipeline with scheduled jobs running every hour instead of daily. Built real-time WebSocket connections for instant data synchronization. Rewrote analytics engine with optimized queries and caching strategy. Added data validation layer to ensure accuracy and consistency across all reports.",
    result:
      "All data now updates in real-time with 100% accuracy. Analytics graphs display correct metrics instantly. Decision-making improved with reliable data insights. System handles 1000+ concurrent users with 99.9% uptime.",
    beforeImage: "/portfolio/saas before.png",
    afterImage: "/portfolio/saas after.png",
    metrics: [],
  },
  {
    id: "fitness-app",
    title: "Fitness Tracking Mobile App",
    category: "Native Mobile Application",
    industry: "Healthcare & Wellness",
    type: "app",
    problem:
      "When users booked fitness sessions, their tracking data was only visible on a daily basis. Weekly performance metrics were unavailable, preventing users from seeing fitness progress over time.",
    solution:
      "Implemented weekly aggregation of fitness data with intelligent algorithms to calculate weekly summaries, progress trends, and performance metrics. Added beautiful weekly view with charts showing calorie burn, workout frequency, and fitness goals. Integrated monthly and yearly analytics for comprehensive fitness tracking.",
    result:
      "Users can now track progress weekly, monthly, and yearly. Engagement increased by 60% as users could see long-term progress. Retention improved with motivational weekly summaries and achievement badges. App rating improved to 4.9 stars.",
    beforeImage: "/portfolio/fitness before.png",
    afterImage: "/portfolio/fitness after.png",
    metrics: [],
  },
  {
    id: "edtech-platform",
    title: "EdTech Learning Management System",
    category: "Educational Platform",
    industry: "Education",
    type: "app",
    problem:
      "Student attendance tracking was not working properly. Semester-end total attendance wasn't being calculated. The UI was confusing, and students couldn't properly track their own attendance. Subject attendance data was mixing between different subjects.",
    solution:
      "Rebuilt attendance module with separate tracking for each subject. Implemented real-time attendance calculations with backup systems to prevent data loss. Redesigned UI with clear subject-specific attendance views. Created student-facing dashboard showing attendance by subject and semester total with visual indicators.",
    result:
      "Attendance now accurately tracks per subject with no data mixing. Semester totals calculated correctly in real-time. Students and teachers can view accurate attendance anytime. Parent portal shows attendance notifications. Improved from 45% to 95% attendance tracking accuracy.",
    beforeImage: "/portfolio/edtech before (2).png",
    afterImage: "/portfolio/edtech after (2).png",
    metrics: [],
  },
  {
    id: "graphic-design",
    title: "Logo Vector Conversion & Branding",
    category: "Graphic Design & Brand Identity",
    industry: "Startup",
    type: "website",
    problem:
      "Client had a raster logo that wasn't flexible for different use cases. It couldn't be scaled without losing quality, and couldn't be easily modified for various brand applications.",
    solution:
      "Converted raster logo to professional SVG vector format with clean paths and curves. Designed multiple variations for different contexts (light, dark, monochrome). Created comprehensive brand guidelines with usage standards, spacing rules, and color specifications.",
    result:
      "Logo now works perfectly at any size from favicon to billboards. Easy to apply across all brand touchpoints. SVG format allows for dynamic color variations and animations. Brand consistency achieved across all platforms.",
    beforeImage: "/portfolio/vector brfore.png",
    afterImage: "/portfolio/vector after.png",
    metrics: [],
  },
];

const industries = [
  "All",
  "E-commerce",
  "FinTech",
  "Healthcare & Wellness",
  "Education",
  "Startup",
];

export default function WorksPage() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Works</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            See how we&apos;ve helped businesses transform their ideas into
            successful digital solutions.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-float-slow"></div>
          <div
            className="absolute bottom-20 left-0 w-80 h-80 bg-accent/15 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group text-left border border-border/50 rounded-xl overflow-hidden hover:border-accent hover:bg-background/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Image Preview */}
                <div className="w-[80%] mx-auto aspect-video bg-background/50 relative overflow-hidden rounded-xl">
                  <Image
                    src={project.beforeImage}
                    alt={project.title}
                    fill
                    className="group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold uppercase">
                      {project.type}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {project.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {project.category}
                  </p>
                  <div className="flex items-center text-accent text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    View Project <ArrowRight className="ml-2" size={16} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to see what we can do for you?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Let&apos;s discuss your project and create something amazing
            together.
          </p>
          <button
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Start Your Project <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={{
            ...selectedProject,
            beforeImage: selectedProject.beforeImage,
            afterImage: selectedProject.afterImage,
            projectType: selectedProject.type as "website" | "app",
          }}
        />
      )}

      <Footer />
    </main>
  );
}
