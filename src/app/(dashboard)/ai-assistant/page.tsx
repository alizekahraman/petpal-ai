import type { Metadata } from "next";
import { Sparkles, Send, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "AI Assistant" };

const PLACEHOLDER_MESSAGES = [
  {
    id: "1",
    role: "assistant" as const,
    content: "Hi! I'm your PetPal AI assistant. I can help you with nutrition advice, health questions, behavior tips, and more. What would you like to know about your pets today?",
  },
  {
    id: "2",
    role: "user" as const,
    content: "Luna has been scratching a lot lately. Should I be worried?",
  },
  {
    id: "3",
    role: "assistant" as const,
    content: "Excessive scratching in dogs can have several causes, ranging from simple seasonal allergies to skin conditions or parasites. Here are some things to consider:\n\n• **Allergies** — environmental (pollen, dust) or food-related\n• **Fleas or mites** — check for tiny dark specks in the coat\n• **Dry skin** — common in winter months\n• **Yeast or bacterial infection** — often accompanied by redness or odor\n\nSince Luna is a Golden Retriever, they're known to be prone to skin allergies. I'd recommend scheduling a vet visit if the scratching persists for more than a week or if you notice any redness, hair loss, or sores. Would you like me to help you track this and set a vet reminder?",
  },
];

const QUICK_PROMPTS = [
  "What should I feed a senior cat?",
  "How much exercise does Luna need?",
  "When should I deworm Mochi?",
  "Signs of dental disease in pets",
];

export default function AIAssistantPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="AI Assistant"
        description="Ask anything about your pets' health, nutrition, and care."
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0">
        {PLACEHOLDER_MESSAGES.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {message.role === "assistant" ? (
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
            ) : (
              <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            )}
            <Card
              className={`px-4 py-3 max-w-[85%] border-border/50 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground border-primary"
                  : ""
              }`}
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <Card className="p-3 border-border/50 mt-2">
        <div className="flex gap-2 items-end">
          <Textarea
            placeholder="Ask about Luna, Mochi, or pet care in general..."
            className="resize-none border-0 shadow-none focus-visible:ring-0 min-h-[60px] max-h-32 p-0 text-sm"
            rows={2}
          />
          <Button size="icon" className="rounded-xl shrink-0 h-9 w-9">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
