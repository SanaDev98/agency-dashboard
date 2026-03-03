import { Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import { dashboardStats } from "@/data/mockData";

export const CardBalance2 = () => {
  return (
    <Card className="xl:max-w-sm bg-warning-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5 items-center">
          <span className="text-3xl">🏥</span>
          <div className="flex flex-col">
            <span className="text-warning-700 font-semibold">Pending Medicals</span>
            <span className="text-warning-500 text-xs">Awaiting Clearance</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-warning-700 text-3xl font-bold">{dashboardStats.pendingMedicals}</span>
          <Chip size="sm" className="bg-warning-100 text-warning-700 text-xs">Action Required</Chip>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-warning-600 text-xs">{"⚠"}</span>
              <span className="text-xs text-warning-700"> 1 Re-test</span>
            </div>
            <span className="text-warning-500 text-xs">Critical</span>
          </div>
          <div>
            <div>
              <span className="font-semibold text-warning-600 text-xs">{"⏳"}</span>
              <span className="text-xs text-warning-700"> 4 Scheduled</span>
            </div>
            <span className="text-warning-500 text-xs">Upcoming</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
