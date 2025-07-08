import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PricingTable } from "./pricing-table";
import { PricingCards } from "./pricing-cards";

/**
 * Props for `Pricing`.
 */
export type PricingProps = SliceComponentProps<Content.PricingSlice>;

/**
 * Component for "Pricing" Slices.
 */
const Pricing: FC<PricingProps> = async ({ slice }) => {
  const client = createClient();

  const planIds = slice.primary.plans.flatMap((plan) =>
    isFilled.contentRelationship(plan.plan) ? [plan.plan.id] : []
  );

  const plans = await client.getAllByIDs<Content.PricingPlanDocument>(planIds);

  let groups: Content.PricingPlanGroupDocument[] = [];
  let features: Content.PricingPlanFeatureDocument[] = [];

  // Table variation
  if (slice.variation === "table") {
    const groupIds = slice.primary.groups.flatMap((group) =>
      isFilled.contentRelationship(group.group) ? [group.group.id] : []
    );

    groups =
      await client.getAllByIDs<Content.PricingPlanGroupDocument>(groupIds);
  }

  // Cards variation
  if (slice.variation === "cards") {
    const featureIds = slice.primary.features.flatMap((feature) =>
      isFilled.contentRelationship(feature.feature) ? [feature.feature.id] : []
    );

    features =
      await client.getAllByIDs<Content.PricingPlanFeatureDocument>(featureIds);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-6xl py-12 px-6"
    >
      {slice.variation === "table" && (
        <PricingTable
          heading={slice.primary.heading}
          plans={plans}
          groups={groups}
        />
      )}
      {slice.variation === "cards" && (
        <PricingCards
          heading={slice.primary.heading}
          plans={plans}
          features={features}
        />
      )}
    </section>
  );
};

export default Pricing;
