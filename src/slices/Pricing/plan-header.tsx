import { isFilled, KeyTextField, LinkField } from "@prismicio/client";
import { Button } from "@/components/ui/button";
import { PrismicNextLink } from "@prismicio/next";

export function PlanHeader({
  title,
  priceMonthly,
  priceYearly,
  yearly,
  callToAction,
}: {
  title: KeyTextField;
  priceMonthly: number;
  priceYearly: number;
  yearly: boolean;
  callToAction: LinkField;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-lg font-bold text-muted-foreground">{title}</h3>
      <p className="text-5xl font-bold">
        ${yearly ? priceYearly : priceMonthly}
      </p>

      {isFilled.link(callToAction) && (
        <Button asChild className="mt-4">
          <PrismicNextLink field={callToAction}>
            {callToAction.text}
          </PrismicNextLink>
        </Button>
      )}
    </div>
  );
}
