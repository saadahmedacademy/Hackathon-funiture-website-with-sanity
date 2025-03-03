
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroBlock } from "@/components/HeroBlock";
import { NewCeramics } from "@/components/NewCeremics";
import { PopularProduct } from "@/components/PopularProduct";
import { StudioSection } from "@/components/StudioSection";

export default function Home() {
  return (
    <>
      <HeroBlock />
      <FeaturesSection />
      <NewCeramics />
      <PopularProduct />
      <StudioSection />
    </>
  );
}
