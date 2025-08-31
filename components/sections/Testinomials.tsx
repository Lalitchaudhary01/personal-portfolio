"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/constants";

const Testimonials = () => {
  return (
    <section id="testimonials" className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Client <span className="text-primary">Testimonials</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col bg-card border-border/5">
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary opacity-50" />
              </div>
              <p className="text-muted-foreground mb-6 flex-grow">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4">
                {/* <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                /> */}
                <div>
                  <h4 className="font-semibold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
