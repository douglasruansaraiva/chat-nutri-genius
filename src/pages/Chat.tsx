
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Send, Mic, User } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Olá! Sou a NutriGênio, sua nutricionista virtual. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      generateAIResponse(input);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    // This would be replaced with actual AI integration
    const responses = [
      "Baseado nas informações que você compartilhou, recomendo aumentar a ingestão de proteínas magras e vegetais de folhas verdes.",
      "É importante lembrar que a hidratação adequada é fundamental para um metabolismo saudável. Tente consumir pelo menos 2 litros de água diariamente.",
      "Para atingir seus objetivos, considere incorporar mais alimentos ricos em fibras, como grãos integrais, frutas e legumes.",
      "As refeições balanceadas devem incluir proteínas, carboidratos complexos e gorduras saudáveis para fornecer todos os nutrientes necessários.",
      "Tente evitar alimentos ultra-processados e opte por alternativas naturais sempre que possível.",
    ];

    const aiMessage: Message = {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: "ai",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Comando de voz",
      description: "Funcionalidade de comando de voz será implementada em breve!",
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-8rem)]">
        <Card className="flex flex-col flex-1 overflow-hidden border-white/20 bg-gradient-to-br from-black/80 to-zinc-900/90">
          {/* Chat header */}
          <div className="border-b border-white/10 p-4 flex items-center">
            <div className="flex items-center space-x-3">
              <Avatar>
                <div className="bg-primary/20 h-full w-full flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">N</span>
                </div>
              </Avatar>
              <div>
                <h2 className="font-bold">NutriGênio</h2>
                <p className="text-xs text-white/70">Nutricionista IA • Online</p>
              </div>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-zinc-800 text-white rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl p-4 bg-zinc-800 text-white rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-zinc-800 rounded-full flex items-center overflow-hidden">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="bg-transparent flex-1 py-3 px-4 outline-none text-white resize-none max-h-32"
                  rows={1}
                  style={{ height: "auto" }}
                ></textarea>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-10 w-10 mr-1"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full h-10 w-10 mr-1 bg-primary hover:bg-primary/90"
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-2 text-center">
              NutriGênio está em fase beta. As respostas são baseadas em conhecimentos nutricionais gerais.
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;
