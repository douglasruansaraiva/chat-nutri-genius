import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary flex items-center gap-2 transition-all hover:opacity-90"
          >
            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg">N</span>
            </span>
            <span>NutriGênio</span>
          </Link>
          
          {!isMobile && (
            <nav className="flex items-center gap-6">
              <Link 
                to="/" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Início
              </Link>
              <Link 
                to="/pricing" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/pricing") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Planos
              </Link>
              <Link 
                to="/lead" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/lead") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Experimente
              </Link>
              
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
                
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-none">
                        <User size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/login">Entrar</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/register">Registrar</Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          )}
          
          {isMobile && (
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}
        </div>
        
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 top-[61px] bg-background z-40 animate-fade-in">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link 
                to="/" 
                className={cn(
                  "py-3 text-lg font-medium transition-colors hover:text-primary",
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/pricing" 
                className={cn(
                  "py-3 text-lg font-medium transition-colors hover:text-primary",
                  isActive("/pricing") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link 
                to="/lead" 
                className={cn(
                  "py-3 text-lg font-medium transition-colors hover:text-primary",
                  isActive("/lead") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Experimente
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="py-3 text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="py-3 text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-0 py-3 h-auto text-lg font-medium hover:text-primary text-muted-foreground"
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <Button asChild variant="outline">
                    <Link 
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link 
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registrar
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <Link 
                to="/" 
                className="text-xl font-bold text-primary flex items-center gap-2"
              >
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">N</span>
                </span>
                <span>NutriGênio</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Seu assistente de nutrição personalizado
              </p>
            </div>
            
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-sm">Navegação</h4>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Planos
                </Link>
                <Link to="/lead" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Experimente
                </Link>
              </div>
              
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-sm">Legal</h4>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NutriGênio. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
