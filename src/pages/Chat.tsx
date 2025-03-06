
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Send, Mic, User } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { calculateBMI, getBMICategory, calculateIdealWeightRange, suggestWeightGoal } from "@/utils/nutritionUtils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type AssessmentStage = 
  | "initial" 
  | "ask_name" 
  | "ask_height" 
  | "ask_weight" 
  | "ask_goal" 
  | "completed";

type UserProfile = {
  name: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  weightGoal: number | null;
  fitnessGoal: "lose" | "maintain" | "gain" | null;
};

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Olá! Sou a NutriGênio, sua nutricionista virtual. Gostaria de fazer algumas perguntas para entender melhor seus objetivos e calcular seu IMC. Podemos começar?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState<AssessmentStage>("initial");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    height: null,
    weight: null,
    bmi: null,
    weightGoal: null,
    fitnessGoal: null,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Effect to handle assessment flow
  useEffect(() => {
    if (assessmentStage === "initial") {
      // Wait for user confirmation to start
      return;
    }
    
    const askNextQuestion = () => {
      setIsTyping(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        let questionMessage: Message;
        
        switch (assessmentStage) {
          case "ask_name":
            questionMessage = {
              id: Date.now().toString(),
              content: "Para começarmos, como posso te chamar?",
              sender: "ai",
              timestamp: new Date()
            };
            break;
          
          case "ask_height":
            questionMessage = {
              id: Date.now().toString(),
              content: `Prazer em conhecê-lo, ${userProfile.name}! Qual é a sua altura em centímetros? (Por exemplo: 170)`,
              sender: "ai",
              timestamp: new Date()
            };
            break;
            
          case "ask_weight":
            questionMessage = {
              id: Date.now().toString(),
              content: "Obrigada! E qual é o seu peso atual em quilogramas?",
              sender: "ai",
              timestamp: new Date()
            };
            break;
            
          case "ask_goal":
            const bmi = calculateBMI(userProfile.weight!, userProfile.height!);
            const bmiCategory = getBMICategory(bmi);
            const { min, max } = calculateIdealWeightRange(userProfile.height!);
            
            questionMessage = {
              id: Date.now().toString(),
              content: `Obrigada pelas informações! Seu IMC é ${bmi}, classificado como "${bmiCategory}". 
              
Para sua altura, o peso ideal estaria entre ${min}kg e ${max}kg.
              
Qual é o seu objetivo principal? Responda com:
1 - Perder peso
2 - Manter peso
3 - Ganhar peso`,
              sender: "ai",
              timestamp: new Date()
            };
            
            // Update BMI in profile
            setUserProfile(prev => ({
              ...prev,
              bmi: bmi
            }));
            break;
            
          case "completed":
            let goalMessage = "";
            let suggestedGoal = 0;
            
            if (userProfile.fitnessGoal === "lose") {
              suggestedGoal = suggestWeightGoal(userProfile.weight!, userProfile.height!);
              goalMessage = userProfile.bmi! <= 24.9 
                ? `Seu peso já está na faixa ideal, mas se deseja perder um pouco mais, um objetivo saudável seria chegar a ${suggestedGoal}kg.` 
                : `Um objetivo saudável seria chegar a ${suggestedGoal}kg, o que colocaria seu IMC na faixa ideal.`;
            } else if (userProfile.fitnessGoal === "gain") {
              suggestedGoal = userProfile.bmi! >= 18.5 
                ? userProfile.weight! + 2 
                : calculateIdealWeightRange(userProfile.height!).min;
              goalMessage = userProfile.bmi! >= 18.5 
                ? `Seu peso já está na faixa ideal, mas para ganhar massa, um objetivo inicial poderia ser ${suggestedGoal}kg.` 
                : `Um objetivo saudável seria chegar a ${suggestedGoal}kg, o que colocaria seu IMC na faixa ideal.`;
            } else {
              goalMessage = userProfile.bmi! >= 18.5 && userProfile.bmi! <= 24.9 
                ? "Seu peso atual já está na faixa ideal. Vamos trabalhar para manter essa conquista!" 
                : `Para manter um peso saudável, o ideal seria estar entre ${calculateIdealWeightRange(userProfile.height!).min}kg e ${calculateIdealWeightRange(userProfile.height!).max}kg.`;
            }
            
            // Update weight goal
            setUserProfile(prev => ({
              ...prev,
              weightGoal: suggestedGoal
            }));
            
            questionMessage = {
              id: Date.now().toString(),
              content: `Perfeito, ${userProfile.name}!
              
Resumo do seu perfil:
- Altura: ${userProfile.height}cm
- Peso atual: ${userProfile.weight}kg
- IMC: ${userProfile.bmi} (${getBMICategory(userProfile.bmi!)})
              
${goalMessage}
              
Agora posso te ajudar com recomendações nutricionais personalizadas para atingir seu objetivo. O que gostaria de saber primeiro? Pode me perguntar sobre planos alimentares, dicas de alimentos específicos ou estratégias para alcançar sua meta.`,
              sender: "ai",
              timestamp: new Date()
            };
            break;
            
          default:
            return;
        }
        
        setMessages(prev => [...prev, questionMessage]);
        setIsTyping(false);
      }, 1500);
    };
    
    askNextQuestion();
  }, [assessmentStage, userProfile.name, userProfile.height, userProfile.weight, userProfile.bmi, userProfile.fitnessGoal]);

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
    
    // Process user response based on current assessment stage
    if (assessmentStage === "initial") {
      // User agrees to start assessment
      setAssessmentStage("ask_name");
    } else if (assessmentStage === "ask_name") {
      // Store user name
      setUserProfile(prev => ({
        ...prev,
        name: input.trim()
      }));
      setAssessmentStage("ask_height");
    } else if (assessmentStage === "ask_height") {
      // Store height
      const height = parseFloat(input.trim());
      if (!isNaN(height) && height > 0) {
        setUserProfile(prev => ({
          ...prev,
          height: height
        }));
        setAssessmentStage("ask_weight");
      } else {
        // Invalid height, ask again
        setIsTyping(true);
        setTimeout(() => {
          const errorMessage: Message = {
            id: Date.now().toString(),
            content: "Por favor, informe uma altura válida em centímetros (por exemplo: 170).",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 1000);
      }
    } else if (assessmentStage === "ask_weight") {
      // Store weight
      const weight = parseFloat(input.trim());
      if (!isNaN(weight) && weight > 0) {
        setUserProfile(prev => ({
          ...prev,
          weight: weight
        }));
        setAssessmentStage("ask_goal");
      } else {
        // Invalid weight, ask again
        setIsTyping(true);
        setTimeout(() => {
          const errorMessage: Message = {
            id: Date.now().toString(),
            content: "Por favor, informe um peso válido em quilogramas (por exemplo: 70).",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 1000);
      }
    } else if (assessmentStage === "ask_goal") {
      // Store goal
      let goal: "lose" | "maintain" | "gain" | null = null;
      
      if (input.includes("1") || input.toLowerCase().includes("perder")) {
        goal = "lose";
      } else if (input.includes("2") || input.toLowerCase().includes("manter")) {
        goal = "maintain";
      } else if (input.includes("3") || input.toLowerCase().includes("ganhar")) {
        goal = "gain";
      }
      
      if (goal) {
        setUserProfile(prev => ({
          ...prev,
          fitnessGoal: goal
        }));
        setAssessmentStage("completed");
      } else {
        // Invalid goal, ask again
        setIsTyping(true);
        setTimeout(() => {
          const errorMessage: Message = {
            id: Date.now().toString(),
            content: "Por favor, escolha um objetivo válido (1 - Perder peso, 2 - Manter peso, 3 - Ganhar peso).",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }, 1000);
      }
    } else {
      // Assessment completed, regular chat mode
      setIsTyping(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        generateAIResponse(input);
      }, 1500);
    }
  };

  const generateAIResponse = (userInput: string) => {
    // Enhanced nutrition-focused responses
    const responses = [
      `Baseado no seu IMC de ${userProfile.bmi} e seu objetivo de ${userProfile.fitnessGoal === "lose" ? "perda de peso" : userProfile.fitnessGoal === "gain" ? "ganho de peso" : "manutenção"}, recomendo aumentar a ingestão de proteínas magras e vegetais de folhas verdes.`,
      
      `Para alcançar seu peso meta de ${userProfile.weightGoal}kg, é importante criar um plano alimentar equilibrado com porções controladas e refeições em horários regulares.`,
      
      `A hidratação adequada é fundamental para um metabolismo saudável. Considerando seu perfil, tente consumir pelo menos 2 litros de água diariamente.`,
      
      `Para atingir seus objetivos, considere incorporar mais alimentos ricos em fibras, como grãos integrais, frutas e legumes. Isso ajudará no controle do apetite.`,
      
      `Suas refeições balanceadas devem incluir proteínas, carboidratos complexos e gorduras saudáveis para fornecer todos os nutrientes necessários para atingir sua meta de ${userProfile.fitnessGoal === "lose" ? "perda" : userProfile.fitnessGoal === "gain" ? "ganho" : "manutenção"} de peso.`,
      
      `Com seu IMC atual de ${userProfile.bmi}, tente evitar alimentos ultra-processados e opte por alternativas naturais sempre que possível.`,
      
      `Uma estratégia eficaz para alcançar seu peso meta de ${userProfile.weightGoal}kg seria incluir uma fonte de proteína em cada refeição e controlar as porções de carboidratos.`,
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
