import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import UploadCv from "./pages/UploadCv";
import PremiumForm from "./pages/PremiumForm";
import Interview from "./pages/Interview";
import Quiz from "./pages/Quiz";
import Data from "./pages/Data";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Success from "./pages/Success";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
      <Routes>
  <Route element={<AppLayout />}>
     <Route path="/" element={<PremiumForm />} />  
     <Route path="/uploadcv" element={<UploadCv />} />
     <Route path="/interviewslot" element={<Interview />} /> 
    <Route path="/quiz" element={<Quiz />} />
     <Route path="/success" element={<Success />} /> 
     <Route path="/admin25" element={<Data />} /> 
  </Route>
   <Route path="*" element={<NotFound />} /> 
</Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}
export default App;
