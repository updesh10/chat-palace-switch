import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
