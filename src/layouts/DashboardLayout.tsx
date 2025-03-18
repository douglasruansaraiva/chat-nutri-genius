
import { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  User, 
  Home, 
  MessageSquare,
  LineChart,
  Settings,
  Calendar,
  Goal,
  Apple,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Use our new auth context
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 font-medium">NutriGênio</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-none">
                      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={toggleTheme}>
                      {theme === "light" ? "Modo escuro" : "Modo claro"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-none">
                      <User size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex flex-col items-start">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 p-2">
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg">N</span>
          </span>
          <div>
            <span className="font-bold text-lg">NutriGênio</span>
            {user?.plan && (
              <Badge variant="outline" className="ml-2 text-xs">
                {user.plan === 'premium' ? 'Premium' : user.plan === 'basic' ? 'Essencial' : 'Grátis'}
              </Badge>
            )}
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link to="/dashboard">
                    <Home size={20} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/chat")}>
                  <Link to="/chat">
                    <MessageSquare size={20} />
                    <span>Consulta</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {(user?.plan === 'basic' || user?.plan === 'premium') && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/progress")}>
                      <Link to="/progress">
                        <LineChart size={20} />
                        <span>Progresso</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/goals")}>
                      <Link to="/goals">
                        <Goal size={20} />
                        <span>Metas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
              
              {user?.plan === 'premium' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/meal-plan")}>
                      <Link to="/meal-plan">
                        <Apple size={20} />
                        <span>Plano Alimentar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/calendar")}>
                      <Link to="/calendar">
                        <Calendar size={20} />
                        <span>Calendário</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")}>
                  <Link to="/profile">
                    <User size={20} />
                    <span>Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link to="/settings">
                    <Settings size={20} />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut size={20} />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardLayout;
