
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Send, Mic, Check } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { calculateBMI, getBMICategory, calculateIdealWeightRange, suggestWeightGoal } from "@/utils/nutritionUtils";
import BMIChart from "@/components/BMIChart";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  chart?: boolean;
  status?: "sent" | "delivered" | "read";
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
      status: "read"
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (assessmentStage === "initial") {
      return;
    }
    
    const askNextQuestion = () => {
      setIsTyping(true);
      
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
            
            const chartMessage: Message = {
              id: Date.now().toString() + "-chart",
              content: "",
              sender: "ai",
              timestamp: new Date(),
              chart: true
            };
            
            setMessages(prev => [...prev, chartMessage]);
            
            setTimeout(() => {
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
              
              setUserProfile(prev => ({
                ...prev,
                bmi: bmi
              }));
              
              setMessages(prev => [...prev, questionMessage]);
            }, 500);
            return;
            
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
            
            const summaryChartMessage: Message = {
              id: Date.now().toString() + "-summary-chart",
              content: "",
              sender: "ai",
              timestamp: new Date(),
              chart: true
            };
            
            setMessages(prev => [...prev, summaryChartMessage]);
            
            setTimeout(() => {
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
              
              setUserProfile(prev => ({
                ...prev,
                weightGoal: suggestedGoal
              }));
              
              setMessages(prev => [...prev, questionMessage]);
              setIsTyping(false);
            }, 500);
            return;
            
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

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    if (assessmentStage === "initial") {
      setAssessmentStage("ask_name");
    } else if (assessmentStage === "ask_name") {
      setUserProfile(prev => ({
        ...prev,
        name: input.trim()
      }));
      setAssessmentStage("ask_height");
    } else if (assessmentStage === "ask_height") {
      const height = parseFloat(input.trim());
      if (!isNaN(height) && height > 0) {
        setUserProfile(prev => ({
          ...prev,
          height: height
        }));
        setAssessmentStage("ask_weight");
      } else {
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
      const weight = parseFloat(input.trim());
      if (!isNaN(weight) && weight > 0) {
        setUserProfile(prev => ({
          ...prev,
          weight: weight
        }));
        setAssessmentStage("ask_goal");
      } else {
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
      setIsTyping(true);
      
      setTimeout(() => {
        generateAIResponse(input);
      }, 1500);
    }
  };

  const generateAIResponse = (userInput: string) => {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-0 sm:px-4 py-0 sm:py-8 flex flex-col h-[calc(100vh-5rem)]">
        <Card className="flex flex-col flex-1 overflow-hidden border-white/20 shadow-none rounded-none sm:rounded-xl bg-[#f0f2f5]">
          {/* WhatsApp-style header */}
          <div className="bg-nutrition-700 text-white p-3 flex items-center gap-3">
            <Avatar>
              <div className="bg-nutrition-500 h-full w-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">N</span>
              </div>
            </Avatar>
            <div>
              <h2 className="font-semibold">NutriGênio</h2>
              <p className="text-xs text-nutrition-100">Online agora</p>
            </div>
          </div>

          {/* Chat background with pattern */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e5ddd5] bg-opacity-90"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z" fill="%23cecece" fill-opacity="0.15" fill-rule="evenodd"/%3E%3C/svg%3E")',
              backgroundAttachment: 'fixed'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.chart ? (
                  <div className="max-w-[95%] w-full bg-white rounded-xl shadow-md p-2">
                    <BMIChart 
                      bmi={userProfile.bmi!} 
                      currentWeight={userProfile.weight!} 
                      idealWeightMin={calculateIdealWeightRange(userProfile.height!).min}
                      idealWeightMax={calculateIdealWeightRange(userProfile.height!).max}
                    />
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      message.sender === "user"
                        ? "bg-nutrition-100 text-gray-800 rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="p-1">{message.content}</p>
                    <div className="flex items-center justify-end gap-1 pt-1">
                      <p className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </p>
                      {message.sender === "user" && message.status && (
                        <span className="text-gray-500">
                          {message.status === "read" ? (
                            <Check className="h-3 w-3 text-nutrition-500" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-white text-gray-800 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* WhatsApp-style input */}
          <div className="bg-[#f0f2f5] p-2">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-10 w-10 text-[#128c7e]"
                onClick={handleVoiceInput}
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 bg-white rounded-full flex items-center overflow-hidden">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite uma mensagem"
                  className="bg-transparent flex-1 py-2 px-4 outline-none text-gray-800 resize-none max-h-32"
                  rows={1}
                  style={{ height: "auto" }}
                ></textarea>
              </div>
              
              <Button
                size="icon"
                className="rounded-full h-10 w-10 bg-nutrition-600 hover:bg-nutrition-700 text-white"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;
