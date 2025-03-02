
import { useEffect } from "react";
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

// Mock data for results graph
const resultData = [
  { month: "Jan", weight: 80 },
  { month: "Fev", weight: 78 },
  { month: "Mar", weight: 75 },
  { month: "Abr", weight: 73 },
  { month: "Mai", weight: 70 },
  { month: "Jun", weight: 68 },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with 3D-like Elements */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-[100px] transform rotate-6"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-tr-[80px] transform -rotate-12"></div>
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
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
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pessoa saudável preparando alimentação" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-nutrition-300 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                <BarChart className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-nutrition-700 rounded-full shadow-lg flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Visualization Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resultados Reais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja como nossos usuários transformam seus corpos e hábitos com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-4 text-primary">Perda de Peso Consistente</h3>
              
              {/* Simplified Chart Visualization */}
              <div className="relative h-64 w-full">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted"></div>
                <div className="absolute left-0 bottom-0 top-0 w-1 bg-muted"></div>
                
                <div className="flex justify-between items-end h-full relative z-10">
                  {resultData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary rounded-t-lg transition-all duration-1000" 
                        style={{ 
                          height: `${((80 - item.weight) / 15) * 100}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                      <span className="text-xs mt-2">{item.month}</span>
                    </div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>60kg</span>
                  <span>70kg</span>
                  <span>80kg</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">Média de perda de peso dos usuários em 6 meses</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[50px]"></div>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-nutrition-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">93%</h3>
                    <p className="text-muted-foreground">dos usuários relatam melhora nos hábitos alimentares</p>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[50px]"></div>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-nutrition-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">78%</h3>
                    <p className="text-muted-foreground">atingem seus objetivos de saúde em menos de 6 meses</p>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[50px]"></div>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-nutrition-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">12.000+</h3>
                    <p className="text-muted-foreground">usuários ativos em nossa plataforma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section with 3D Cards */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como o NutriGênio pode te ajudar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas poderosas para apoiar sua jornada de saúde e bem-estar.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-border overflow-hidden group transform perspective-1000 transition-all duration-500 hover:shadow-xl"
              >
                <CardContent className="p-6 relative">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-tl-[50px] transform rotate-12 -z-10"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works with Visual Timeline */}
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
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pessoa criando perfil" 
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
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pessoa conversando com IA" 
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
                  src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pessoa acompanhando progresso" 
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
            <h2 className="text-3xl font-bold mb-4">O que nossos usuários dizem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram suas vidas com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-primary/5 rounded-full z-0"></div>
                  
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="inline-block h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <span className="text-6xl text-primary opacity-20 absolute -top-6 -left-2">"</span>
                    <p className="mb-6 text-muted-foreground relative z-10">{testimonial.content}</p>
                    <span className="text-6xl text-primary opacity-20 absolute -bottom-10 -right-2">"</span>
                  </div>
                  
                  <div className="flex items-center relative z-10">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Mockup */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Veja o NutriGênio em ação</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interface intuitiva e fácil de usar, projetada para simplificar sua jornada nutricional.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative z-10 shadow-2xl rounded-xl overflow-hidden border-8 border-white transform perspective-1000 hover:rotate-y-1 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Interface do NutriGênio" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Dashboard personalizado</h3>
                  <p className="text-white/80">Acompanhe seu progresso e receba recomendações personalizadas.</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-nutrition-700 rounded-lg shadow-lg transform rotate-12 z-0 opacity-50"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-nutrition-300 rounded-full shadow-lg z-0 opacity-50"></div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with 3D Elements */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-[100px] transform rotate-12"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-tr-[80px] transform -rotate-6"></div>
        </div>
        
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-nutrition-100 rounded-full"></div>
            
            <div className="text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para transformar sua relação com a alimentação?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já estão alcançando seus objetivos de saúde 
                com o NutriGênio.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="px-8 relative overflow-hidden group">
                  <Link to="/pricing">
                    Começar Agora
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/pricing">Ver Planos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits with Visual Icons */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Benefícios do NutriGênio
            </h2>
            
            <div className="space-y-6">
              {[
                "Acessibilidade 24/7 para tirar suas dúvidas sobre nutrição",
                "Recomendações personalizadas baseadas no seu perfil e objetivos",
                "Ferramentas de acompanhamento para manter você motivado",
                "Conteúdo educativo sobre alimentação saudável e hábitos sustentáveis",
                "Suporte contínuo para ajudar você a superar desafios e manter o foco",
                "Planos alimentares adaptados às suas necessidades e preferências"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-6 w-6 rounded-full bg-nutrition-700 flex-shrink-0 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <p className="font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
