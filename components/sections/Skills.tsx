"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { technologies } from "@/constants";
import { Card } from "../ui/card";
import Image from "next/image";

// Types for listeners
type CardListener = {
  card: HTMLDivElement;
  enter: () => void;
  leave: () => void;
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const gsapCtxRef = useRef<any>(null);

  // Memoized ref collector to prevent unnecessary re-renders
  const addToRefs = useCallback((el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  }, []);

  // Check if device supports hover (not touch-only)
  const supportsHover = () => {
    return window.matchMedia("(hover: hover)").matches;
  };

  // Get responsive values based on screen size
  const getResponsiveValues = () => {
    const width = window.innerWidth;
    if (width < 768) {
      // Mobile
      return {
        titleY: -30,
        cardY: 50,
        cardScale: 0.7,
        cardRotation: 90,
        staggerAmount: 0.8,
        floatDistance: -5,
        hoverScale: 1.05,
        hoverRotationY: 5,
      };
    } else if (width < 1024) {
      // Tablet
      return {
        titleY: -40,
        cardY: 70,
        cardScale: 0.6,
        cardRotation: 135,
        staggerAmount: 1.0,
        floatDistance: -7,
        hoverScale: 1.08,
        hoverRotationY: 8,
      };
    } else {
      // Desktop
      return {
        titleY: -50,
        cardY: 100,
        cardScale: 0.5,
        cardRotation: 180,
        staggerAmount: 1.2,
        floatDistance: -10,
        hoverScale: 1.1,
        hoverRotationY: 10,
      };
    }
  };

  useEffect(() => {
    let listeners: CardListener[] = [];
    let floatingTimelines: any[] = [];

    const loadGsap = async () => {
      try {
        const gsapModule = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.gsap;
        gsap.registerPlugin(ScrollTrigger);

        const responsive = getResponsiveValues();

        // Clear previous context
        if (gsapCtxRef.current) {
          gsapCtxRef.current.revert();
        }

        gsapCtxRef.current = gsap.context(() => {
          // Title animation with responsive values
          if (titleRef.current) {
            gsap.fromTo(
              titleRef.current,
              {
                opacity: 0,
                y: responsive.titleY,
                scale: 0.8,
                rotationX: -15,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: "back.out(1.4)",
                scrollTrigger: {
                  trigger: titleRef.current,
                  start: "top 85%",
                  end: "bottom 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Cards stagger animation with responsive values
          if (cardsRef.current.length > 0) {
            gsap.fromTo(
              cardsRef.current,
              {
                opacity: 0,
                y: responsive.cardY,
                scale: responsive.cardScale,
                rotation: responsive.cardRotation,
                transformOrigin: "center center",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.4)",
                stagger: {
                  amount: responsive.staggerAmount,
                  grid: "auto",
                  from: "center",
                },
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 75%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Enhanced floating + hover animations
          cardsRef.current.forEach((card, index) => {
            if (!card) return;

            // Responsive floating animation
            const floatTimeline = gsap.to(card, {
              y: responsive.floatDistance,
              duration: 2 + (index % 3) * 0.5, // Varied duration for organic feel
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.15,
            });
            floatingTimelines.push(floatTimeline);

            // Enhanced hover effects (only on devices that support hover)
            if (supportsHover()) {
              const handleMouseEnter = () => {
                gsap.to(card, {
                  scale: responsive.hoverScale,
                  rotationY: responsive.hoverRotationY,
                  z: 30,
                  duration: 0.4,
                  ease: "power2.out",
                });
                gsap.to(card, {
                  boxShadow: `0 15px 35px rgba(59, 130, 246, 0.4), 
                             0 5px 15px rgba(59, 130, 246, 0.3),
                             inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  duration: 0.4,
                });
                // Add subtle glow effect
                gsap.to(card, {
                  filter: "brightness(1.1) contrast(1.05)",
                  duration: 0.4,
                });
              };

              const handleMouseLeave = () => {
                gsap.to(card, {
                  scale: 1,
                  rotationY: 0,
                  z: 0,
                  duration: 0.4,
                  ease: "power2.out",
                });
                gsap.to(card, {
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  duration: 0.4,
                });
                gsap.to(card, {
                  filter: "brightness(1) contrast(1)",
                  duration: 0.4,
                });
              };

              card.addEventListener("mouseenter", handleMouseEnter);
              card.addEventListener("mouseleave", handleMouseLeave);

              listeners.push({
                card,
                enter: handleMouseEnter,
                leave: handleMouseLeave,
              });
            }

            // Touch devices - simple tap effect
            if (!supportsHover()) {
              const handleTouchStart = () => {
                gsap.to(card, {
                  scale: 0.95,
                  duration: 0.1,
                  ease: "power2.out",
                });
              };

              const handleTouchEnd = () => {
                gsap.to(card, {
                  scale: 1,
                  duration: 0.2,
                  ease: "power2.out",
                });
              };

              card.addEventListener("touchstart", handleTouchStart);
              card.addEventListener("touchend", handleTouchEnd);

              listeners.push({
                card,
                enter: handleTouchStart,
                leave: handleTouchEnd,
              });
            }
          });
        }, containerRef);

        // Refresh ScrollTrigger on resize for better responsiveness
        const handleResize = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        // Cleanup resize listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    loadGsap();

    return () => {
      // Cleanup GSAP context
      if (gsapCtxRef.current) {
        gsapCtxRef.current.revert();
      }

      // Cleanup floating timelines
      floatingTimelines.forEach((timeline) => {
        timeline.kill();
      });

      // Cleanup event listeners
      listeners.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
        card.removeEventListener("touchstart", enter);
        card.removeEventListener("touchend", leave);
      });

      // Clear refs
      cardsRef.current = [];
    };
  }, []);

  return (
    <section
      id="skills"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <h2
        ref={titleRef}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10"
      >
        <span className="text-primary relative inline-block">
          Skills
          <span className="absolute -bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent transform origin-left scale-x-0 animate-[scale-x_2s_ease-in-out_forwards]"></span>
        </span>
        <span className="ml-2">& Technologies</span>
      </h2>

      {/* Skills grid with responsive layout */}
      <div
        ref={containerRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                   gap-4 sm:gap-6 lg:gap-8 relative z-10"
        style={{ perspective: "1200px" }}
      >
        {technologies.map((tech, index) => (
          <Card
            key={`${tech.name}-${index}`}
            ref={addToRefs}
            className="group p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center 
                     hover:border-primary transition-all duration-300 
                     bg-gradient-to-br from-background via-background/95 to-muted/30
                     backdrop-blur-sm border-2 border-muted/20
                     cursor-pointer transform-gpu min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]
                     hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, box-shadow, filter",
            }}
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

      {/* Responsive grid info for better mobile experience */}
    </section>
  );
};

export default Skills;
