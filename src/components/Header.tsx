import { MessageCircle, Users, Settings, Menu, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  return (
    <Card className="rounded-none border-b border-border bg-gradient-to-r from-card/95 to-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ChatPalace</h1>
              <p className="text-xs text-muted-foreground">Connect & Communicate</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Link>
            <Link 
              to="/transcripts" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === "/transcripts" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Transcripts</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>3 Active Chats</span>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="secondary" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}