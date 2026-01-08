import React from "react";
import Herobanner from "./herobanner";
import SimplePricing from "./simplePricing";
import CreatorsLove from "./creatorsLove";
import ProductDataTable from "./productDataTable";
import IndustriesServiced from "./industriesServiced";
import AiGeneratedProduct from "./aiGeneratedProduct";
import GalleryView from "./galleryView";
import VideoGenerated from "./videoGenerated";
import Prompttooutput from "./PromptToOutput";
import Ugcads from "./ugcads";
import Helixblogs from "./helixblogs";

export default function HomePage() {
  return (
    <div>
      <Herobanner />
      <AiGeneratedProduct />
      <Prompttooutput />
      <VideoGenerated />
      <GalleryView />
      <IndustriesServiced />
      <ProductDataTable />
      <CreatorsLove />
      {/* <Ugcads /> */}
      <SimplePricing />
      <Helixblogs />
    </div>
  );
}
