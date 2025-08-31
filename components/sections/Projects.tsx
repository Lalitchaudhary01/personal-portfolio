"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Check,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "../ui/badge";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play functionality - REMOVED
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [currentIndex, maxIndex]);

  const visibleProjects = projects.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  // If we don't have enough items at the end, add from beginning
  if (visibleProjects.length < itemsPerView) {
    const remainingItems = itemsPerView - visibleProjects.length;
    visibleProjects.push(...projects.slice(0, remainingItems));
  }

  return (
    <section id="projects" className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects showcasing my expertise in full-stack
            development, from e-commerce platforms to AI-powered applications.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                    {/* Animated Gradient Border Beam */}
                    <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-primary via-purple-500 via-primary to-blue-500 animate-spin-slow opacity-80">
                      <div className="w-full h-full rounded-lg bg-card"></div>
                    </div>
                    <div className="absolute inset-[2px] rounded-lg bg-card z-10"></div>

                    {/* Card Content */}
                    <div className="relative z-20 h-full flex flex-col">
                      <div className="relative overflow-hidden aspect-video rounded-t-lg">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <Button asChild variant={"secondary"} size={"sm"}>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          </Button>

                          <Button asChild variant={"secondary"} size={"sm"}>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <Github className="w-4 h-4" />
                              Source Code
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-shrink-0">
                          {project.description}
                        </p>

                        <div className="space-y-4 flex-grow flex flex-col justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant={"secondary"}
                                className="bg-secondary/50 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant={"outline"} className="text-xs">
                                +{project.technologies.length - 4} more
                              </Badge>
                            )}
                          </div>

                          <ul className="space-y-1 flex-grow">
                            {project.features.slice(0, 3).map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-xs text-muted-foreground"
                              >
                                <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">{feature}</span>
                              </li>
                            ))}
                            {project.features.length > 3 && (
                              <li className="text-xs text-muted-foreground/70 pl-5">
                                +{project.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
