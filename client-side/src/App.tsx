
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Classrooms from "./pages/Classrooms";
import PMPs from "./pages/PMPs";
import Consultation from "./pages/Consultation";
import Score from "./pages/Score";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="font-lexend">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/classrooms/:classroomId/pmps" element={<PMPs />} />
            <Route path="/consultation/:pmpId" element={<Consultation />} />
            <Route path="/score" element={<Score />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
