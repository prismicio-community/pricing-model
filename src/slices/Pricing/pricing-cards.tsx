"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Content, isFilled, RichTextField } from "@prismicio/client";
import { useState } from "react";
import { PlanHeader } from "./plan-header";
import { cn } from "@/lib/utils";
import { SliceHeader } from "./slice-header";

export function PricingCards({
  plans,
  features,
  heading,
}: {
  plans: Content.PricingPlanDocument[];
  features: Content.PricingPlanFeatureDocument[];
  heading: RichTextField;
}) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 justify-between">
        <SliceHeader heading={heading} />
        <div className="flex items-center gap-2">
          <Switch
            checked={yearly}
            onCheckedChange={() => setYearly(!yearly)}
            id="cards-yearly"
          />
          <Label htmlFor="cards-yearly">Yearly pricing</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn({
              "border-primary border-4 bg-secondary hover:bg-secondary":
                plan.data.highlighted,
            })}
          >
            <CardHeader>
              <PlanHeader
                title={plan.data.title}
                priceMonthly={plan.data.price_monthly!}
                priceYearly={plan.data.price_yearly!}
                yearly={yearly}
                callToAction={plan.data.call_to_action}
              />
            </CardHeader>
            <CardContent>
              <ul>
                {features.map((feature) => {
                  const planFeature = plan.data.features.find(
                    (planFeature) =>
                      isFilled.contentRelationship(planFeature.feature) &&
                      planFeature.feature.uid === feature?.uid
                  );

                  return (
                    <li
                      key={feature.id}
                      className="flex justify-between border-t py-2 first:border-t-0"
                    >
                      <span>{feature.data.title}</span>
                      <span>
                        {!planFeature ? "-" : planFeature.description || "✓"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
