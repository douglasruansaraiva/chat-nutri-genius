
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Plano Gratuito",
    description: "Ideal para experimentar o NutriGênio",
    price: "R$ 0",
    features: [
      "Consulta básica com o assistente",
      "Cálculo de IMC",
      "Recomendações gerais",
      "Acesso limitado a 5 consultas por mês"
    ],
    buttonText: "Começar Agora"
  },
  {
    id: "basic",
    name: "Essencial",
    description: "Para quem busca orientação nutricional regular",
    price: "R$ 29,90/mês",
    features: [
      "Consultas ilimitadas com o assistente",
      "Cálculo de IMC e outros índices",
      "Plano alimentar básico",
      "Registro de progresso",
      "Acesso ao dashboard personalizado"
    ],
    isPopular: true,
    buttonText: "Assinar Agora"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Acompanhamento nutricional completo",
    price: "R$ 59,90/mês",
    features: [
      "Todas as funcionalidades do plano Essencial",
      "Plano alimentar avançado",
      "Análise detalhada de progresso",
      "Definição e acompanhamento de metas",
      "Acesso a conteúdo exclusivo",
      "Prioridade no suporte"
    ],
    buttonText: "Assinar Premium"
  }
];
