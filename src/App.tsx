import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FlowOpening from "./pages/flow/FlowOpening";
import FlowPassword from "./pages/flow/FlowPassword";
import FlowPersonalize from "./pages/flow/FlowPersonalize";
import FlowMoments from "./pages/flow/FlowMoments";
import FlowPromises from "./pages/flow/FlowPromises";
import FlowBemine from "./pages/flow/FlowBemine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pre-flow routes */}
          <Route path="/flow/opening" element={<FlowOpening />} />
          <Route path="/flow/password" element={<FlowPassword />} />
          <Route path="/flow/personalize" element={<FlowPersonalize />} />
          <Route path="/flow/moments" element={<FlowMoments />} />
          <Route path="/flow/promises" element={<FlowPromises />} />
          <Route path="/flow/bemine" element={<FlowBemine />} />
          {/* Main page */}
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
