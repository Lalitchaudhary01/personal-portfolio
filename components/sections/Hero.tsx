"use client";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new"; // 👈 spotlight import

const Hero = () => {
  return (
    <div className="relative w-full h-full">
      {/* Spotlight Background */}
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      {/* Hero Content */}
      <section className="container mx-auto px-4 pt-32 pb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi , I'm <span className="text-primary">Lalit Chaudhary</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Full Stack Developer crafting modern web experiences
            </p>
            <div className="flex gap-4">
              <Button variant={"default"} className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>
              <Link
                href={"https://github.com/Lalitchaudhary01"}
                target="_blank"
              >
                <Button variant={"outline"} className="gap-2">
                  <Github className="w-4 h-4" />
                  Github
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Image
              src={"/hero.svg"}
              alt="Developer Illustration"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
