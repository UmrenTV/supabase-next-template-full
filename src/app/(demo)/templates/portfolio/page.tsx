'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { getPlaceholderImage } from '@/constants/placeholders'

const projects = [
  {
    title: 'Project One',
    description: 'A modern web application built with Next.js and TypeScript',
    image: getPlaceholderImage('PRODUCT', 600, 400, 'P1'),
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#'
  },
  {
    title: 'Project Two',
    description: 'Mobile-first e-commerce platform with real-time updates',
    image: getPlaceholderImage('PRODUCT', 600, 400, 'P2'),
    tags: ['React Native', 'Firebase', 'Redux'],
    link: '#'
  },
  {
    title: 'Project Three',
    description: 'AI-powered data analytics dashboard',
    image: getPlaceholderImage('PRODUCT', 600, 400, 'P3'),
    tags: ['Python', 'TensorFlow', 'D3.js'],
    link: '#'
  }
]

const skills = [
  { name: 'Frontend Development', level: 90 },
  { name: 'Backend Development', level: 85 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'Mobile Development', level: 75 },
  { name: 'DevOps', level: 70 }
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Image
              src={getPlaceholderImage('AVATAR_MALE', 150, 150, 'JD')}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-8 border-4 border-purple-500"
            />
            <h1 className="text-5xl font-bold mb-4">John Doe</h1>
            <p className="text-xl text-gray-300 mb-8">Full Stack Developer & UI/UX Designer</p>
            <div className="flex justify-center space-x-4">
              <SocialLink href="#" icon={<FaGithub />} />
              <SocialLink href="#" icon={<FaLinkedin />} />
              <SocialLink href="#" icon={<FaTwitter />} />
              <SocialLink href="#" icon={<FaEnvelope />} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={project.link} className="text-purple-400 hover:text-purple-300">
                    View Project →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block bg-purple-500 text-white px-8 py-3 rounded-full hover:bg-purple-600 transition-colors"
          >
            Send Message
          </a>
        </div>
      </section>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500 transition-colors"
    >
      {icon}
    </a>
  )
} 