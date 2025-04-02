"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCode,
  FaPalette,
  FaMobileAlt,
  FaServer,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMAGES } from "@/constants/placeholders";
import { ProjectCard } from "@/components/molecules/project-card/project-card";

const projects = [
  {
    title: "Project One",
    description: "A modern web application built with Next.js and TypeScript",
    image: "/placeholders/product.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
    githubLink: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description: "Mobile-first e-commerce platform with real-time updates",
    image: "/placeholders/product-square.png",
    tags: ["React Native", "Firebase", "Redux"],
    link: "#",
    githubLink: "https://github.com/yourusername/project-two",
  },
  {
    title: "Project Three",
    description: "AI-powered data analytics dashboard",
    image: "/placeholders/product-tall.png",
    tags: ["Python", "TensorFlow", "D3.js"],
    link: "#",
    githubLink: "https://github.com/yourusername/project-three",
  },
];

const skills = [
  { name: "Frontend Development", level: 90, icon: FaCode },
  { name: "UI/UX Design", level: 85, icon: FaPalette },
  { name: "Mobile Development", level: 80, icon: FaMobileAlt },
  { name: "Backend Development", level: 75, icon: FaServer },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    content:
      "John delivered exceptional results for our project. His attention to detail and technical expertise were invaluable.",
    avatar: PLACEHOLDER_IMAGES.AVATAR_FEMALE,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content:
      "Working with John was a great experience. He understood our requirements perfectly and delivered beyond expectations.",
    avatar: PLACEHOLDER_IMAGES.AVATAR_MALE,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="avatar mb-8">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    src={PLACEHOLDER_IMAGES.AVATAR_MALE}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">John Doe</h1>
              <p className="text-xl mb-8">
                Full Stack Developer & UI/UX Designer
              </p>
              <div className="flex justify-center gap-4">
                <SocialLink href="#" icon={<FaGithub size={24} />} />
                <SocialLink href="#" icon={<FaLinkedin size={24} />} />
                <SocialLink href="#" icon={<FaTwitter size={24} />} />
                <SocialLink href="#" icon={<FaEnvelope size={24} />} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body items-center text-center">
                  <skill.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title">{skill.name}</h3>
                  <div className="w-full bg-base-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-primary h-2.5 rounded-full"
                    />
                  </div>
                  <p className="text-sm opacity-70">{skill.level}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <p className="text-lg">
                  I'm a passionate full-stack developer with expertise in modern
                  web technologies. I love creating beautiful, responsive, and
                  user-friendly applications that solve real-world problems.
                  With over 5 years of experience in web development, I
                  specialize in building scalable and maintainable solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Client Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm opacity-70">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic">"{testimonial.content}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:contact@example.com" className="btn btn-primary">
              Send Message
            </a>
            <a href="#" className="btn btn-ghost">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link hover:text-primary transition-colors">About us</a>
          <a className="link hover:text-primary transition-colors">Contact</a>
          <a className="link hover:text-primary transition-colors">Projects</a>
          <a className="link hover:text-primary transition-colors">Resume</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors">
              <FaTwitter size={20} />
            </a>
            <a className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors">
              <FaGithub size={20} />
            </a>
            <a className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn btn-circle btn-ghost btn-lg text-base-content hover:text-primary transition-colors"
    >
      {icon}
    </a>
  );
}
