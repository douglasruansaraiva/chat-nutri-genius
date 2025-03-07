
import React, { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ChatPopup from '@/components/ChatPopup';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Lead = () => {
  const [chatOpen, setChatOpen] = useState(false);

  // Automatically open the chat when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatOpen(true);
    }, 1000); // Open chat after 1 second
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Seja bem-vindo ao NutriGênio!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Nosso assistente virtual está pronto para ajudar você a atingir seus objetivos nutricionais.
            </p>
          </div>

          <Card className="border-primary/30 shadow-lg mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-semibold mb-4">Como podemos ajudar?</h2>
                  <ul className="space-y-3">
                    {[
                      'Tire dúvidas sobre nutrição e alimentação saudável',
                      'Obtenha recomendações personalizadas',
                      'Calcule seu IMC e receba orientações',
                      'Aprenda sobre hábitos alimentares para seus objetivos'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Button 
                      size="lg" 
                      onClick={() => setChatOpen(true)}
                      className="w-full md:w-auto"
                    >
                      Iniciar Conversa
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Alimentação saudável" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Chat popup component */}
      <ChatPopup isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      
      {/* Floating chat button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          onClick={() => setChatOpen(true)}
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center p-0"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </MainLayout>
  );
};

export default Lead;
