"use client";
import React, { useState } from "react";
import {
    Avatar,
    Button,
    Chip,
    Card,
    CardBody,
    Progress,
    Divider,
    Input,
} from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { candidates, Candidate } from "@/data/mockData";

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
    if (m === "Passed") return "text-success";
    if (m === "Failed") return "text-danger";
    if (m === "Re-test") return "text-warning";
    return "text-default-400";
};

export const CandidatesPage = () => {
    const [selected, setSelected] = useState<Candidate>(candidates[0]);
    const [search, setSearch] = useState("");

    const filtered = candidates.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.passport.toLowerCase().includes(search.toLowerCase()) ||
            c.jobApplied.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="text-default-800 font-medium">Candidates</li>
            </ul>

            <h3 className="text-xl font-semibold">Candidate Selection Pipeline</h3>
            <p className="text-sm text-default-500">
                Select a candidate on the left to view their AI match score and pipeline details.
            </p>

            {/* Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: Candidate List */}
                <div className="flex flex-col gap-3">
                    <Input
                        placeholder="Search name, passport, job…"
                        value={search}
                        onValueChange={setSearch}
                        size="sm"
                    />
                    <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto pr-1">
                        {filtered.map((c) => (
                            <Card
                                key={c.id}
                                isPressable
                                onPress={() => setSelected(c)}
                                className={`cursor-pointer transition-all ${selected.id === c.id
                                    ? "border-2 border-primary"
                                    : "border-2 border-transparent"
                                    }`}
                            >
                                <CardBody className="flex flex-row items-center gap-3 py-3 px-4">
                                    <Avatar src={c.avatar} size="md" isBordered color="primary" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{c.name}</p>
                                        <p className="text-xs text-default-400 truncate">
                                            🛂 {c.passport} · {c.country}
                                        </p>
                                        <p className="text-xs text-default-500 truncate">{c.jobApplied}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Chip size="sm" variant="flat" color={statusColor(c.status)}>
                                            {c.status}
                                        </Chip>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={
                                                c.category === "Skilled"
                                                    ? "success"
                                                    : c.category === "Semi-Skilled"
                                                        ? "secondary"
                                                        : "default"
                                            }
                                        >
                                            {c.category === "Unskilled"
                                                ? "Direct Selection"
                                                : "Interview Required"}
                                        </Chip>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Candidate Detail */}
                <div className="flex flex-col gap-4">
                    <Card className="bg-default-50 shadow-lg rounded-2xl">
                        <CardBody className="p-6 flex flex-col gap-5">
                            {/* Header */}
                            <div className="flex items-center gap-4">
                                <Avatar src={selected.avatar} size="lg" isBordered color="primary" />
                                <div>
                                    <h4 className="text-lg font-bold">{selected.name}</h4>
                                    <p className="text-sm text-default-500">
                                        🛂 {selected.passport} · {selected.id}
                                    </p>
                                    <p className="text-sm text-default-600">{selected.jobApplied}</p>
                                </div>
                            </div>

                            <Divider />

                            {/* AI Score */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-default-700">
                                        🤖 AI Match Score
                                    </span>
                                    <span
                                        className={`text-lg font-bold ${selected.aiScore >= 85
                                            ? "text-success"
                                            : selected.aiScore >= 70
                                                ? "text-warning"
                                                : "text-danger"
                                            }`}
                                    >
                                        {selected.aiScore}%
                                    </span>
                                </div>
                                <Progress
                                    value={selected.aiScore}
                                    color={
                                        selected.aiScore >= 85
                                            ? "success"
                                            : selected.aiScore >= 70
                                                ? "warning"
                                                : "danger"
                                    }
                                    className="w-full"
                                />
                                <p className="text-xs text-default-400">
                                    {selected.aiScore >= 85
                                        ? "Excellent match for this job order"
                                        : selected.aiScore >= 70
                                            ? "Good match — recommend interview"
                                            : "Moderate match — further screening advised"}
                                </p>
                            </div>

                            <Divider />

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <DetailItem label="Category" value={selected.category} />
                                <DetailItem label="Country" value={`${selected.country}`} />
                                <DetailItem
                                    label="Medical Status"
                                    value={selected.medicalStatus}
                                    valueClass={medicalColor(selected.medicalStatus)}
                                />
                                <DetailItem label="Current Status" value={selected.status} />
                                <DetailItem
                                    label="Payment Paid"
                                    value={`LKR ${selected.payments.paid.toLocaleString()}`}
                                />
                                <DetailItem
                                    label="Balance Due"
                                    value={`LKR ${selected.payments.balance.toLocaleString()}`}
                                />
                            </div>

                            <Divider />

                            {/* Documents */}
                            <div>
                                <p className="text-xs font-semibold text-default-400 uppercase mb-2">
                                    Documents
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selected.docs.map((doc) => (
                                        <Chip key={doc} size="sm" variant="bordered" color="default">
                                            📄 {doc}
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            <Divider />

                            {/* Action Buttons */}
                            <div className="flex gap-3 flex-wrap">
                                {selected.category !== "Unskilled" ? (
                                    <Button color="primary" className="flex-1">
                                        📹 Schedule Zoom Interview
                                    </Button>
                                ) : (
                                    <Button color="success" className="flex-1">
                                        ✅ Direct Selection — Proceed
                                    </Button>
                                )}
                                <Link href="/progress" className="flex-1">
                                    <Button variant="bordered" color="secondary" className="w-full">
                                        View Progress Tracker
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({
    label,
    value,
    valueClass,
}: {
    label: string;
    value: string;
    valueClass?: string;
}) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-default-400 uppercase">{label}</span>
        <span className={`text-sm font-medium ${valueClass ?? ""}`}>{value}</span>
    </div>
);
