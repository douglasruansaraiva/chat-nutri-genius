
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface WeightEntry {
  id: string;
  date: Date;
  weight: number;
}

interface ProgressTrackerProps {
  initialEntries?: WeightEntry[];
}

export const ProgressTracker = ({ initialEntries = [] }: ProgressTrackerProps) => {
  const [entries, setEntries] = useState<WeightEntry[]>(initialEntries);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [weight, setWeight] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddEntry = () => {
    if (!date || !weight || isNaN(parseFloat(weight))) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }
    
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date: date,
      weight: parseFloat(weight),
    };
    
    setEntries((prev) => [...prev, newEntry].sort((a, b) => a.date.getTime() - b.date.getTime()));
    
    // Reset form
    setDate(new Date());
    setWeight("");
    setIsAdding(false);
    
    toast.success("Registro de peso adicionado com sucesso!");
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast.success("Registro de peso removido com sucesso!");
  };
  
  // Format data for chart
  const chartData = entries.map((entry) => ({
    date: format(entry.date, "dd/MM"),
    weight: entry.weight,
  }));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
          <CardDescription>Acompanhe seu peso ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Você ainda não tem registros de peso.
              </p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar seu primeiro registro
              </Button>
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
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
          )}
          
          {isAdding ? (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="font-medium mb-3">Adicionar Registro</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: pt }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Exemplo: 75.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddEntry}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            entries.length > 0 && (
              <Button 
                className="mt-6" 
                variant="outline" 
                onClick={() => setIsAdding(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Registro
              </Button>
            )
          )}
          
          {entries.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Registros Recentes</h3>
              <div className="divide-y">
                {[...entries].reverse().slice(0, 5).map((entry) => (
                  <div key={entry.id} className="py-2 flex justify-between items-center">
                    <div>
                      <span className="font-medium">
                        {format(entry.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                      </span>
                      <span className="ml-2 text-muted-foreground">
                        {entry.weight} kg
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
