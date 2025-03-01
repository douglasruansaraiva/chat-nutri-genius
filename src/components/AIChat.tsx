
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Olá! Sou o NutriGênio, seu assistente de nutrição personalizado. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const generateResponse = async (userMessage: string) => {
    // Simulated AI responses related to nutrition
    const nutritionResponses = [
      "Baseado nas suas necessidades, recomendo aumentar o consumo de proteínas magras e vegetais de folhas verdes. Isso ajudará a manter a saciedade por mais tempo.",
      "Para atingir seus objetivos de perda de peso, é importante criar um déficit calórico moderado. Tente reduzir cerca de 300-500 calorias por dia da sua ingestão atual.",
      "Manter-se hidratado é fundamental para o metabolismo e para controlar a fome. Procure beber pelo menos 2 litros de água por dia.",
      "Os carboidratos complexos como aveia, batata doce e arroz integral são excelentes para quem busca energia duradoura e controle do apetite.",
      "Planeje suas refeições com antecedência. Isso pode ajudar a evitar escolhas impulsivas que geralmente não são saudáveis.",
      "Lembre-se que consistência é mais importante que perfeição. Pequenas mudanças sustentáveis têm mais impacto a longo prazo do que dietas restritivas.",
      "Considere incluir mais alimentos ricos em fibras na sua dieta. Eles ajudam a promover a sensação de saciedade e melhoram a digestão.",
      "A qualidade do sono afeta diretamente seus hormônios relacionados à fome. Procure dormir 7-8 horas por noite para melhores resultados.",
      "Tente comer devagar e prestar atenção à sua refeição. A alimentação consciente pode ajudar a evitar o consumo excessivo.",
      "Pequenas refeições a cada 3-4 horas podem ajudar a manter o metabolismo ativo e evitar a fome excessiva."
    ];
    
    // Simple keyword matching for more contextual responses
    let responseText = "";
    
    if (userMessage.toLowerCase().includes("água") || userMessage.toLowerCase().includes("hidratação")) {
      responseText = "A hidratação adequada é essencial! Beber água suficiente ajuda no metabolismo, na digestão e pode até reduzir a sensação de fome. Tente manter uma garrafa de água sempre por perto e estabeleça metas de consumo ao longo do dia.";
    } else if (userMessage.toLowerCase().includes("proteína") || userMessage.toLowerCase().includes("proteina")) {
      responseText = "As proteínas são fundamentais para a saciedade e manutenção da massa muscular. Boas fontes incluem frango, peixe, ovos, laticínios com baixo teor de gordura, tofu e leguminosas. Tente incluir uma fonte de proteína em cada refeição principal.";
    } else if (userMessage.toLowerCase().includes("carboidrato")) {
      responseText = "Os carboidratos não são vilões! Opte por fontes complexas como grãos integrais, batata doce, frutas e legumes. Eles fornecem energia sustentada e são ricos em fibras e nutrientes essenciais.";
    } else if (userMessage.toLowerCase().includes("gordo") || userMessage.toLowerCase().includes("obesidade") || userMessage.toLowerCase().includes("emagrecer")) {
      responseText = "A perda de peso saudável envolve uma combinação de alimentação equilibrada, atividade física regular e hábitos de vida saudáveis. É importante estabelecer metas realistas e fazer mudanças que você possa manter a longo prazo. Foque em escolhas nutritivas, porções adequadas e em aprender a reconhecer os sinais de fome e saciedade do seu corpo.";
    } else if (userMessage.toLowerCase().includes("fome") || userMessage.toLowerCase().includes("apetite")) {
      responseText = "Controlar o apetite pode ser um desafio. Estratégias úteis incluem consumir alimentos ricos em fibras e proteínas, beber água antes das refeições, praticar alimentação consciente e garantir sono adequado. Também é importante distinguir entre fome física e emocional.";
    } else if (userMessage.toLowerCase().includes("motivação") || userMessage.toLowerCase().includes("desistir")) {
      responseText = "Manter a motivação é fundamental! Estabeleça metas pequenas e alcançáveis, celebre seus sucessos, encontre um parceiro de responsabilidade e lembre-se do porquê você começou esta jornada. Também é útil se concentrar nos benefícios não relacionados ao peso, como ter mais energia, melhor humor e saúde geral aprimorada.";
    } else {
      // Default to a random response if no keywords match
      const randomIndex = Math.floor(Math.random() * nutritionResponses.length);
      responseText = nutritionResponses[randomIndex];
    }
    
    return responseText;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate AI response
      const responseText = await generateResponse(input);
      
      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "ai" as const,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Ocorreu um erro ao gerar a resposta. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 animate-slide-in",
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar>
                {message.sender === "user" ? (
                  <User className="h-6 w-6" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                    N
                  </div>
                )}
              </Avatar>
              
              <Card 
                className={cn(
                  "py-3 px-4",
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div 
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "user" 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar>
                <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                  N
                </div>
              </Avatar>
              
              <Card className="py-3 px-4 bg-secondary">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Pensando...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Pergunte algo sobre nutrição..."
              className="min-h-[60px] resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
