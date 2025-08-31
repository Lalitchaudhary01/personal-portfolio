"use client";
import React, { useEffect, useRef } from "react";
import { technologies } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";

const Skills = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const listeners: { card: HTMLDivElement; enter: any; leave: any }[] = [];

    const loadGsap = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );

        // Cards stagger animation
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 100, scale: 0.5, rotation: 180 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
              amount: 1.2,
              grid: "auto",
              from: "center",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
          }
        );

        // Floating + hover animations
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          // Floating animation
          gsap.to(card, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1,
          });

          // Hover effects
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.1,
              rotationY: 10,
              z: 50,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(card, {
              boxShadow:
                "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)",
              duration: 0.3,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(card, {
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          // store listeners for cleanup
          listeners.push({
            card,
            enter: handleMouseEnter,
            leave: handleMouseLeave,
          });
        });
      }, containerRef);
    };

    loadGsap();

    return () => {
      ctx && ctx.revert();
      listeners.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="skills"
      className="container mx-auto px-4 py-20 relative overflow-hidden"
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="text-3xl font-bold mb-12 text-center relative z-10"
      >
        <span className="text-primary relative">
          Skills
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent transform origin-left scale-x-0 animate-[scale-x_2s_ease-in-out_forwards]"></span>
        </span>
        & Technologies
      </h2>

      {/* Skills grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 relative z-10"
        style={{ perspective: "1000px" }}
      >
        {technologies.map((tech, index) => (
          <Card
            key={index}
            ref={addToRefs}
            className="group p-4 flex flex-col items-center justify-center 
                   hover:border-primary transition-all duration-300 
                   bg-gradient-to-br from-background to-muted/50
                   backdrop-blur-sm border-2 border-transparent
                   cursor-pointer transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={48}
                height={48}
                className="relative z-10 filter drop-shadow-lg"
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-primary/30 
                            animate-spin opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300"
                style={{ animationDuration: "3s" }}
              />
            </div>

            <span className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300 transform group-hover:translate-y-1">
              {tech.name}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
