"use client";
import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { candidates } from "@/data/mockData";
import Link from "next/link";

type Candidate = (typeof candidates)[number];

interface Props {
  user: Candidate;
  columnKey: string | React.Key;
}

const statusColor = (s: string) => {
  const map: Record<string, "primary" | "warning" | "success" | "danger" | "default" | "secondary"> = {
    Lead: "default",
    Interview: "secondary",
    Medical: "warning",
    "Visa Processing": "primary",
    SLBFE: "secondary",
    "Flight Ready": "success",
    Departed: "success",
  };
  return map[s] ?? "default";
};

const medicalColor = (m: string) => {
  if (m === "Passed") return "success";
  if (m === "Failed") return "danger";
  if (m === "Re-test") return "warning";
  return "default";
};

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ src: user.avatar }}
          name={user.name}
          description={
            <span className="text-xs text-default-400">🛂 {user.passport}</span>
          }
        />
      );
    case "job":
      return (
        <div>
          <div className="text-sm font-medium">{user.jobApplied}</div>
          <div className="text-xs text-default-400">{user.country}</div>
        </div>
      );
    case "category":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            user.category === "Skilled"
              ? "success"
              : user.category === "Semi-Skilled"
                ? "secondary"
                : "default"
          }
        >
          {user.category}
        </Chip>
      );
    case "status":
      return (
        <Chip size="sm" variant="flat" color={statusColor(user.status)}>
          <span className="capitalize text-xs">{user.status}</span>
        </Chip>
      );
    case "medical":
      return (
        <Chip size="sm" variant="flat" color={medicalColor(user.medicalStatus)}>
          <span className="text-xs">{user.medicalStatus}</span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="View Progress">
              <Link href="/progress">
                <EyeIcon size={20} fill="#979797" />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit Candidate" color="secondary">
              <button onClick={() => console.log("Edit", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Remove" color="danger">
              <button onClick={() => console.log("Delete", user.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
