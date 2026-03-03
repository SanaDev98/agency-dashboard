"use client";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Chip,
    Divider,
    Switch,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { candidates } from "@/data/mockData";

const stepIcons = ["📋", "🎙️", "🏥", "📄", "✈️"];

const stepStatusColor = (completed: boolean, details?: string) => {
    if (!completed) return "default";
    if (details?.toLowerCase().includes("re-test")) return "warning";
    if (details?.toLowerCase().includes("fail")) return "danger";
    return "success";
};

const MedicalBadge = ({ details }: { details?: string }) => {
    if (!details) return null;
    const lower = details.toLowerCase();
    const color = lower.includes("re-test")
        ? "warning"
        : lower.includes("fail")
            ? "danger"
            : "success";
    return (
        <Chip size="sm" color={color} variant="flat">
            {details}
        </Chip>
    );
};

export const ProgressPage = () => {
    const [selectedId, setSelectedId] = useState<string>(candidates[0].id);
    const [slbfe, setSlbfe] = useState<Record<string, boolean>>({});

    const candidate = candidates.find((c) => c.id === selectedId) ?? candidates[0];

    const toggleSlbfe = (id: string) => {
        setSlbfe((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const isSlbfeDone = slbfe[candidate.id] ?? candidate.slbfeRegistered;

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[60rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="text-default-800 font-medium">Progress Tracker</li>
            </ul>

            <h3 className="text-xl font-semibold">Candidate Progress Tracker</h3>

            {/* Candidate Selector */}
            <div className="max-w-sm flex flex-col gap-1">
                <label className="text-xs text-default-500">Select Candidate</label>
                <Dropdown className="w-full">
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="w-full justify-between font-normal text-sm"
                            endContent={<span className="text-default-400 text-xs">▼</span>}
                        >
                            {candidate.name} — {candidate.passport}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Candidates" className="max-h-64 overflow-y-auto">
                        {candidates.map((c) => (
                            <DropdownItem key={c.id} onPress={() => setSelectedId(c.id)}>
                                {c.name} — {c.passport}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

            {/* Candidate Header */}
            <Card className="bg-default-50 shadow-md rounded-2xl">
                <CardBody className="flex flex-row flex-wrap gap-6 p-5 items-center">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-base">{candidate.name}</span>
                        <span className="text-xs text-default-400">🛂 {candidate.passport}</span>
                        <span className="text-xs text-default-500">{candidate.jobApplied}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Chip size="sm" variant="flat" color="primary">
                            {candidate.country}
                        </Chip>
                        <Chip
                            size="sm"
                            variant="flat"
                            color={
                                candidate.category === "Skilled"
                                    ? "success"
                                    : candidate.category === "Semi-Skilled"
                                        ? "secondary"
                                        : "default"
                            }
                        >
                            {candidate.category}
                        </Chip>
                    </div>
                </CardBody>
            </Card>

            {/* Stepper / Timeline */}
            <Card className="bg-default-50 shadow-lg rounded-2xl">
                <CardBody className="p-6">
                    <h4 className="font-semibold text-base mb-5">Recruitment Journey</h4>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-divider" />

                        <div className="flex flex-col gap-8">
                            {candidate.pipeline.map((step, idx) => {
                                const isVisa = step.step === "Visa";
                                const isMedical = step.step === "Medical";
                                const isSlbfe = step.step === "Flight";

                                return (
                                    <div key={step.step} className="flex gap-4 relative">
                                        {/* Circle indicator */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0 text-lg shadow-md ${step.completed
                                                ? stepStatusColor(step.completed, step.details) === "warning"
                                                    ? "bg-warning text-white"
                                                    : stepStatusColor(step.completed, step.details) === "danger"
                                                        ? "bg-danger text-white"
                                                        : "bg-success text-white"
                                                : "bg-default-200 text-default-400"
                                                }`}
                                        >
                                            {stepIcons[idx]}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-2">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="font-semibold text-sm">
                                                    Step {idx + 1}: {step.step}
                                                </span>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color={
                                                        step.completed
                                                            ? stepStatusColor(step.completed, step.details) as "success" | "warning" | "danger" | "default"
                                                            : "default"
                                                    }
                                                >
                                                    {step.completed ? "Completed" : "Pending"}
                                                </Chip>
                                            </div>

                                            <div className="text-xs text-default-400 mb-2">
                                                {step.date !== "Pending" ? `📅 ${step.date}` : "📅 Date TBD"}
                                            </div>

                                            {/* Medical: color-coded details */}
                                            {isMedical && step.details && (
                                                <div className="mt-1">
                                                    <MedicalBadge details={step.details} />
                                                </div>
                                            )}

                                            {/* Visa: submission + expected dates */}
                                            {isVisa && step.completed && (
                                                <div className="mt-2 grid grid-cols-2 gap-2 max-w-xs">
                                                    <div className="bg-default-100 rounded-lg p-2">
                                                        <p className="text-xs text-default-400">Submitted</p>
                                                        <p className="text-xs font-medium">
                                                            {candidate.visaSubmissionDate || "—"}
                                                        </p>
                                                    </div>
                                                    <div className="bg-default-100 rounded-lg p-2">
                                                        <p className="text-xs text-default-400">Expected</p>
                                                        <p className="text-xs font-medium">
                                                            {candidate.visaExpectedDate || "—"}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* SLBFE toggle on Flight step */}
                                            {isSlbfe && (
                                                <div className="mt-2 flex items-center gap-3">
                                                    <Switch
                                                        isSelected={isSlbfeDone}
                                                        onValueChange={() => toggleSlbfe(candidate.id)}
                                                        size="sm"
                                                        color="success"
                                                    >
                                                        <span className="text-xs">SLBFE Registration Completed</span>
                                                    </Switch>
                                                    {isSlbfeDone && (
                                                        <Chip size="sm" color="success" variant="flat">
                                                            Registered ✓
                                                        </Chip>
                                                    )}
                                                </div>
                                            )}

                                            {/* Offer letter download (Lead step) */}
                                            {step.step === "Lead" && step.completed && (
                                                <div className="mt-2">
                                                    <Button size="sm" variant="flat" color="primary">
                                                        📥 Download Offer Letter
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Divider className="my-5" />

                    {/* Audit Log */}
                    <p className="text-xs text-default-400 italic">
                        Last edited by Admin at 14:20 on 02/03/2026
                    </p>
                </CardBody>
            </Card>
        </div>
    );
};

