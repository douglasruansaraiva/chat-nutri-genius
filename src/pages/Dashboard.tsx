
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MessageSquare, LineChart as LineChartIcon, Goal, Calendar, ArrowUpRight } from "lucide-react";
import { GoalTracker } from "@/components/GoalTracker";

// Sample data
const weightData = [
  { date: "01/06", weight: 85 },
  { date: "08/06", weight: 84.2 },
  { date: "15/06", weight: 83.5 },
  { date: "22/06", weight: 82.8 },
  { date: "29/06", weight: 82.1 },
  { date: "06/07", weight: 81.7 },
  { date: "13/07", weight: 81.2 },
];

const initialGoals = [
  {
    id: "1",
    title: "Beber 2 litros de água por dia",
    targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    completed: false,
  },
  {
    id: "2",
    title: "Fazer pelo menos 3 refeições saudáveis por dia",
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    completed: false,
  },
  {
    id: "3",
    title: "Perder 5kg",
    targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    completed: false,
  },
];

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel de controle nutricional.
            </p>
          </div>
          
          <Button asChild>
            <Link to="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Nova Consulta
            </Link>
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Peso Atual
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    81.2 kg
                  </h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    -3.8 kg desde o início
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Metas Ativas
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    3
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    0 de 3 completas
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Goal className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Próxima Refeição
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    Almoço
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    12:30 - Frango com salada
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Weight Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso de Peso</CardTitle>
            <CardDescription>
              Acompanhe sua evolução nas últimas semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 86]} />
                  <Tooltip formatter={(value) => [`${value} kg`, "Peso"]} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button asChild variant="outline">
                <Link to="/progress">
                  Ver Detalhes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Goals */}
        <GoalTracker initialGoals={initialGoals} />
        
        {/* Recent Consultations */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Consultas Recentes</CardTitle>
                <CardDescription>
                  Suas últimas interações com o NutriGênio
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link to="/chat">
                  Nova Consulta
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Dúvida sobre proteínas</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quanto de proteína devo consumir por dia para perder peso?
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hoje, 09:45
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Controle de fome</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Como controlar a fome entre as refeições?
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ontem, 16:30
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Dica de café da manhã</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quais são as melhores opções para um café da manhã saudável?
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    03/07, 08:15
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
