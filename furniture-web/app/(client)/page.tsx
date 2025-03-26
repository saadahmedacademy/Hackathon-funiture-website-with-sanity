
import { FeaturesSection } from "@/components/FeaturesSection";
import GlobalLoading from "@/components/GlobalLoading";
import { HeroBlock } from "@/components/HeroBlock";
import { NewCeramics } from "@/components/NewCeremics";
import { PopularProduct } from "@/components/PopularProduct";
import { StudioSection } from "@/components/StudioSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <HeroBlock />
      <FeaturesSection />
      <NewCeramics />
      <PopularProduct />
      <StudioSection />
    </Suspense>
  );
}
