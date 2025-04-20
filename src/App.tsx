import { BrowserRouter, Route, Routes } from "react-router";
// import AppLayout from "./ui/AppLayout";
// import PremiumForm from "./pages/PremiumForm";
// import Interview from "./pages/Interview";
// import UploadCv from "./pages/UploadCv";
// import Quiz from "./pages/Quiz";
// import Data from "./pages/Data";
// import NotFound from "./pages/NotFound";
// import Success from "./pages/Success";
// import ChangeStatus from "./pages/ChangeStatus";
// import AddInterview from "./pages/AddInterview";
import ThankYou from "./pages/ThankYou";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import PageSpinner from "./ui/PageSpinner";
// import InterviewersData from "./pages/InterviewersData";
const InterviewersData = lazy(() => import("./pages/InterviewersData"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Data = lazy(() => import("./pages/Data"));
const Interview = lazy(() => import("./pages/Interview"));
const PremiumForm = lazy(() => import("./pages/PremiumForm"));
const UploadCv = lazy(() => import("./pages/UploadCv"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Success = lazy(() => import("./pages/Success"));
const AddInterview = lazy(() => import("./pages/AddInterview"));
const ChangeStatus = lazy(() => import("./pages/ChangeStatus"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter basename="APEC-Premium-2025">
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<PremiumForm />} />
              <Route path="/uploadcv" element={<UploadCv />} />
              <Route path="/interviewslot" element={<Interview />} />
              <Route path="/add-interview" element={<AddInterview />} />
              <Route path="/change-status" element={<ChangeStatus />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/ThankYou" element={<ThankYou />} />
              <Route path="/success" element={<Success />} />
            </Route>
            <Route path="/admin25" element={<Data />} />
            <Route path="/admin50" element={<InterviewersData />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}
export default App;
