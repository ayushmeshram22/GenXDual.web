import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const streamChat = async (userMessage: string) => {
    const userMsg: Message = {
      role: "user",
      content: userMessage
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    setInput("");
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: newMessages
        })
      });
      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      let streamDone = false;

      // Add empty assistant message
      setMessages(prev => [...prev, {
        role: "assistant",
        content: ""
      }]);
      while (!streamDone) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, {
          stream: true
        });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent
                };
                return updated;
              });
            }
          } catch {/* ignore */}
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive"
      });
      // Remove the empty assistant message if error
      setMessages(prev => prev.filter(m => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    streamChat(input.trim());
  };
  return <>
      {/* Floating Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      delay: 1,
      type: "spring"
    }}>
        <Button onClick={() => setIsOpen(!isOpen)} size="lg" className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90">
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} transition={{
        duration: 0.2
      }} className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">GenX assistant</h3>
                <p className="text-xs text-primary-foreground/70">Powered by AI</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
              {messages.length === 0 && <div className="text-center text-muted-foreground py-8">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Hi! I'm your cybersecurity assistant.</p>
                  <p className="text-xs mt-1">Ask me anything about security!</p>
                </div>}
              
              <div className="space-y-4">
                {messages.map((msg, i) => <motion.div key={i} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {msg.role === "assistant" ? (
                        <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:bg-background/50 prose-pre:p-2 prose-pre:rounded prose-code:text-xs prose-code:bg-background/50 prose-code:px-1 prose-code:rounded prose-headings:my-2 prose-headings:text-sm">
                          <ReactMarkdown>
                            {msg.content || (isLoading ? "..." : "")}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </motion.div>)}
                
                {isLoading && messages[messages.length - 1]?.role === "user" && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </motion.div>}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about cybersecurity..." disabled={isLoading} className="flex-1" />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>}
      </AnimatePresence>
    </>;
}