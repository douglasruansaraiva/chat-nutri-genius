
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { ArrowRight, MessageSquare, LineChart, Calendar, User, Check } from "lucide-react";
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

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span>Nutrição Inteligente</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mb-6 animate-slide-in">
              Seu assistente de nutrição <span className="text-primary">personalizado</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              O NutriGênio combina inteligência artificial com conhecimento nutricional para 
              ajudar você a alcançar seus objetivos de saúde com foco e consistência.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="px-8">
                <Link to="/pricing">Começar Agora</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como o NutriGênio pode te ajudar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas poderosas para apoiar sua jornada de saúde e bem-estar.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transforme seus hábitos alimentares em poucos passos simples.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Crie sua conta</h3>
              <p className="text-muted-foreground">
                Registre-se e personalize seu perfil com suas informações, objetivos e preferências alimentares.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Converse com o NutriGênio</h3>
              <p className="text-muted-foreground">
                Tire suas dúvidas sobre nutrição e receba recomendações personalizadas em tempo real.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Acompanhe seu progresso</h3>
              <p className="text-muted-foreground">
                Utilize nossas ferramentas para monitorar seu progresso e manter o foco nos seus objetivos.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/pricing">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossos usuários dizem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram suas vidas com o NutriGênio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 mr-1">★</span>
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                  <div className="flex items-center">
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
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar sua relação com a alimentação?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão alcançando seus objetivos de saúde 
              com o NutriGênio.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/pricing">Começar Agora</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">Ver Planos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-muted/50">
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
                <div key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p>{benefit}</p>
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
