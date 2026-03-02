"use client";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { recentActivity } from "@/data/mockData";

export const CardTransactions = () => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Recent Activity
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="grid grid-cols-4 w-full items-center gap-2">
              <div className="w-full">
                <Avatar
                  isBordered
                  color="secondary"
                  src={item.avatar}
                  size="sm"
                />
              </div>
              <div className="col-span-2">
                <span className="text-default-900 font-semibold text-xs block truncate">
                  {item.candidateName}
                </span>
                <span className="text-default-500 text-xs truncate block">{item.event}</span>
              </div>
              <div className="text-right">
                <span className="text-success text-xs font-medium">{item.amount}</span>
                <span className="text-default-400 text-xs block">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
