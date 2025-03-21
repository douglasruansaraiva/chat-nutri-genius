import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import ChatPopup from "@/components/ChatPopup";
import { ArrowRight, MessageSquare, LineChart, Calendar, User, Check, BarChart, TrendingUp, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

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
  color: "#8B5CF6"
}, {
  month: "Fev",
  weight: 78,
  calories: 2500,
  active: false,
  color: "#D946EF"
}, {
  month: "Mar",
  weight: 75,
  calories: 2400,
  active: false,
  color: "#F97316"
}, {
  month: "Abr",
  weight: 73,
  calories: 2300,
  active: false,
  color: "#0EA5E9"
}, {
  month: "Mai",
  weight: 70,
  calories: 2200,
  active: false,
  color: "#10B981"
}, {
  month: "Jun",
  weight: 68,
  calories: 2100,
  active: false,
  color: "#FACC15"
}];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border-2 border-primary rounded-md p-3 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        <p className="text-primary font-bold text-lg">{label}</p>
        <p className="text-white font-semibold">Peso: {payload[0].value}kg</p>
        <p className="text-white/80">Calorias: {resultData.find(item => item.month === label)?.calories}</p>
      </div>
    );
  }

  return null;
};

const Index = () => {
  const [activeDataIndex, setActiveDataIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialLoadDone) {
      window.scrollTo(0, 0);
      setInitialLoadDone(true);
      setIsAnimating(true);
    }

    if (isAnimating) {
      setChartData([]);

      const timeout = setTimeout(() => {
        const animationInterval = setInterval(() => {
          setChartData(prevData => {
            if (prevData.length >= resultData.length) {
              clearInterval(animationInterval);
              return prevData;
            }
            return [...prevData, resultData[prevData.length]];
          });
        }, 500);
        
        return () => clearInterval(animationInterval);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, initialLoadDone]);

  useEffect(() => {
    const chatTimer = setTimeout(() => {
      setChatOpen(true);
    }, 5000);
    
    return () => clearTimeout(chatTimer);
  }, []);

  const restartAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 300);
  };

  const handleOpenChat = () => {
    navigate('/lead');
  };

  return <MainLayout>
      <div className="bg-gradient-to-b from-background to-muted">
        <section className="container px-4 mx-auto py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sua Jornada Nutricional <span className="text-primary">Personalizada</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Atinja seus objetivos de saúde com nosso assistente de nutrição baseado em IA, 
              que oferece orientação personalizada e planejamento de refeições inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/register">Começar Grátis</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/chat">
                  Teste o Chat <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
              <div className="glass-panel rounded-xl shadow-lg p-6 transform transition-all duration-700 hover:shadow-2xl perspective-1000 group border border-white/20 hover:border-primary/40 text-white bg-zinc-900/80 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-zinc-50">
                  <LineChart className="mr-2 h-5 w-5 text-primary" />
                  Perda de Peso Consistente
                </h3>
                
                <div className="relative h-80 w-full overflow-hidden glass-panel rounded-lg p-4 border border-white/20 bg-zinc-950/70">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-white">Progresso de Peso (kg)</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                        <span className="text-xs text-white">Peso</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                        <span className="text-xs text-white">Meta</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[calc(100%-32px)] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                        <XAxis 
                          dataKey="month" 
                          stroke="#fff" 
                          tick={{ fill: '#fff' }}
                          axisLine={{ stroke: '#555' }}
                        />
                        <YAxis 
                          domain={[65, 80]} 
                          stroke="#fff" 
                          tick={{ fill: '#fff' }}
                          axisLine={{ stroke: '#555' }}
                          label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft', fill: '#fff', dx: -10 }}
                        />
                        <Tooltip 
                          content={<CustomTooltip />}
                          cursor={{ stroke: '#10B981', strokeWidth: 2, strokeDasharray: '5 5' }}
                        />
                        <ReferenceLine 
                          y={70} 
                          label={{ value: "Meta", position: 'insideTopRight', fill: '#8B5CF6' }} 
                          stroke="#8B5CF6" 
                          strokeDasharray="5 5" 
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          fill="url(#colorWeight)" 
                          activeDot={{ 
                            r: 8, 
                            fill: "#10B981", 
                            stroke: "#fff", 
                            strokeWidth: 2,
                            className: "animate-pulse"
                          }}
                          isAnimationActive={true}
                          animationDuration={1000}
                          animationEasing="ease-out"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-white text-sm">Média de perda de peso dos usuários em 6 meses</p>
                  <button 
                    onClick={restartAnimation} 
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
                      <img src="https://images.unsplash.com/photo-1528825871115-3a2f5be94cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Fruta" className="w-full h-full object-cover" />
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
                  
                  <blockquote className="relative mb-4 text-white font-medium text-lg bg-zinc-950">
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
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-nutrition-800 hover:bg-white/90"
              onClick={handleOpenChat}
            >
              Experimente Grátis
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/dashboard">
                Acessar Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ChatPopup isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          onClick={() => setChatOpen(true)}
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center p-0"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </MainLayout>;
};

export default Index;
