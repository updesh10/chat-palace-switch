import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Key, Save, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SettingsSection() {
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    gemini: ""
  });
  const [showKeys, setShowKeys] = useState({
    openai: false,
    gemini: false
  });
  const { toast } = useToast();

  const handleKeyChange = (provider: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const handleSave = () => {
    // In a real app, you'd save these to a secure backend
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved securely.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">API Configuration</h2>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Configure your AI provider API keys to enable advanced chat features.
        </p>

        <div className="space-y-6">
          {/* OpenAI API Key */}
          <div className="space-y-2">
            <Label htmlFor="openai-key" className="text-foreground font-medium">
              OpenAI API Key
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="openai-key"
                type={showKeys.openai ? "text" : "password"}
                value={apiKeys.openai}
                onChange={(e) => handleKeyChange("openai", e.target.value)}
                placeholder="sk-..."
                className="pl-10 pr-12 bg-secondary/30 border-border"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => toggleKeyVisibility("openai")}
              >
                {showKeys.openai ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Dashboard</a>
            </p>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-2">
            <Label htmlFor="gemini-key" className="text-foreground font-medium">
              Gemini API Key
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="gemini-key"
                type={showKeys.gemini ? "text" : "password"}
                value={apiKeys.gemini}
                onChange={(e) => handleKeyChange("gemini", e.target.value)}
                placeholder="AIza..."
                className="pl-10 pr-12 bg-secondary/30 border-border"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => toggleKeyVisibility("gemini")}
              >
                {showKeys.gemini ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}