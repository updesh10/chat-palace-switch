import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User } from "lucide-react";

const Message = {
  // Type: { id: string; text: string; sender: "user" | "bot"; timestamp: Date; }
};

const ChatPartner = {
  // Type: { id: string; name: string; avatar: string; isBot: boolean; }
};

const chatPartners = [
  { id: "ai", name: "AI Assistant", avatar: "🤖", isBot: true },
  { id: "hitish", name: "Hitish", avatar: "👨", isBot: false },
  { id: "piyush", name: "Piyush", avatar: "👨‍💻", isBot: false },
];

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [currentPartner, setCurrentPartner] = useState(chatPartners[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Simulate bot response for AI assistant
      if (currentPartner.isBot) {
        setIsTyping(true);
        setTimeout(() => {
          const botResponse = {
            id: (Date.now() + 1).toString(),
            text: `Thanks for your message: "${newMessage}". I'm here to help you with any questions you might have!`,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
        }, 1500);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePartnerChange = (partnerId) => {
    const partner = chatPartners.find(p => p.id === partnerId);
    if (partner) {
      setCurrentPartner(partner);
      // Reset messages when switching partners
      if (partner.isBot) {
        setMessages([
          {
            id: "1",
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages([
          {
            id: "1",
            text: `Hey! You're now chatting with ${partner.name}. Start the conversation!`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-card/80 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentPartner.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{currentPartner.name}</h3>
              <p className="text-xs text-muted-foreground">
                {currentPartner.isBot ? "AI Assistant" : "Online"}
              </p>
            </div>
          </div>
          
          <Select value={currentPartner.id} onValueChange={handlePartnerChange}>
            <SelectTrigger className="w-[160px] bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chatPartners.map((partner) => (
                <SelectItem key={partner.id} value={partner.id}>
                  <div className="flex items-center gap-2">
                    <span>{partner.avatar}</span>
                    <span>{partner.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-chat-bubble-user text-chat-bubble-user-foreground ml-4"
                  : "bg-chat-bubble-bot text-chat-bubble-bot-foreground mr-4"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-chat-bubble-bot text-chat-bubble-bot-foreground p-3 rounded-lg mr-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-background/50"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            className="px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}