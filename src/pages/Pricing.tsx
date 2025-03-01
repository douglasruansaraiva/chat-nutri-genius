
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PlanFeature = {
  name: string;
  included: boolean;
};

type PricingPlan = {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
};

const Pricing = () => {
  const { toast } = useToast();
  const [planPeriod, setPlanPeriod] = useState<"monthly" | "annual">("monthly");
  
  const plans: PricingPlan[] = [
    {
      name: "Gratuito",
      price: 0,
      description: "Perfeito para experimentar o NutriGênio",
      features: [
        { name: "Chat com IA limitado (5/dia)", included: true },
        { name: "Rastreador de progresso básico", included: true },
        { name: "Recomendações nutricionais básicas", included: true },
        { name: "Acesso à comunidade", included: true },
        { name: "Análise personalizada", included: false },
        { name: "Plano alimentar personalizado", included: false },
        { name: "Acompanhamento profissional", included: false },
        { name: "Prioridade no suporte", included: false },
      ]
    },
    {
      name: "Premium",
      price: planPeriod === "monthly" ? 29.90 : 299.90,
      description: "Para quem leva a sério a nutrição",
      popular: true,
      features: [
        { name: "Chat com IA ilimitado", included: true },
        { name: "Rastreador de progresso avançado", included: true },
        { name: "Recomendações nutricionais detalhadas", included: true },
        { name: "Acesso à comunidade", included: true },
        { name: "Análise personalizada", included: true },
        { name: "Plano alimentar personalizado", included: true },
        { name: "Acompanhamento profissional", included: false },
        { name: "Prioridade no suporte", included: true },
      ]
    },
    {
      name: "Profissional",
      price: planPeriod === "monthly" ? 59.90 : 599.90,
      description: "O pacote completo para resultados máximos",
      features: [
        { name: "Chat com IA ilimitado", included: true },
        { name: "Rastreador de progresso avançado", included: true },
        { name: "Recomendações nutricionais detalhadas", included: true },
        { name: "Acesso à comunidade", included: true },
        { name: "Análise personalizada", included: true },
        { name: "Plano alimentar personalizado", included: true },
        { name: "Acompanhamento profissional", included: true },
        { name: "Prioridade no suporte", included: true },
      ]
    }
  ];
  
  const handleSubscribe = (planName: string) => {
    toast({
      title: "Assinatura iniciada",
      description: `Você selecionou o plano ${planName}. Redirecionando para o pagamento...`,
      duration: 3000,
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades nutricionais e comece sua jornada para uma vida mais saudável.
          </p>
          
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button 
              variant={planPeriod === "monthly" ? "default" : "outline"}
              onClick={() => setPlanPeriod("monthly")}
              className="min-w-24"
            >
              Mensal
            </Button>
            <Button 
              variant={planPeriod === "annual" ? "default" : "outline"}
              onClick={() => setPlanPeriod("annual")}
              className="min-w-24"
            >
              Anual 
              <span className="text-xs ml-1 bg-primary-foreground text-primary py-0.5 px-1.5 rounded-full">
                -17%
              </span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-md relative' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    R$ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">
                    /{planPeriod === "monthly" ? "mês" : "ano"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                      ) : (
                        <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.price === 0 ? "Começar Grátis" : "Assinar Agora"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-semibold text-lg">Como funciona a assinatura?</h3>
              <p className="text-muted-foreground">Após assinar, você terá acesso imediato às funcionalidades do plano escolhido. As cobranças são automáticas de acordo com o período selecionado.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Posso mudar de plano?</h3>
              <p className="text-muted-foreground">Sim, você pode atualizar ou rebaixar seu plano a qualquer momento. As alterações entram em vigor no próximo período de cobrança.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Como cancelar minha assinatura?</h3>
              <p className="text-muted-foreground">Você pode cancelar sua assinatura a qualquer momento através da área de configurações da sua conta. O acesso permanece até o final do período pago.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
