import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();

  const home = await client.getByUID("page", "home");

  return (
    <div className="pb-[1000px]">
      <SliceZone components={components} slices={home.data.slices} />
    </div>
  );
}
