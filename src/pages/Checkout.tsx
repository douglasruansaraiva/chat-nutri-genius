
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionPlans } from '@/utils/subscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const paymentSchema = z.object({
  cardName: z.string().min(3, 'Nome do titular é obrigatório'),
  cardNumber: z.string().min(16, 'Número do cartão inválido').max(19),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Formato inválido (MM/AA)'),
  cvv: z.string().min(3, 'CVV inválido').max(4),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'basic';
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectedPlan = subscriptionPlans.find(plan => plan.id === planId) || subscriptionPlans[1]; // Default to basic if not found
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    }
  });
  
  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user subscription
      updateUser({
        plan: planId as any,
        subscriptionStatus: 'active',
      });
      
      toast({
        title: "Assinatura concluída!",
        description: `Você agora tem acesso ao plano ${selectedPlan.name}.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Verifique os dados do cartão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatCardNumber = (value: string) => {
    const digit = value.replace(/\D/g, '');
    const formatted = digit.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };
  
  const formatExpiry = (value: string) => {
    const digit = value.replace(/\D/g, '');
    if (digit.length > 2) {
      return `${digit.slice(0, 2)}/${digit.slice(2, 4)}`;
    }
    return digit;
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Finalizar Assinatura</h1>
            <p className="text-muted-foreground mt-2">
              Você está prestes a assinar o plano {selectedPlan.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {/* Payment form */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Pagamento</CardTitle>
                  <CardDescription>
                    Preencha os dados do seu cartão para finalizar a assinatura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome no Cartão</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome como está no cartão" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do Cartão</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                {...field} 
                                onChange={e => {
                                  const formatted = formatCardNumber(e.target.value);
                                  field.onChange(formatted);
                                }}
                                maxLength={19}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Validade</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/AA" 
                                  {...field} 
                                  onChange={e => {
                                    const formatted = formatExpiry(e.target.value);
                                    field.onChange(formatted);
                                  }}
                                  maxLength={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123" 
                                  {...field} 
                                  onChange={e => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    field.onChange(value);
                                  }}
                                  maxLength={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Alert className="mt-4">
                        <AlertTitle>Ambiente de demonstração</AlertTitle>
                        <AlertDescription>
                          Este é um ambiente simulado. Nenhuma cobrança real será feita.
                          Use qualquer valor válido para testar.
                        </AlertDescription>
                      </Alert>
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-6" 
                        disabled={isProcessing}
                        size="lg"
                      >
                        {isProcessing ? "Processando..." : `Pagar ${selectedPlan.price}`}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order summary */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{selectedPlan.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {selectedPlan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <span className="flex-shrink-0 text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between pt-2">
                      <span>Total:</span>
                      <span className="font-bold">{selectedPlan.price}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start text-sm text-muted-foreground space-y-2">
                  <p>Você pode cancelar sua assinatura a qualquer momento.</p>
                  <p>Todos os preços estão em Reais (BRL).</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
