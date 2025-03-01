
import DashboardLayout from "@/layouts/DashboardLayout";
import { ProgressTracker } from "@/components/ProgressTracker";

// Sample data
const initialEntries = [
  {
    id: "1",
    date: new Date(2023, 5, 1), // June 1, 2023
    weight: 85,
  },
  {
    id: "2",
    date: new Date(2023, 5, 8), // June 8, 2023
    weight: 84.2,
  },
  {
    id: "3",
    date: new Date(2023, 5, 15), // June 15, 2023
    weight: 83.5,
  },
  {
    id: "4",
    date: new Date(2023, 5, 22), // June 22, 2023
    weight: 82.8,
  },
  {
    id: "5",
    date: new Date(2023, 5, 29), // June 29, 2023
    weight: 82.1,
  },
  {
    id: "6",
    date: new Date(2023, 6, 6), // July 6, 2023
    weight: 81.7,
  },
  {
    id: "7",
    date: new Date(2023, 6, 13), // July 13, 2023
    weight: 81.2,
  },
];

const Progress = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progresso</h1>
          <p className="text-muted-foreground">
            Acompanhe sua evolução ao longo do tempo.
          </p>
        </div>
        
        <ProgressTracker initialEntries={initialEntries} />
      </div>
    </DashboardLayout>
  );
};

export default Progress;
