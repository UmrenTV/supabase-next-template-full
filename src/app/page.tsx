"use client";
import ThemeSwitcher from "./components/base/ThemeSwitcher";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              Next.js Template
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/components">Components</Link>
              </li>
              <li>
                <Link href="/templates">Templates</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="hero min-h-[calc(100vh-8rem)]">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold">Next.js Template</h1>
              <p className="py-6">
                A comprehensive template built with Next.js 14, TypeScript, Tailwind CSS, and DaisyUI.
                Featuring atomic design components, dark mode support, and responsive layouts.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/components" className="btn btn-primary">
                  View Components
                </Link>
                <Link href="/templates" className="btn btn-ghost">
                  View Templates
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Atomic Design</h2>
              <p>Built with atomic design principles for maximum reusability and maintainability.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">TypeScript</h2>
              <p>Fully typed components and utilities for better development experience.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">DaisyUI</h2>
              <p>Beautiful, responsive components with built-in dark mode support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
