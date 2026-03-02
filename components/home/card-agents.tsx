"use client";
import { Card, CardBody, Chip } from "@nextui-org/react";
import React from "react";
import { urgentNotifications } from "@/data/mockData";

const priorityColor = (p: string) =>
  p === "high" ? "danger" : p === "medium" ? "warning" : "default";

const typeIcon = (t: string) =>
  ({ passport: "🛂", jobOrder: "📋", medical: "🏥", visa: "📄", flight: "✈️" }[t] ?? "🔔");

export const CardAgents = () => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-4 py-2 w-full">
      <CardBody className="py-4 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {"🚨"} Urgent Alerts
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {urgentNotifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{typeIcon(n.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-default-800 leading-snug">{n.message}</p>
                <span className="text-xs text-default-400">{n.date}</span>
              </div>
              <Chip size="sm" color={priorityColor(n.priority)} variant="flat" className="shrink-0">
                {n.priority}
              </Chip>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
