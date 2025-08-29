"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t bg-card relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-gradient-to-r from-primary to-purple-600" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Lalit Chaudhary
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Developer & Founder — building digital experiences with{" "}
              <span className="font-medium">
                Next.js, GenAI, and modern web tech
              </span>
              . Focused on performance, user experience, and scalable solutions
              🚀
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/LalitChaudhary01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/lalit-chaudhary-1a816a21b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:work.lalitchaudhary@gmail.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors relative after:block after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Noida, Uttar Pradesh 201301, India</li>
              <li>
                <a
                  href="mailto:work.lalitchaudhary@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  work.lalitchaudhary@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918445646300"
                  className="hover:text-primary transition-colors"
                >
                  +91 8445646300
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lalit Chaudhary. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> using{" "}
            <span className="font-medium">Next.js & shadcn/ui</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
