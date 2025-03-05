import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { ArrowRight, MessageSquare, LineChart, Calendar, User, Check, BarChart, TrendingUp, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [{
  icon: MessageSquare,
  title: "Consulta Nutricional por IA",
  description: "Tire dúvidas e obtenha conselhos personalizados sobre nutrição a qualquer momento."
}, {
  icon: LineChart,
  title: "Acompanhamento de Progresso",
  description: "Monitore seu peso e outras métricas importantes para manter seu foco nos objetivos."
}, {
  icon: Calendar,
  title: "Planos Alimentares",
  description: "Receba planos alimentares adaptados às suas necessidades e preferências."
}, {
  icon: User,
  title: "Perfil Personalizado",
  description: "Configure seu perfil com seus objetivos, preferências e restrições alimentares."
}];

const testimonials = [{
  name: "Ana Silva",
  role: "Perdeu 10kg em 3 meses",
  content: "O NutriGênio transformou minha relação com a alimentação. As dicas são práticas e realmente funcionam!"
}, {
  name: "Carlos Oliveira",
  role: "Melhorou hábitos alimentares",
  content: "Consegui manter o foco nos meus objetivos graças às ferramentas de acompanhamento. Agora me sinto muito mais saudável."
}, {
  name: "Mariana Santos",
  role: "Atleta amadora",
  content: "O assistente de IA me ajudou a otimizar minha nutrição para melhorar meu desempenho esportivo. Resultados incríveis!"
}];

const resultData = [{
  month: "Jan",
  weight: 80,
  calories: 2600,
  active: false,
  color: "#E5DEFF"
}, {
  month: "Fev",
  weight: 78,
  calories: 2500,
  active: false,
  color: "#D3E4FD"
}, {
  month: "Mar",
  weight: 75,
  calories: 2400,
  active: false,
  color: "#FEC6A1"
}, {
  month: "Abr",
  weight: 73,
  calories: 2300,
  active: false,
  color: "#FDE1D3"
}, {
  month: "Mai",
  weight: 70,
  calories: 2200,
  active: false,
  color: "#F2FCE2"
}, {
  month: "Jun",
  weight: 68,
  calories: 2100,
  active: false,
  color: "#FEF7CD"
}];

const Index = () => {
  const [activeDataIndex, setActiveDataIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    if (!initialLoadDone) {
      window.scrollTo(0, 0);
      setInitialLoadDone(true);
      setIsAnimating(true);
    }

    const animationInterval = setInterval(() => {
      setActiveDataIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex >= resultData.length) {
          clearInterval(animationInterval);
          setTimeout(() => {
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

  useEffect(() => {
    if (activeDataIndex >= 0 && activeDataIndex < resultData.length) {
      resultData.forEach((item, index) => {
        resultData[index].active = index <= activeDataIndex;
      });
    }
  }, [activeDataIndex]);

  return <MainLayout>
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-[100px] transform rotate-6"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-tr-[80px] transform -rotate-12"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary/15 rounded-full animate-pulse" style={{
          animationDelay: "1s"
        }}></div>
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
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-in" style={{
              animationDelay: "0.1s"
            }}>
                O NutriGênio combina inteligência artificial com conhecimento nutricional para 
                ajudar você a alcançar seus objetivos de saúde com foco e consistência.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{
              animationDelay: "0.2s"
            }}>
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
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Frutas e vegetais saudáveis" className="w-full h-auto rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay"></div>
              </div>
              
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
      
      <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Resultados Reais
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-nutrition-700 to-nutrition-300 transform scale-x-0 transition-transform duration-500 origin-left animate-scale-x"></span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-50">
              Veja como nossos usuários transformam seus corpos e hábitos com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all duration-700 hover:shadow-2xl perspective-1000 group border border-white/10 hover:border-primary/30 text-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-zinc-50">
                <LineChart className="mr-2 h-5 w-5 text-primary" />
                Perda de Peso Consistente
              </h3>
              
              <div className="relative h-80 w-full overflow-hidden bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-zinc-400">Progresso de Peso (kg)</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                      <span className="text-xs text-zinc-400">Peso</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-nutrition-300/70 mr-1"></div>
                      <span className="text-xs text-zinc-400">Meta</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 right-0 top-16 bottom-8 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((_, i) => (
                    <div key={i} className="w-full h-px bg-white/10" />
                  ))}
                </div>
                
                <div className="absolute left-0 top-16 bottom-8 flex flex-col justify-between text-xs text-zinc-400 pointer-events-none">
                  <span>80kg</span>
                  <span>75kg</span>
                  <span>70kg</span>
                  <span>65kg</span>
                </div>
                
                <div className="absolute left-12 right-4 top-16 bottom-8">
                  <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="chartClip">
                        <path 
                          d={`M 0,${200 - (80 - 80) / 15 * 200} 
                            L ${60},${200 - (80 - 78) / 15 * 200} 
                            L ${120},${200 - (80 - 75) / 15 * 200} 
                            L ${180},${200 - (80 - 73) / 15 * 200} 
                            L ${240},${200 - (80 - 70) / 15 * 200} 
                            L ${300},${200 - (80 - 68) / 15 * 200}
                            L ${300},200 L 0,200 Z`}
                          className={isAnimating ? "animate-slide-in" : ""}
                          style={{ animationDuration: "1.5s" }}
                        />
                      </clipPath>
                    </defs>
                    
                    <line 
                      x1="0" y1={200 - (80 - 70) / 15 * 200} 
                      x2="300" y2={200 - (80 - 65) / 15 * 200}
                      stroke="#8B5CF6" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                      className="opacity-70" 
                    />
                    <text 
                      x="5" 
                      y={200 - (80 - 70) / 15 * 200 - 5} 
                      className="text-[8px] fill-nutrition-300"
                    >
                      Meta
                    </text>
                    
                    <path 
                      d={`M 0,${200 - (80 - 80) / 15 * 200} 
                        L ${60},${200 - (80 - 78) / 15 * 200} 
                        L ${120},${200 - (80 - 75) / 15 * 200} 
                        L ${180},${200 - (80 - 73) / 15 * 200} 
                        L ${240},${200 - (80 - 70) / 15 * 200} 
                        L ${300},${200 - (80 - 68) / 15 * 200}`}
                      fill="none" 
                      stroke="#0EA5E9" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="300"
                      strokeDashoffset={isAnimating ? "0" : "300"}
                      className="transition-all duration-1500 ease-out"
                    />
                    
                    <path 
                      d={`M 0,${200 - (80 - 80) / 15 * 200} 
                        L ${60},${200 - (80 - 78) / 15 * 200} 
                        L ${120},${200 - (80 - 75) / 15 * 200} 
                        L ${180},${200 - (80 - 73) / 15 * 200} 
                        L ${240},${200 - (80 - 70) / 15 * 200} 
                        L ${300},${200 - (80 - 68) / 15 * 200}`}
                      fill="url(#areaGradient)"
                      opacity={isAnimating ? "1" : "0"}
                      className="transition-opacity duration-1000"
                    />
                    
                    <g key={0} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={0} 
                        cy={200 - (80 - 80) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0s" }}
                      />
                      <circle 
                        cx={0} 
                        cy={200 - (80 - 80) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0s" }}
                      />
                    </g>
                    
                    <g key={1} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={60} 
                        cy={200 - (80 - 78) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.1s" }}
                      />
                      <circle 
                        cx={60} 
                        cy={200 - (80 - 78) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.1s" }}
                      />
                    </g>
                    
                    <g key={2} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={120} 
                        cy={200 - (80 - 75) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.2s" }}
                      />
                      <circle 
                        cx={120} 
                        cy={200 - (80 - 75) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.2s" }}
                      />
                    </g>
                    
                    <g key={3} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={180} 
                        cy={200 - (80 - 73) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.3s" }}
                      />
                      <circle 
                        cx={180} 
                        cy={200 - (80 - 73) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.3s" }}
                      />
                    </g>
                    
                    <g key={4} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={240} 
                        cy={200 - (80 - 70) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.4s" }}
                      />
                      <circle 
                        cx={240} 
                        cy={200 - (80 - 70) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.4s" }}
                      />
                    </g>
                    
                    <g key={5} className="transition-transform duration-300 hover:scale-125">
                      <circle 
                        cx={300} 
                        cy={200 - (80 - 68) / 15 * 200} 
                        r="6"
                        fill="#0EA5E9"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.5s" }}
                      />
                      <circle 
                        cx={300} 
                        cy={200 - (80 - 68) / 15 * 200} 
                        r="3"
                        fill="#fff"
                        className="transition-all duration-500"
                        style={{ transitionDelay: "0.5s" }}
                      />
                    </g>
                  </svg>
                </div>
                
                <div className="absolute left-12 right-4 bottom-0 flex justify-between text-xs text-zinc-400">
                  {resultData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span>{item.month}</span>
                    </div>
                  ))}
                </div>
                
                <div className="absolute left-12 right-4 top-16 bottom-8">
                  <div className="relative w-full h-full">
                    {resultData.map((item, index) => (
                      <div 
                        key={index} 
                        className="absolute"
                        style={{ 
                          left: `${index * 20}%`, 
                          top: `${((80 - item.weight) / 15) * 100}%`,
                          transform: "translate(-50%, -100%)"
                        }}
                      >
                        <div 
                          className={cn(
                            "absolute bottom-full mb-2 -left-14 w-28 bg-black p-2 rounded text-center text-xs transform scale-0 opacity-0 pointer-events-none transition-all duration-200",
                            activeDataIndex === index ? "scale-100 opacity-100" : ""
                          )}
                          style={{ transitionDelay: activeDataIndex === index ? "0.3s" : "0s" }}
                        >
                          <div className="font-semibold text-primary">{item.month}</div>
                          <div className="text-zinc-300">Peso: {item.weight}kg</div>
                          <div className="text-zinc-500">Cal: {item.calories}</div>
                          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-black transform rotate-45 -translate-x-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-zinc-400 text-sm">Média de perda de peso dos usuários em 6 meses</p>
                <button 
                  onClick={() => {
                    setIsAnimating(false);
                    setTimeout(() => setIsAnimating(true), 300);
                  }} 
                  className="mt-2 text-sm text-primary hover:text-primary/80 flex items-center justify-center mx-auto"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Replay animação
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Card className="relative overflow-hidden group bg-gradient-to-br from-nutrition-400 to-nutrition-600 text-white border-nutrition-400">
                <CardContent className="p-6 bg-zinc-950">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-300/40 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-white/80 to-nutrition-300 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <Award className="h-8 w-8 text-nutrition-700 drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold text-white animate-pulse" style={{
                        animationDuration: "3s"
                      }}>93%</h3>
                        <div className="w-16 h-6 ml-2 bg-nutrition-300/50 rounded-full overflow-hidden">
                          <div className="h-full w-[93%] bg-gradient-to-r from-white/80 to-nutrition-200 transform -translate-x-full animate-slide-in" style={{
                          animationDuration: "1.5s",
                          animationFillMode: "forwards",
                          animationDelay: "0.5s"
                        }}></div>
                        </div>
                      </div>
                      <p className="text-white/90">dos usuários relatam melhora nos hábitos alimentares</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden group bg-gradient-to-br from-nutrition-400 to-nutrition-600 text-white border-nutrition-400">
                <CardContent className="p-6 bg-zinc-950">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-300/40 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-white/80 to-nutrition-300 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <TrendingUp className="h-8 w-8 text-nutrition-700 drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold text-white animate-pulse" style={{
                        animationDuration: "3s"
                      }}>78%</h3>
                        <div className="w-16 h-6 ml-2 bg-nutrition-300/50 rounded-full overflow-hidden">
                          <div className="h-full w-[78%] bg-gradient-to-r from-white/80 to-nutrition-200 transform -translate-x-full animate-slide-in" style={{
                          animationDuration: "1.5s",
                          animationFillMode: "forwards",
                          animationDelay: "0.7s"
                        }}></div>
                        </div>
                      </div>
                      <p className="text-white/90">atingem seus objetivos de saúde em menos de 6 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden group bg-gradient-to-br from-nutrition-400 to-nutrition-600 text-white border-nutrition-400">
                <CardContent className="p-6 bg-zinc-950">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-nutrition-300/40 rounded-bl-[60px] transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></div>
                  
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-white/80 to-nutrition-300 flex items-center justify-center mr-4 shadow-md transform transition-transform group-hover:scale-110 duration-300">
                      <User className="h-8 w-8 text-nutrition-700 drop-shadow-sm" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 style={{
                        animationDuration: "3s"
                      }} className="text-2xl font-bold animate-pulse text-zinc-50">12,000+</h3>
                      </div>
                      <p className="text-zinc-50">usuários ativos em nossa plataforma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
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
            {features.map((feature, index) => <Card key={index} className="border-border overflow-hidden group perspective-1000 transition-all duration-500 hover:shadow-xl relative">
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
                <div className="absolute top-0 right-0 w-16 h-16 bg-nutrition-50 rounded-bl-[30px] transform rotate-12 -z-0 opacity-50 group-hover:rotate-45 group-hover:scale-125 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-nutrition-100 rounded-tr-[25px] transform -rotate-12 -z-0 opacity-40 group-hover:rotate-45 group-hover:scale-125 transition-all duration-700"></div>
                
                {index === 0 && <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img src="https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Fruta" className="w-full h-full object-cover" />
                  </div>}
                {index === 1 && <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img src="https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Fruta" className="w-full h-full object-cover" />
                  </div>}
                {index === 2 && <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Fruta" className="w-full h-full object-cover" />
                  </div>}
                {index === 3 && <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden opacity-80">
                    <img src="https://images.unsplash.com/photo-1591287083773-9a5d8623a55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Fruta" className="w-full h-full object-cover" />
                  </div>}
              </Card>)}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transforme seus hábitos alimentares em poucos passos simples.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative bg-zinc-950">
              <div className="text-center p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-zinc-900">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Crie sua conta</h3>
                <p className="text-muted-foreground">
                  Registre-se e personalize seu perfil com suas informações, objetivos e preferências alimentares.
                </p>
                <img src="https://images.unsplash.com/photo-1578758837674-93ed0ab5fbab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Frutas variadas e coloridas" className="mt-4 rounded-lg shadow-md w-full h-32 object-cover" />
              </div>
              
              <div className="text-center p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-zinc-900">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Converse com o NutriGênio</h3>
                <p className="text-muted-foreground">
                  Tire suas dúvidas sobre nutrição e receba recomendações personalizadas em tempo real.
                </p>
                <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pessoa com frutas e vegetais" className="mt-4 rounded-lg shadow-md w-full h-32 object-cover" />
              </div>
              
              <div className="text-center p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-zinc-900">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4 relative z-10">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Acompanhe seu progresso</h3>
                <p className="text-muted-foreground">
                  Utilize nossas ferramentas para monitorar seu progresso e manter o foco nos seus objetivos.
                </p>
                <img src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Frutas e vegetais numa mesa" className="mt-4 rounded-lg shadow-md w-full h-32 object-cover" />
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
            {testimonials.map((testimonial, index) => <Card key={index} className="overflow-hidden transform transition-all duration-500 hover:shadow-xl perspective-1000 hover:rotate-y-5 group">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full z-0 opacity-20 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${index === 0 ? '1490474418585-ba9bad8fd0ea' : index === 1 ? '1490885578174-acda8905c2c6' : '1457296898342-cba958b01f45'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt="Decoração de frutas" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => <Star key={i} className="inline-block h-5 w-5 text-yellow-500 fill-current transform transition-transform duration-300 hover:scale-125" />)}
                  </div>
                  
                  <blockquote className="relative mb-4 text-nutrition-800 font-medium text-lg bg-zinc-950">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-3 text-xl font-bold text-nutrition-800">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-50">{testimonial.name}</p>
                      <p className="text-xs text-zinc-50">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-br from-nutrition-700 to-nutrition-800 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar sua alimentação?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Comece sua jornada para uma vida mais saudável hoje mesmo com o NutriGênio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-nutrition-800 hover:bg-white/90">
              <Link to="/pricing">
                Experimentar Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/pricing">
                Ver Planos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>;
};

export default Index;
