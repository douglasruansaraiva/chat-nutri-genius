
import DashboardLayout from "@/layouts/DashboardLayout";
import { GoalTracker } from "@/components/GoalTracker";

// Sample data
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
  {
    id: "4",
    title: "Aprender a preparar 5 novas receitas saudáveis",
    targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    completed: true,
  },
  {
    id: "5",
    title: "Reduzir o consumo de açúcar",
    targetDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    completed: false,
  },
];

const Goals = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Metas</h1>
          <p className="text-muted-foreground">
            Defina e acompanhe suas metas de saúde e nutrição.
          </p>
        </div>
        
        <GoalTracker initialGoals={initialGoals} />
      </div>
    </DashboardLayout>
  );
};

export default Goals;
