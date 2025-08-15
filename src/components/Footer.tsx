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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">ChatPalace</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The ultimate platform for AI-powered conversations and community building. 
              Connect, communicate, and collaborate with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Support
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Follow Us</h4>
            <div className="flex flex-wrap gap-2">
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
            <p className="text-muted-foreground text-xs">
              Stay connected with our community and get the latest updates.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 ChatPalace. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ for the community
          </p>
        </div>
      </div>
    </footer>
  );
}