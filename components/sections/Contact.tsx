import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Card } from "../ui/card";
// import ContactForm from "../contact-form";
import Image from "next/image";
const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="flex gap-4 mb-8">
            <Button variant={"outline"} size={"icon"} asChild>
              <a
                href="https://github.com/LalitChaudhary01"
                target="_blank"
                rel="noopener"
                title="Visit GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <a
                href="https://www.linkedin.com/in/lalit-chaudhary-1a816a21b/"
                target="_blank"
                rel="noopener"
                title="Visit LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <a href="mailto:work.lalitchaudhary.com" target="_blank">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
            {/* whatsaap button */}
            <Button variant={"outline"} size={"icon"} asChild>
              <a
                href="https://wa.me/917992000000"
                target="_blank"
                rel="noopener"
                title="Chat on WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <Card className="px-6 py-6">{/* <ContactForm /> */}</Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mt-20"
        >
          <Image
            src={"/contact.svg"}
            alt="Contact Illustrations"
            width={600}
            height={600}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
