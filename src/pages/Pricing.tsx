
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { subscriptionPlans } from '@/utils/subscriptionPlans';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/pricing', plan: planId } });
      return;
    }
    
    // If already authenticated, navigate to checkout with plan
    navigate(`/checkout?plan=${planId}`);
  };
  
  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades nutricionais e comece sua jornada para uma vida mais saudável.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={cn(
                "flex flex-col h-full", 
                plan.isPopular && "border-primary shadow-lg relative"
              )}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe(plan.id)} 
                    className={cn("w-full", 
                      plan.isPopular ? "" : "variant-outline"
                    )}
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-medium mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode cancelar sua assinatura a qualquer momento. 
                  Não há contratos de longo prazo nem taxas de cancelamento.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Como funciona o período de teste?</h3>
                <p className="text-muted-foreground">
                  Oferecemos 14 dias de teste gratuito em todos os planos pagos. 
                  Você não será cobrado até o final do período de teste.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Posso mudar de plano depois?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As alterações entram em vigor imediatamente.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">O que acontece após o período de teste?</h3>
                <p className="text-muted-foreground">
                  Após o período de teste, sua assinatura será automaticamente convertida para o plano escolhido 
                  e você será cobrado de acordo com o ciclo de cobrança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
