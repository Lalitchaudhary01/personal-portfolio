"use client";
import React from "react";
import { technologies } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";

const Skills = () => {
  return (
    <section
      id="skills"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10">
        <span className="text-primary relative inline-block">
          Skills
          <span className="absolute -bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent"></span>
        </span>
        <span className="ml-2">& Technologies</span>
      </h2>

      {/* Skills grid with responsive layout */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                   gap-4 sm:gap-6 lg:gap-8 relative z-10"
      >
        {technologies.map((tech, index) => (
          <Card
            key={`${tech.name}-${index}`}
            className="group p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center 
                     hover:border-primary transition-all duration-300 
                     bg-gradient-to-br from-background via-background/95 to-muted/30
                     backdrop-blur-sm border-2 border-muted/20
                     cursor-pointer min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]
                     hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
          >
            {/* Icon container with responsive sizing */}
            <div className="relative mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src={tech.logo}
                alt={`${tech.name} technology logo`}
                width={40}
                height={40}
                className="relative z-10 filter drop-shadow-lg w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                          group-hover:drop-shadow-xl transition-all duration-300"
                loading="lazy"
              />
              {/* Animated border ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-primary/30 
                          animate-spin opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 scale-125"
                style={{ animationDuration: "3s" }}
              />
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full bg-primary/20 blur-md
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"
              />
            </div>

            {/* Technology name with responsive text */}
            <span
              className="text-xs sm:text-sm lg:text-base font-medium text-center 
                           group-hover:text-primary transition-colors duration-300 
                           transform group-hover:translate-y-1 leading-tight
                           max-w-full overflow-hidden text-ellipsis"
            >
              {tech.name}
            </span>

            {/* Subtle gradient overlay on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                          rounded-lg pointer-events-none"
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;