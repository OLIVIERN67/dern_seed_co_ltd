import { Toaster } from "@/ui/sonner";
import { TooltipProvider } from "@/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import WhatsAppButton from "./components/WhatsAppButton";
import Navigation from "./components/Navigation/";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { initAnalytics, trackPageView } from "./lib/analytics";
import SessionTimeoutWatcher from "./components/SessionTimeoutWatcher";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OrderForm from "./pages/OrderForm";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/products"} component={Products} />
      <Route path={"/order"} component={OrderForm} />
      <Route path={"/services"} component={Services} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/blog/:slug"} component={BlogDetail} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/login"} component={Login} />
      <Route path={"/signup"} component={SignUp} />
      <Route path={"/dashboard/customer"}>
        <ProtectedRoute allow={["user", "farmer", "admin", "employee"]}>
          <CustomerDashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/dashboard/admin"}>
        <ProtectedRoute allow={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/dashboard/employee"}>
        <ProtectedRoute allow={["admin", "employee"]}>
          <EmployeeDashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <AnalyticsTracker />
              <SessionTimeoutWatcher />
              <Navigation />
              <Router />
              <WhatsAppButton />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;