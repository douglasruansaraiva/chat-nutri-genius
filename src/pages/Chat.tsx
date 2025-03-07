
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import BMIChart from '@/components/BMIChart';
import { calculateBMI, getBMICategory, getIdealWeightRange } from '@/utils/nutritionUtils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  chart?: boolean;
}

interface ChatProps {
  isPopup?: boolean;
}

const Chat: React.FC<ChatProps> = ({ isPopup = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    height: 0,
    weight: 0,
    goal: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const QUESTIONS = [
    "Olá! Eu sou o NutriGênio, seu assistente virtual de nutrição. Qual é o seu nome?",
    "Prazer em conhecer você! Para calcular seu IMC, preciso saber sua altura em centímetros (ex: 170).",
    "Agora, por favor me informe seu peso em quilogramas (ex: 70).",
    "Qual é seu objetivo? (Perder peso, Ganhar massa, Manter peso)"
  ];

  // Initialize chat with first question
  useEffect(() => {
    if (messages.length === 0) {
      setIsBotTyping(true);
      setTimeout(() => {
        addBotMessage(QUESTIONS[0]);
        setIsBotTyping(false);
      }, 1000);
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process user input based on current step
  const processInput = (input: string) => {
    addUserMessage(input);
    setIsBotTyping(true);
    
    setTimeout(() => {
      switch (currentStep) {
        case 0: // Name
          setUserData({ ...userData, name: input });
          addBotMessage(QUESTIONS[1]);
          setCurrentStep(1);
          break;
        case 1: // Height
          const height = parseFloat(input);
          if (isNaN(height)) {
            addBotMessage("Por favor, insira um número válido para sua altura em centímetros.");
          } else {
            setUserData({ ...userData, height });
            addBotMessage(QUESTIONS[2]);
            setCurrentStep(2);
          }
          break;
        case 2: // Weight
          const weight = parseFloat(input);
          if (isNaN(weight)) {
            addBotMessage("Por favor, insira um número válido para seu peso em quilogramas.");
          } else {
            setUserData({ ...userData, weight });
            // Add chart after weight is provided
            setTimeout(() => {
              addBotMessage("", true); // Add chart message
            }, 500);
            setTimeout(() => {
              // Calculate BMI and provide feedback
              const bmi = calculateBMI(userData.height, weight);
              const bmiCategory = getBMICategory(bmi);
              const idealRange = getIdealWeightRange(userData.height);
              
              addBotMessage(`Seu IMC é ${bmi.toFixed(1)}, o que é classificado como "${bmiCategory}". Considerando sua altura de ${userData.height}cm, seu peso ideal estaria entre ${idealRange.min}kg e ${idealRange.max}kg.`);
              addBotMessage(QUESTIONS[3]);
              setCurrentStep(3);
            }, 2000);
          }
          break;
        case 3: // Goal
          setUserData({ ...userData, goal: input });
          const goalLower = input.toLowerCase();
          let response = `Obrigado ${userData.name}! `;
          
          if (goalLower.includes("perd")) {
            response += "Para perder peso de forma saudável, recomendo um déficit calórico moderado de 300-500 calorias por dia, combinando alimentação equilibrada e exercícios regulares.";
          } else if (goalLower.includes("ganh") || goalLower.includes("mass")) {
            response += "Para ganhar massa muscular, foque em um superávit calórico moderado, consumo adequado de proteínas (1.6-2.2g/kg) e treinamento de força consistente.";
          } else {
            response += "Para manter seu peso atual, procure equilibrar o consumo calórico com seu gasto energético diário e mantenha hábitos alimentares saudáveis.";
          }
          
          addBotMessage(response);
          setCurrentStep(4);
          break;
        default:
          // General chat after initial questionnaire
          setTimeout(() => {
            let response = "Estou aqui para ajudar com suas dúvidas sobre nutrição! Se tiver alguma pergunta específica sobre alimentação saudável, receitas ou dicas, é só perguntar.";
            addBotMessage(response);
          }, 1000);
      }
      setIsBotTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const addBotMessage = (content: string, chart: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      chart
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isBotTyping) {
      processInput(inputValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Use a different container based on whether it's a popup or full page
  const Container = isPopup 
    ? ({ children }: { children: React.ReactNode }) => <div className="h-full">{children}</div> 
    : ({ children }: { children: React.ReactNode }) => <DashboardLayout>{children}</DashboardLayout>;

  return (
    <Container>
      <div className="flex flex-col h-full bg-[#0a1014]">
        {/* Chat Header */}
        <div className="bg-[#075E54] text-white p-3 flex items-center shadow-md">
          {!isPopup && (
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="NutriGênio" />
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">NutriGênio</h2>
              <p className="text-xs opacity-80">
                {isBotTyping ? 'Digitando...' : 'Online'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ 
            backgroundImage: "url('https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png')",
            backgroundSize: "contain"
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] relative ${
                  message.sender === 'user'
                    ? 'bg-[#DCF8C6] text-black ml-auto'
                    : 'bg-white text-black'
                }`}
                style={{
                  borderRadius: message.sender === 'user' ? '15px 0 15px 15px' : '0 15px 15px 15px'
                }}
              >
                {message.chart ? (
                  <div className="p-2 bg-white rounded-lg">
                    <BMIChart height={userData.height} weight={userData.weight} />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                <span className="text-[10px] opacity-70 text-right block mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-[80%] flex space-x-1 items-center"
                   style={{ borderRadius: '0 15px 15px 15px' }}>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 bg-[#1F2C33] flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite uma mensagem"
            className="flex-1 bg-[#2A3942] border-0 text-white placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim() || isBotTyping}
            className="rounded-full bg-[#075E54] hover:bg-[#054C44]"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Chat;
