import { Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import { dashboardStats } from "@/data/mockData";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5 items-center">
          <span className="text-3xl">✈️</span>
          <div className="flex flex-col">
            <span className="text-white font-semibold">Ready for Flight</span>
            <span className="text-white text-xs opacity-80">Fully Cleared</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-3xl font-bold">{dashboardStats.readyForFlight}</span>
          <Chip size="sm" className="bg-white/20 text-white text-xs">Book Tickets</Chip>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-white text-xs">{"💰"}</span>
              <span className="text-xs text-white"> LKR 1.2M</span>
            </div>
            <span className="text-white text-xs">Revenue</span>
          </div>
          <div>
            <div>
              <span className="font-semibold text-white text-xs">{"✓"}</span>
              <span className="text-xs text-white"> {dashboardStats.placedThisMonth} Placed</span>
            </div>
            <span className="text-white text-xs">This Month</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
