import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Media Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="outline"
                size="sm"
                asChild
                className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © 2024 ChatPalace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}