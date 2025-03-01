
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageSquare, LineChart, Apple, Goal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [aiCredits, setAiCredits] = useState(5); // Free plan users get 5 credits per day
  
  const handleStartChat = () => {
    if (aiCredits > 0) {
      // In a real app, this would navigate to the chat page
      toast({
        title: "Chat iniciado",
        description: "Você iniciou uma nova consulta com o NutriGênio.",
        duration: 3000,
      });
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
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Olá, bem-vindo ao NutriGênio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Seu assistente de nutrição pessoal para uma vida mais saudável
            </p>
          </div>
          
          <Card className="w-full md:w-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Plano Gratuito</CardTitle>
              <CardDescription>Créditos restantes hoje</CardDescription>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Consulte o NutriGênio</CardTitle>
              <CardDescription>
                Tire suas dúvidas sobre nutrição com nossa IA especializada
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Respostas personalizadas sobre nutrição</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Baseado em ciência atualizada</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Disponível 24/7</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button onClick={handleStartChat} className="w-full">
                Iniciar Consulta
              </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Acompanhe seu Progresso</CardTitle>
              <CardDescription>
                Visualize e monitore sua evolução ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Registro de medidas corporais</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Acompanhamento de objetivos</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Gráficos de progresso</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full">
                Ver Progresso
              </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Goal className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Defina suas Metas</CardTitle>
              <CardDescription>
                Estabeleça objetivos claros para sua jornada nutricional
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Metas de peso e medidas</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Objetivos de consumo de nutrientes</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>Lembretes personalizados</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full">
                Gerenciar Metas
              </Button>
            </div>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recursos do Plano Gratuito</CardTitle>
            <CardDescription>
              Sua assinatura atual inclui os seguintes recursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium">Chat com IA limitado (5/dia)</h3>
                  <p className="text-sm text-muted-foreground">
                    Consulte nossa IA sobre nutrição com limite diário
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium">Rastreador de progresso básico</h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe suas medidas e evolução
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium">Recomendações nutricionais básicas</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba orientações gerais sobre alimentação saudável
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-medium">Acesso à comunidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Participe de fóruns e discussões com outros usuários
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Desbloqueie todos os recursos</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Faça upgrade para o plano Premium e tenha acesso a consultas ilimitadas, análises personalizadas e planos alimentares detalhados.
          </p>
          <Button 
            size="lg"
            onClick={() => {
              toast({
                title: "Redirecionando",
                description: "Você será redirecionado para a página de planos.",
                duration: 3000,
              });
              // In a real app, this would navigate to the pricing page
            }}
          >
            Ver Planos Premium
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
