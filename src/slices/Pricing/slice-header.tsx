import { RichTextField } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";

const richTextComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="text-3xl font-bold">{children}</h2>
  ),
};

export function SliceHeader({ heading }: { heading: RichTextField }) {
  return <PrismicRichText field={heading} components={richTextComponents} />;
}
