"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: "ABOUT" },
    { href: "#works", label: "WORKS" },
    { href: "#lab", label: "LAB" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 glass transition-all duration-300 ${
        isScrolled ? "shadow-lg bg-[#0f172a]/90" : ""
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-wider font-tech text-white group">
          MIT{" "}
          <span className="text-[#00f0ff] group-hover:text-[#bd00ff] transition-colors duration-300">
            TECH
          </span>{" "}
          STUDIO
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-300 hover:text-[#00f0ff] transition-colors text-sm font-medium tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00f0ff] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-5 py-2 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#0f172a] transition-all duration-300 text-sm font-bold skew-x-[-10deg] inline-block magnetic-btn"
          >
            <span className="inline-block skew-x-[10deg]">CONTACT</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 bg-[#0f172a] z-40 transform transition-transform duration-500 ease-out flex flex-col items-center justify-center space-y-8 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-2xl font-tech text-white hover:text-[#00f0ff] transition-all duration-300 transform hover:scale-110"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="text-2xl font-tech text-[#00f0ff] border-b-2 border-[#00f0ff] pb-1 hover:text-white hover:border-white transition-colors"
        >
          CONTACT
        </a>
      </div>
    </header>
  )
}
