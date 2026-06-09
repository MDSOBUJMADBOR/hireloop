import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsSection></StatsSection>
        <ToastContainer />
    </div>
  );
}