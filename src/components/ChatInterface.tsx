import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatPartner {
  id: string;
  name: string;
  avatar: string;
  isBot: boolean;
}

const chatPartners: ChatPartner[] = [
  { id: "bot", name: "AI Assistant", avatar: "🤖", isBot: true },
  { id: "nodejs", name: "Node.js Course", avatar: "📚", isBot: true },
  { id: "python", name: "Python Course", avatar: "🐍", isBot: true },
];

const botResponses = [
  "That's an interesting point! How can I help you further?",
  "I understand. Let me think about that for a moment...",
  "Great question! Here's what I think about that.",
  "I'm here to help! What would you like to know more about?",
  "That makes sense. Would you like me to elaborate on any specific aspect?",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [currentPartner, setCurrentPartner] = useState<ChatPartner>(chatPartners[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate bot response for AI Assistant
    if (currentPartner.isBot) {
      setIsTyping(true);
      
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePartnerChange = (partnerId: string) => {
    const partner = chatPartners.find(p => p.id === partnerId);
    if (partner) {
      setCurrentPartner(partner);
      // Clear messages when switching partners (in a real app, you'd load partner-specific messages)
      setMessages([
        {
          id: "1",
          text: partner.id === "bot" 
            ? "Hello! I'm your AI assistant. How can I help you today?"
            : `Hello! I'm your ${partner.name} assistant. Ask me anything about the course content!`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Card className="rounded-none border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{currentPartner.avatar}</div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Chat with {currentPartner.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentPartner.id === "bot" ? "AI Assistant" : "Course Assistant"}
              </p>
            </div>
          </div>
          
          <Select value={currentPartner.id} onValueChange={handlePartnerChange}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {chatPartners.map((partner) => (
                <SelectItem key={partner.id} value={partner.id} className="text-popover-foreground">
                  <div className="flex items-center gap-2">
                    <span>{partner.avatar}</span>
                    <span>{partner.name}</span>
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              )}>
                {message.sender === "user" ? <User className="h-4 w-4" /> : currentPartner.avatar}
              </div>
              
              <Card className={cn(
                "p-3 max-w-full",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-2"
                  : "bg-secondary text-secondary-foreground mr-2"
              )}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={cn(
                  "text-xs mt-1 opacity-70",
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm shrink-0">
                {currentPartner.avatar}
              </div>
              <Card className="bg-secondary text-secondary-foreground p-3 mr-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <Card className="rounded-none border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${currentPartner.name}...`}
              className="flex-1 bg-secondary/50 border-border focus:ring-primary"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}