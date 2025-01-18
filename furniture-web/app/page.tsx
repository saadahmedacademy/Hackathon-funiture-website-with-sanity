import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroBlock } from "@/components/HeroBlock";
import { NewCeremics } from "@/components/NewCeremics";
import { PopularProduct } from "@/components/PopularProduct";
import { SignUp } from "@/components/SignUp";
import { StudioSection } from "@/components/StudioSection";

export default function Home() {
  return (
    <>
    <HeroBlock />
    <FeaturesSection />
    <NewCeremics />
    <PopularProduct />
    <SignUp />
    <StudioSection />
    </>
  );
}