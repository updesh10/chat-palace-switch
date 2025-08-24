import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Card } from "@/components/ui/card";
import { FileText, Upload } from "lucide-react";

const Transcripts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Upload Transcripts
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your course transcripts and let our AI help you learn better through interactive conversations.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Add Your Transcripts</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Upload PDF transcripts from your courses to create personalized AI assistants that can answer questions based on your course content.
            </p>
            <FileUpload />
          </Card>
        </div>

        {/* Recent Uploads */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Uploads</h3>
          <div className="grid gap-4">
            <Card className="p-4 bg-card/30 border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Node.js Fundamentals - Lecture 1</p>
                    <p className="text-sm text-muted-foreground">Uploaded 2 hours ago</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
                  Processed
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-card/30 border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Python Basics - Chapter 3</p>
                    <p className="text-sm text-muted-foreground">Uploaded 1 day ago</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
                  Processed
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Transcripts;