
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Plus, Trash2, Edit, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Goal {
  id: string;
  title: string;
  targetDate: Date;
  completed: boolean;
}

interface GoalTrackerProps {
  initialGoals?: Goal[];
}

export const GoalTracker = ({ initialGoals = [] }: GoalTrackerProps) => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default to 30 days from now
  );
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  
  const completedCount = goals.filter(goal => goal.completed).length;
  const completionPercentage = goals.length > 0 
    ? Math.round((completedCount / goals.length) * 100) 
    : 0;
  
  const handleAddGoal = () => {
    if (!newGoal.trim() || !targetDate) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal,
      targetDate,
      completed: false,
    };
    
    setGoals([...goals, goal]);
    setNewGoal("");
    setTargetDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setIsAdding(false);
    
    toast.success("Meta adicionada com sucesso!");
  };
  
  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success("Meta removida com sucesso!");
  };
  
  const startEditing = (goal: Goal) => {
    setEditingId(goal.id);
    setEditText(goal.title);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };
  
  const saveEdit = (id: string) => {
    if (!editText.trim()) {
      toast.error("O título da meta não pode estar vazio.");
      return;
    }
    
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, title: editText } : goal
    ));
    
    setEditingId(null);
    setEditText("");
    toast.success("Meta atualizada com sucesso!");
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Suas Metas</CardTitle>
            <CardDescription>Defina e acompanhe suas metas de saúde</CardDescription>
          </div>
          {goals.length > 0 && !isAdding && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Meta
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {goals.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Progresso geral
              </span>
              <span className="text-sm font-medium">
                {completionPercentage}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        )}
        
        {isAdding && (
          <div className="mb-6 border rounded-lg p-4 animate-fade-in">
            <h3 className="font-medium mb-3">Adicionar Nova Meta</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="goal">Descrição da Meta</Label>
                <Input
                  id="goal"
                  placeholder="Exemplo: Perder 5kg até o final do mês"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Data Alvo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !targetDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {targetDate ? format(targetDate, "PPP", { locale: pt }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={targetDate}
                      onSelect={setTargetDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAdding(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddGoal}>
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Você ainda não definiu nenhuma meta.
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar sua primeira meta
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                className={cn(
                  "p-3 border rounded-lg flex items-start gap-3",
                  goal.completed ? "bg-muted" : "bg-card"
                )}
              >
                <Checkbox 
                  checked={goal.completed}
                  onCheckedChange={() => handleToggleGoal(goal.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  {editingId === goal.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => saveEdit(goal.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className={cn(
                        "font-medium break-words",
                        goal.completed && "text-muted-foreground line-through"
                      )}>
                        {goal.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Meta para: {format(goal.targetDate, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                      </p>
                    </div>
                  )}
                </div>
                
                {editingId !== goal.id && (
                  <div className="flex gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => startEditing(goal)}
                    >
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTracker;
