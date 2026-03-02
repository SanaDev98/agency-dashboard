import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { dashboardStats } from "@/data/mockData";

export const CardBalance1 = () => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5 items-center">
          <span className="text-3xl">👥</span>
          <div className="flex flex-col">
            <span className="text-white font-semibold">Total Leads</span>
            <span className="text-white text-xs opacity-80">Active Pipeline</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-3xl font-bold">{dashboardStats.totalLeads}</span>
          <span className="text-success text-xs bg-success/20 px-2 py-0.5 rounded-full">+3 this week</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↑"}</span>
              <span className="text-xs text-white"> {dashboardStats.placedThisMonth}</span>
            </div>
            <span className="text-white text-xs">Placed</span>
          </div>
          <div>
            <div>
              <span className="font-semibold text-warning text-xs">{"◉"}</span>
              <span className="text-xs text-white"> {dashboardStats.activeJobOrders}</span>
            </div>
            <span className="text-white text-xs">Job Orders</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
