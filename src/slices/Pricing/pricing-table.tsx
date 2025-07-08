"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Content, isFilled, RichTextField } from "@prismicio/client";
import { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { PlanHeader } from "./plan-header";
import { cn } from "@/lib/utils";
import { SliceHeader } from "./slice-header";

export function PricingTable({
  plans,
  groups,
  heading,
}: {
  plans: Content.PricingPlanDocument[];
  groups: Content.PricingPlanGroupDocument[];
  heading: RichTextField;
}) {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 justify-between">
        <SliceHeader heading={heading} />
        <div className="flex items-center gap-2">
          <Switch
            checked={yearly}
            onCheckedChange={() => setYearly(!yearly)}
            id="table-yearly"
          />
          <Label htmlFor="table-yearly">Yearly pricing</Label>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader className="border-b">
          <TableRow>
            <TableHead className="bg-muted/50 w-1/4" />
            {plans.map((plan) => (
              <TableHead
                className={cn("py-6 border-l px-6 w-1/4 relative", {
                  "bg-secondary/50": plan.data.highlighted,
                })}
                key={plan.uid}
              >
                <PlanHeader
                  title={plan.data.title}
                  priceMonthly={plan.data.price_monthly!}
                  priceYearly={plan.data.price_yearly!}
                  yearly={yearly}
                  callToAction={plan.data.call_to_action}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <Fragment key={group.uid}>
              <TableRow>
                <TableCell
                  colSpan={1}
                  className="text-lg font-bold bg-muted/50"
                >
                  {group.data.title}
                </TableCell>
                {plans.map((plan) => (
                  <TableCell
                    key={plan.id}
                    className={cn("border-l", {
                      "bg-secondary/50": plan.data.highlighted,
                    })}
                  />
                ))}
              </TableRow>

              {group.data.features.map((feature) => {
                if (!isFilled.contentRelationship(feature.feature)) return null;

                const featureDoc = feature.feature;

                return (
                  <TableRow
                    key={feature.feature.uid}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="bg-muted/50 relative pl-6 flex items-center gap-2 justify-between">
                      <span className="w-2 absolute top-0 left-0 bottom-0 bg-muted block border-r" />
                      <span>{featureDoc.data?.title}</span>
                      {isFilled.keyText(featureDoc.data?.description) && (
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-80">
                            {featureDoc.data?.description}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    {plans.map((plan) => {
                      const planFeature = plan.data.features.find(
                        (planFeature) =>
                          isFilled.contentRelationship(planFeature.feature) &&
                          planFeature.feature.uid === featureDoc.uid
                      );

                      return (
                        <TableCell
                          key={plan.id}
                          className={cn("border-l px-6", {
                            "bg-secondary/50": plan.data.highlighted,
                          })}
                        >
                          {!planFeature ? "-" : planFeature.description || "✓"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
