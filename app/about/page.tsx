"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  ArrowRight,
  Sparkles,
  Star,
  Code2,
  Cpu,
  Rocket,
  Users,
  Phone,
} from "lucide-react";

/**
 * Professional About Page
 * - Next.js + TypeScript
 * - Tailwind + shadcn/ui
 * - GSAP Scroll animations (lazy loaded to avoid SSR mismatch)
 *
 * Usage options:
 * 1) App Router page: put this in app/about/page.tsx and export default AboutPage
 * 2) Component: put in components/AboutPage.tsx and render in a page
 */

const HSTACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Shadcn/UI",
  "Redux",
  "Zustand",
  "Auth.js",
  "Clerk",
  "Stripe",
  "AWS",
  "Vercel",
  "Docker",
  "GSAP",
  "Framer Motion",
  "LangChain",
  "OpenAI API",
];

const SERVICES = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Product Engineering",
    desc: "Design, build and ship robust web apps with modern DX and clean architectures.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "GenAI Solutions",
    desc: "Custom chatbots, assistants (BTOS, GENTAS), RAG pipelines, automations that actually ship.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Growth & Performance",
    desc: "SEO, Core Web Vitals, paid campaigns & analytics to grow traffic and revenue.",
  },
];

const STATS = [
  { label: "Clients Served", value: "10+" },
  { label: "Traffic Uplift", value: "30%+" },
  { label: "Projects Shipped", value: "25+" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // GSAP lazy load for SSR safety
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    (async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // generic reveal
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
            gsap.from(el, {
              opacity: 0,
              y: 24,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.06,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });

          // subtle parallax on hero image
          const heroImg = document.querySelector("#heroImg");
          if (heroImg) {
            gsap.to(heroImg, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: heroImg,
                start: "top bottom",
                scrub: true,
              },
            });
          }
        }, pageRef);
      } catch (e) {
        // gsap not available – fail silently
        console.warn("GSAP failed to load:", e);
      }
    })();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      id="about"
      className="container mx-auto px-6 py-16 md:py-24"
    >
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 reveal">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-2 text-sm"
          >
            <Sparkles className="h-4 w-4" /> About Me
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Developer, Founder &{" "}
            <span className="text-primary">AI Builder</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I’m <span className="font-semibold">Lalit</span> — a full‑stack
            developer focused on building modern, scalable and delightful
            products with <span className="font-medium">Next.js</span> & Modern
            technologies. I also design and ship{" "}
            <span className="font-medium">Generative AI</span> experiences:
            chatbots, assistants, RAG, and workflow automations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#contact" className="group">
                Contact Me{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://newweb.in" target="_blank" rel="noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Newweb.in
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {STATS.map((s) => (
              <Card key={s.label} className="reveal">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="reveal flex justify-center">
          <div className="relative">
            <Image
              id="heroImg"
              src="/profile.svg"
              alt="Lalit"
              width={360}
              height={360}
              className="rounded-2xl shadow-2xl"
            />
            <Card className="absolute -bottom-6 -right-6 w-44">
              <CardContent className="p-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">Trusted by clients</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* FOUNDER / STORY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 reveal">
          <CardHeader>
            <CardTitle>Founder — Newweb.in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              I founded <span className="font-medium">Newweb.in</span>, a
              digital agency delivering web & app development, SEO and digital
              marketing. I manage delivery pipelines, client communication and
              hiring end‑to‑end.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Shipped{" "}
                <span className="font-medium">
                  10+ high‑performance websites
                </span>{" "}
                for diverse industries.
              </li>
              <li>
                Led SEO & paid campaigns boosting client traffic by{" "}
                <span className="font-medium">30%+</span>.
              </li>
              <li>
                Obsessed about performance, accessibility & maintainable
                codebases.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="reveal">
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="icon">
              <Link href="https://github.com/LalitChaudhary01" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link
                href="https://www.linkedin.com/in/lalit-chaudhary-1a816a21b/"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="mailto:work.lalitchaudhary@gmail.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link
                href="https://wa.me/918445646300"
                target="_blank"
                rel="noopener"
                title="Chat on WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* SERVICES */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 reveal">
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Card key={s.title} className="reveal">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl p-2 bg-muted">{s.icon}</div>
                <CardTitle className="text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {s.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 reveal">
          Tech I Use
        </h2>
        <div className="reveal flex flex-wrap gap-2">
          {HSTACK.map((t) => (
            <Badge key={t} variant="secondary" className="text-sm">
              {t}
            </Badge>
          ))}
        </div>
      </section>

      {/* GENAI TABS */}
      <section className="mt-12 reveal">
        <Tabs defaultValue="chatbots" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
            <TabsTrigger value="assistants">Assistants</TabsTrigger>
            <TabsTrigger value="automation">Automations</TabsTrigger>
          </TabsList>
          <TabsContent value="chatbots">
            <Card>
              <CardHeader>
                <CardTitle>Custom Business Chatbots</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Domain‑aware chatbots with tools, memory and analytics. Built
                with OpenAI/LangChain, deployed on web & WhatsApp.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assistants">
            <Card>
              <CardHeader>
                <CardTitle>BTOS & GENTAS</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Tailored AI assistants for ops and support: knowledge search
                (RAG), document Q&A, lead qualification, and more.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Automation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Data pipelines, schedulers and integrations that connect CRM,
                Slack, Sheets and your apps—hands‑off productivity.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* TIMELINE */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 reveal">
          Journey
        </h2>
        <div className="space-y-4">
          {[
            {
              year: "2025",
              title: "Scaling GenAI builds",
              note: "Shipping assistants and RAG systems for clients.",
            },
            {
              year: "2024",
              title: "Founded Newweb.in",
              note: "Delivered 10+ sites, led growth campaigns.",
            },
            {
              year: "2023",
              title: "Deep into Next.js",
              note: "Performance, DX and product shipping.",
            },
          ].map((item, i) => (
            <div key={i} className="reveal relative pl-6">
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="text-sm shrink-0 text-muted-foreground w-14">
                    {item.year}
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {item.note}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (Wall of Love style placeholder) */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 reveal">
          Wall of Love
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="reveal">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    Client Testimonial
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  “Lalit delivered beyond expectations—fast, clean and
                  performance‑focused. Highly recommended.”
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Do you take freelance or long‑term work?
            </AccordionTrigger>
            <AccordionContent>
              Yes. I work on scoped projects and product partnerships. Reach out
              with context and timelines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Which stack do you prefer?</AccordionTrigger>
            <AccordionContent>
              Next.js + TypeScript on the frontend, Node/Express with Prisma on
              the backend, Vercel/AWS for deploy, and GenAI where it adds value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can you improve performance & SEO?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. I focus on Core Web Vitals, image strategy, caching,
              and SEO best practices to lift rankings and conversions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="mt-14">
        <Card className="reveal">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">
                Let’s build something great
              </h3>
              <p className="text-muted-foreground mt-1">
                Tell me about your idea, roadmap or metrics you want to improve.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="mailto:work.lalitchaudhary@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href="https://www.linkedin.com/in/lalit-chaudhary-1a816a21b/"
                  target="_blank"
                >
                  <Linkedin className="mr-2 h-4 w-4" /> Connect
                </Link>
              </Button>
              <Button variant={"outline"} size={"icon"} asChild>
                <Link
                  href="https://wa.me/918445646300"
                  target="_blank"
                  rel="noopener"
                  title="Chat on WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
