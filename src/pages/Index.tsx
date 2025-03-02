
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { ArrowRight, MessageSquare, LineChart, Calendar, User, Check, BarChart, TrendingUp, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageSquare,
    title: "Consulta Nutricional por IA",
    description: "Tire dúvidas e obtenha conselhos personalizados sobre nutrição a qualquer momento.",
  },
  {
    icon: LineChart,
    title: "Acompanhamento de Progresso",
    description: "Monitore seu peso e outras métricas importantes para manter seu foco nos objetivos.",
  },
  {
    icon: Calendar,
    title: "Planos Alimentares",
    description: "Receba planos alimentares adaptados às suas necessidades e preferências.",
  },
  {
    icon: User,
    title: "Perfil Personalizado",
    description: "Configure seu perfil com seus objetivos, preferências e restrições alimentares.",
  },
];

const testimonials = [
  {
    name: "Ana Silva",
    role: "Perdeu 10kg em 3 meses",
    content: "O NutriGênio transformou minha relação com a alimentação. As dicas são práticas e realmente funcionam!",
  },
  {
    name: "Carlos Oliveira",
    role: "Melhorou hábitos alimentares",
    content: "Consegui manter o foco nos meus objetivos graças às ferramentas de acompanhamento. Agora me sinto muito mais saudável.",
  },
  {
    name: "Mariana Santos",
    role: "Atleta amadora",
    content: "O assistente de IA me ajudou a otimizar minha nutrição para melhorar meu desempenho esportivo. Resultados incríveis!",
  },
];

// Enhanced data for animated graph
const resultData = [
  { month: "Jan", weight: 80, calories: 2600, active: false },
  { month: "Fev", weight: 78, calories: 2500, active: false },
  { month: "Mar", weight: 75, calories: 2400, active: false },
  { month: "Abr", weight: 73, calories: 2300, active: false },
  { month: "Mai", weight: 70, calories: 2200, active: false },
  { month: "Jun", weight: 68, calories: 2100, active: false },
];

const Index = () => {
  const [activeDataIndex, setActiveDataIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Modificação do primeiro useEffect para evitar rolagem automática após carregamento inicial
  useEffect(() => {
    // Apenas rola para o topo na primeira vez que a página é carregada
    if (!initialLoadDone) {
      window.scrollTo(0, 0);
      setInitialLoadDone(true);
      // Inicia a animação do gráfico
      setIsAnimating(true);
    }
    
    // Animation interval for graph bars
    const animationInterval = setInterval(() => {
      setActiveDataIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex >= resultData.length) {
          clearInterval(animationInterval);
          setTimeout(() => {
            // Reset animation after a few seconds
            setActiveDataIndex(-1);
            setIsAnimating(false);
            setTimeout(() => setIsAnimating(true), 500);
          }, 2000);
          return -1;
        }
        return newIndex;
      });
    }, 600);
    
    return () => clearInterval(animationInterval);
  }, [isAnimating, initialLoadDone]);

  // Update active state in data based on activeDataIndex
  useEffect(() => {
    if (activeDataIndex >= 0 && activeDataIndex < resultData.length) {
      resultData.forEach((item, index) => {
        resultData[index].active = index <= activeDataIndex;
      });
    }
  }, [activeDataIndex]);

  return (
    <MainLayout>
      {/* Hero Section with 3D-like Elements */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-[100px] transform rotate-6"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-tr-[80px] transform -rotate-12"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Star className="mr-1 h-4 w-4" /> <span>Nutrição Inteligente</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
                Seu assistente de nutrição <span className="text-primary">personalizado</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-in" style={{ animationDelay: "0.1s" }}>
                O NutriGênio combina inteligência artificial com conhecimento nutricional para 
                ajudar você a alcançar seus objetivos de saúde com foco e consistência.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <Button asChild size="lg" className="px-8 relative overflow-hidden group">
                  <Link to="/pricing">
                    Começar Agora
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/pricing">Saiba Mais</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative z-10 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Frutas e vegetais saudáveis" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay"></div>
              </div>
              
              {/* Floating elements - Adjusted size and position to prevent overlap */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-nutrition-300 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-nutrition-700 rounded-full shadow-lg flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Visualization Section - Enhanced with animations */}
      <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Resultados Reais
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-nutrition-700 to-nutrition-300 transform scale-x-0 transition-transform duration-500 origin-left animate-scale-x"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja como nossos usuários transformam seus corpos e hábitos com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-700 hover:shadow-2xl perspective-1000 group">
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <LineChart className="mr-2 h-5 w-5" />
                Perda de Peso Consistente
              </h3>
              
              {/* Animated Chart Visualization */}
              <div className="relative h-64 w-full overflow-hidden bg-white rounded-lg p-4">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted"></div>
                <div className="absolute left-0 bottom-0 top-0 w-1 bg-muted"></div>
                
                <div className="flex justify-between items-end h-full relative z-10">
                  {resultData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center relative group cursor-pointer" 
                         onMouseEnter={() => !isAnimating && setActiveDataIndex(index)}>
                      <div 
                        className={cn(
                          "w-10 rounded-t-lg transition-all duration-700 ease-out flex justify-center items-end overflow-hidden",
                          item.active || activeDataIndex === -1 ? "bg-gradient-to-t from-nutrition-700 to-nutrition-500" : "bg-gray-200"
                        )}
                        style={{ 
                          height: item.active || activeDataIndex === -1 ? `${((80 - item.weight) / 15) * 100}%` : "0%",
                          transitionDelay: `${index * 0.1}s`
                        }}
                      >
                        <span className="text-white text-xs font-bold mb-1">{item.weight}kg</span>
                      </div>
                      <span className="text-xs mt-2 font-medium">{item.month}</span>
                      
                      {/* Tooltip on hover */}
                      <div className={cn(
                        "absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg transition-all duration-300 z-20",
                        "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                        "w-32 text-center"
                      )}>
                        <p className="text-xs font-bold">{item.month}</p>
                        <p className="text-xs text-nutrition-700">Peso: {item.weight}kg</p>
                        <p className="text-xs text-muted-foreground">Calorias: {item.calories}</p>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground pointer-events-none">
                  <span>60kg</span>
                  <span>70kg</span>
                  <span>80kg</span>
                </div>
                
                {/* Animated trend line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ padding: "20px 0" }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1a811a" />
                      <stop offset="100%" stopColor="#80b980" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`M 20,${220 - ((80 - 80) / 15) * 170} 
                        L ${20 + (1 * 60)},${220 - ((80 - 78) / 15) * 170} 
                        L ${20 + (2 * 60)},${220 - ((80 - 75) / 15) * 170} 
                        L ${20 + (3 * 60)},${220 - ((80 - 73) / 15) * 170} 
                        L ${20 + (4 * 60)},${220 - ((80 - 70) / 15) * 170} 
                        L ${20 + (5 * 60)},${220 - ((80 - 68) / 15) * 170}`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    strokeDashoffset={isAnimating ? "0" : "500"}
                    className="transition-all duration-1500 ease-out"
                  />
                  {resultData.map((item, index) => (
                    <circle 
                      key={index}
                      cx={20 + (index * 60)} 
                      cy={220 - ((80 - item.weight) / 15) * 170}
                      r="4"
                      fill={item.active || activeDataIndex === -1 ? "#1a811a" : "#cccccc"}
                      className="transition-all duration-300"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </svg>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">Média de perda de peso dos usuários em 6 meses</p>
                <button 
                  onClick={() => {setIsAnimating(false); setTimeout(() => setIsAnimating(true), 300);}}
                  className="mt-2 text-xs text-nutrition-700 hover:underline flex items-center justify-center mx-auto"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Replay animação
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-100 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-nutrition-300 to-nutrition-700 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <Award className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nutrition-800 to-nutrition-600 animate-pulse" style={{ animationDuration: "3s" }}>93%</h3>
                        <div className="w-16 h-6 ml-2 bg-nutrition-100 rounded-full overflow-hidden">
                          <div className="h-full w-[93%] bg-gradient-to-r from-nutrition-700 to-nutrition-500 transform -translate-x-full animate-slide-in" style={{ animationDuration: "1.5s", animationFillMode: "forwards", animationDelay: "0.5s" }}></div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">dos usuários relatam melhora nos hábitos alimentares</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-100 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-nutrition-300 to-nutrition-700 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <TrendingUp className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nutrition-800 to-nutrition-600 animate-pulse" style={{ animationDuration: "3s" }}>78%</h3>
                        <div className="w-16 h-6 ml-2 bg-nutrition-100 rounded-full overflow-hidden">
                          <div className="h-full w-[78%] bg-gradient-to-r from-nutrition-700 to-nutrition-500 transform -translate-x-full animate-slide-in" style={{ animationDuration: "1.5s", animationFillMode: "forwards", animationDelay: "0.7s" }}></div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">atingem seus objetivos de saúde em menos de 6 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-100 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-nutrition-300 to-nutrition-700 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <User className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nutrition-800 to-nutrition-600 animate-pulse" style={{ animationDuration: "3s" }}>12,000+</h3>
                      </div>
                      <p className="text-muted-foreground">usuários ativos em nossa plataforma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section with Enhanced 3D Cards */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Como o NutriGênio pode te ajudar
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-nutrition-700 to-nutrition-300 transform scale-x-0 transition-transform duration-500 origin-left animate-scale-x"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas poderosas para apoiar sua jornada de saúde e bem-estar.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-border overflow-hidden group perspective-1000 transition-all duration-500 hover:shadow-xl relative"
              >
                <CardContent className="p-6 relative z-10">
                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-nutrition-100 to-nutrition-300 flex items-center justify-center mb-4 shadow-md transform transition-all duration-300 group-hover:rotate-y-180 group-hover:scale-110">
                    <feature.icon className="h-7 w-7 text-nutrition-800 drop-shadow-sm" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 relative inline-block">
                    {feature.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nutrition-700 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                {/* Background decorative elements - Reduced size and repositioned */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-nutrition-50 rounded-bl-[30px] transform rotate-12 -z-0 opacity-50 group-hover:rotate-45 group-hover:scale-125 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-nutrition-100 rounded-tr-[25px] transform -rotate-12 -z-0 opacity-40 group-hover:rotate-45 group-hover:scale-125 transition-all duration-700"></div>
                
                {/* Add fruit images as decorative elements */}
                {index === 0 && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img 
                      src="https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Fruta" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img 
                      src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Fruta" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img 
                      src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Fruta" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {index === 3 && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img 
                      src="https://images.unsplash.com/photo-1591287083773-9a5d8623a55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Fruta" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works with Visual Timeline - Enhanced with animations */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transforme seus hábitos alimentares em poucos passos simples.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Crie sua conta</h3>
                <p className="text-muted-foreground">
                  Registre-se e personalize seu perfil com suas informações, objetivos e preferências alimentares.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1578758837674-93ed0ab5fbab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Frutas variadas e coloridas" 
                  className="mt-4 rounded-lg shadow-md w-full h-32 object-cover"
                />
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Converse com o NutriGênio</h3>
                <p className="text-muted-foreground">
                  Tire suas dúvidas sobre nutrição e receba recomendações personalizadas em tempo real.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pessoa com frutas e vegetais" 
                  className="mt-4 rounded-lg shadow-md w-full h-32 object-cover"
                />
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Acompanhe seu progresso</h3>
                <p className="text-muted-foreground">
                  Utilize nossas ferramentas para monitorar seu progresso e manter o foco nos seus objetivos.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Frutas e vegetais numa mesa" 
                  className="mt-4 rounded-lg shadow-md w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="relative overflow-hidden group">
              <Link to="/pricing">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials with Enhanced Visual Design */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              O que nossos usuários dizem
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-nutrition-700 to-nutrition-300 transform scale-x-0 transition-transform duration-500 origin-left animate-scale-x"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram suas vidas com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden transform transition-all duration-500 hover:shadow-xl perspective-1000 hover:rotate-y-5 group">
                <CardContent className="p-6 relative">
                  {/* Add fruit image as decorative element */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full z-0 opacity-20 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1490474418585-ba9bad8fd0ea' : index === 1 ? '1490885578174-acda8905c2c6' : '1457296898342-cba958b01f45'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                      alt="Decoração de frutas" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="inline-block h-5 w-5 text-yellow-500 fill-current transform transition-transform duration-300 hover:scale-125" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <span className="text-6xl text-nutrition-700 opacity-20 absolute -top-6 -left-2">"</span>
                    <p className="mb-6 text-muted-foreground relative z-10">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-12 w-12 rounded-full bg-nutrition-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-nutrition-700" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
