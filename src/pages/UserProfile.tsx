
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { subscriptionPlans } from '@/utils/subscriptionPlans';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    height: '',
    weight: '',
    birthdate: '',
    gender: '',
    objective: ''
  });
  
  const currentPlan = subscriptionPlans.find(plan => plan.id === user?.plan) || subscriptionPlans[0];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      
      // In a real application, this would be an API call
      // For demo, we'll just update the local state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({ name: profileData.name });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const calculateDaysLeft = (): number => {
    if (user?.subscriptionStatus !== 'trial' || !user?.trialEndsAt) return 0;
    const trialEnd = new Date(user.trialEndsAt);
    const today = new Date();
    const diffTime = trialEnd.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysLeft = calculateDaysLeft();
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Perfil do Usuário</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="subscription">Assinatura</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais para melhorar a precisão das recomendações
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleUpdateProfile}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profileData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={profileData.email} 
                        onChange={handleInputChange}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input 
                        id="height" 
                        name="height" 
                        type="number" 
                        placeholder="Ex: 170" 
                        value={profileData.height} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input 
                        id="weight" 
                        name="weight" 
                        type="number" 
                        placeholder="Ex: 70" 
                        value={profileData.weight} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Data de Nascimento</Label>
                      <Input 
                        id="birthdate" 
                        name="birthdate" 
                        type="date" 
                        value={profileData.birthdate} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gênero</Label>
                      <Input 
                        id="gender" 
                        name="gender" 
                        placeholder="Masculino, Feminino, Outro" 
                        value={profileData.gender} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="objective">Objetivo Nutricional</Label>
                      <Input 
                        id="objective" 
                        name="objective" 
                        placeholder="Ex: Perder peso, Ganhar massa muscular, Manter peso" 
                        value={profileData.objective} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detalhes da Assinatura</CardTitle>
                    <CardDescription>
                      Informações sobre seu plano atual
                    </CardDescription>
                  </div>
                  <Badge variant={user?.subscriptionStatus === 'active' ? 'default' : 'outline'}>
                    {user?.subscriptionStatus === 'active' ? 'Ativo' : 'Período de Teste'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {user?.subscriptionStatus === 'trial' && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 rounded-md flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Período de Teste</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Seu período de teste termina em {daysLeft} dias. Assine um plano para continuar 
                        tendo acesso a todos os recursos.
                      </p>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium">Plano Atual: {currentPlan.name}</h3>
                  <p className="text-muted-foreground">{currentPlan.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recursos Incluídos:</h4>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <p className="font-medium">Próxima cobrança: 15/10/2023</p>
                    <p className="text-sm text-muted-foreground">Valor: {currentPlan.price}</p>
                  </div>
                  
                  <div className="space-x-2">
                    <Button variant="outline" asChild>
                      <a href="/pricing">Mudar Plano</a>
                    </Button>
                    <Button variant="destructive">Cancelar Assinatura</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
