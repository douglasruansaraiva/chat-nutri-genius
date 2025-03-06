
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, MessageSquare, LineChart, Goal, Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [aiCredits, setAiCredits] = useState(5); // Free plan users get 5 credits per day
  
  const handleStartChat = () => {
    if (aiCredits > 0) {
      // In a real app, this would navigate to the chat page
      navigate("/chat");
      setAiCredits(prev => prev - 1);
    } else {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite diário de consultas. Considere fazer upgrade para o plano Premium.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header with Welcome and Profile */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Olá, Usuário</h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Bem-vindo ao seu espaço nutrição personalizado
              </p>
            </div>
            
            <Card className="w-full md:w-auto">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Plano Gratuito</CardTitle>
                <CardDescription>Consultas com IA restantes hoje</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{aiCredits}/5</span>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Melhore seu plano",
                        description: "Acesse recursos ilimitados com nosso plano Premium.",
                        duration: 3000,
                      });
                      navigate("/pricing");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Fazer Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Featured Item - Chat with Nutritionist */}
          <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row p-6 gap-6">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Consultoria Nutricional Personalizada</h2>
                <p className="text-white/80 max-w-xl">
                  Converse com nossa nutricionista IA e receba orientações personalizadas para sua alimentação e estilo de vida.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button onClick={handleStartChat} size="lg" className="gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Iniciar Consulta
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Info className="h-5 w-5" />
                    Saiba Mais
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/30 flex items-center justify-center">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Rows */}
          <h2 className="text-2xl font-bold mt-4">Programas Recomendados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program Cards */}
            {programs.map((program, index) => (
              <Card key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden w-full pt-[56.25%]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${program.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="outline" className="rounded-full bg-primary/20 border-primary">
                      <Play className="h-6 w-6 text-white" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-1">{program.title}</h3>
                  <p className="text-white/70 text-sm">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mt-4">Ferramentas de Acompanhamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Acompanhe seu Progresso</CardTitle>
                <CardDescription>
                  Visualize e monitore sua evolução ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-48 w-full bg-black/30 rounded-lg flex items-center justify-center">
                  <p className="text-white/60">Gráfico de progresso estará disponível após você registrar suas medidas</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Progresso
                </Button>
              </CardFooter>
            </Card>
            
            {/* Goals */}
            <Card>
              <CardHeader>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Goal className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Defina suas Metas</CardTitle>
                <CardDescription>
                  Estabeleça objetivos claros para sua jornada nutricional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Meta de Peso</h4>
                      <p className="text-sm text-white/70">Perder 5kg em 3 meses</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                      <span className="text-lg font-bold">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Meta de Água</h4>
                      <p className="text-sm text-white/70">2L por dia</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                      <span className="text-lg font-bold">65%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Gerenciar Metas
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* My Dietary Plan */}
          <h2 className="text-2xl font-bold mt-4">Meu Plano Alimentar</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Refeições Recomendadas</h3>
                <Button variant="outline" size="sm">Personalizar</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {meals.map((meal, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-black/40">
                    <div 
                      className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${meal.image})` }}
                    ></div>
                    <div>
                      <h4 className="font-medium">{meal.name}</h4>
                      <p className="text-sm text-white/70">{meal.timing}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">{meal.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

// Sample data for programs
const programs = [
  {
    title: "Nutrição para Iniciantes",
    description: "Aprenda os fundamentos da alimentação saudável",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Dieta Mediterrânea",
    description: "Descubra os benefícios deste estilo alimentar",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Receitas Low Carb",
    description: "Pratos deliciosos com baixo teor de carboidratos",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=600&auto=format&fit=crop"
  }
];

// Sample data for meals
const meals = [
  {
    name: "Smoothie de Frutas",
    timing: "Café da manhã",
    calories: "320",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Salada de Quinoa",
    timing: "Almoço",
    calories: "450",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Frango Grelhado",
    timing: "Jantar",
    calories: "380",
    image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Iogurte com Granola",
    timing: "Lanche",
    calories: "220",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Mix de Castanhas",
    timing: "Lanche",
    calories: "180",
    image: "https://images.unsplash.com/photo-1604542031658-5799ca5d7936?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Omelete de Legumes",
    timing: "Café da manhã",
    calories: "280",
    image: "https://images.unsplash.com/photo-1594614271360-0ed3811159a2?q=80&w=200&auto=format&fit=crop"
  }
];

export default Dashboard;

