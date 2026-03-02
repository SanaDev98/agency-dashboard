"use client";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Button,
    Divider,
    Progress,
} from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { candidates } from "@/data/mockData";

const checklistItems = [
    "All travel documents verified (Passport valid > 6 months)",
    "Visa confirmed and stamped in passport",
    "SLBFE registration card obtained",
    "Final payment settled — zero balance",
];

export const FinancePage = () => {
    const [selectedId, setSelectedId] = useState<string>(candidates[0].id);
    const [checklist, setChecklist] = useState<boolean[]>(
        Array(checklistItems.length).fill(false)
    );

    const candidate = candidates.find((c) => c.id === selectedId) ?? candidates[0];
    const allChecked = checklist.every(Boolean);

    const toggleCheck = (idx: number) => {
        setChecklist((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    };

    const paidTotal = candidate.installments.reduce(
        (sum, i) => (i.paid ? sum + i.amount : sum),
        0
    );
    const paidPercent = Math.round(
        (paidTotal / candidate.payments.total) * 100
    );

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[70rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="text-default-800 font-medium">Finance & Verification</li>
            </ul>

            <h3 className="text-xl font-semibold">Final Verification & Finance</h3>
            <p className="text-xs text-default-400 italic">
                ⚠️ Complete all 4 checks before generating the Ticket Handover document.
            </p>

            {/* Candidate Selector */}
            <div className="max-w-sm">
                <label className="text-xs text-default-500 mb-1 block">Select Candidate</label>
                <select
                    value={selectedId}
                    onChange={(e) => {
                        setSelectedId(e.target.value);
                        setChecklist(Array(checklistItems.length).fill(false));
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-default-200 bg-default-50 text-sm text-default-800 focus:outline-none focus:border-primary"
                >
                    {candidates.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} — {c.passport}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Payment Table (2 cols) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Payment Summary Card */}
                    <Card className="bg-default-50 rounded-2xl shadow-md">
                        <CardBody className="p-5 flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-2">
                                <h4 className="font-semibold text-base">💰 Payment Summary</h4>
                                <div className="flex gap-2">
                                    <Chip size="sm" color="default" variant="flat">
                                        Total: LKR {candidate.payments.total.toLocaleString()}
                                    </Chip>
                                    <Chip size="sm" color="success" variant="flat">
                                        Paid: LKR {paidTotal.toLocaleString()}
                                    </Chip>
                                    <Chip
                                        size="sm"
                                        color={candidate.payments.balance === 0 ? "success" : "danger"}
                                        variant="flat"
                                    >
                                        Balance: LKR {candidate.payments.balance.toLocaleString()}
                                    </Chip>
                                </div>
                            </div>
                            <Progress
                                value={paidPercent}
                                color={paidPercent === 100 ? "success" : "warning"}
                                label={`${paidPercent}% settled`}
                                showValueLabel
                                size="sm"
                            />
                        </CardBody>
                    </Card>

                    {/* Installments Table */}
                    <Table aria-label="Payment installments table">
                        <TableHeader>
                            <TableColumn>DESCRIPTION</TableColumn>
                            <TableColumn>AMOUNT (LKR)</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {candidate.installments.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <span className="text-sm font-medium">{item.description}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-sm">
                                            {item.amount.toLocaleString()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-default-500">
                                            {item.date || "—"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            size="sm"
                                            color={item.paid ? "success" : "danger"}
                                            variant="flat"
                                        >
                                            {item.paid ? "✓ Paid" : "Pending"}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Right: Checklist + Handover */}
                <div className="flex flex-col gap-4">
                    <Card className="bg-default-50 rounded-2xl shadow-md">
                        <CardBody className="p-5 flex flex-col gap-4">
                            <h4 className="font-semibold text-base">✅ Final Checklist</h4>
                            <p className="text-xs text-default-400">
                                All 4 items must be confirmed before proceeding.
                            </p>
                            <div className="flex flex-col gap-3">
                                {checklistItems.map((item, idx) => (
                                    <Checkbox
                                        key={idx}
                                        isSelected={checklist[idx]}
                                        onValueChange={() => toggleCheck(idx)}
                                        color="success"
                                        size="sm"
                                    >
                                        <span className="text-sm leading-snug">{item}</span>
                                    </Checkbox>
                                ))}
                            </div>

                            <Divider />

                            {/* Progress */}
                            <div className="flex flex-col gap-1">
                                <Progress
                                    value={(checklist.filter(Boolean).length / checklistItems.length) * 100}
                                    color={allChecked ? "success" : "warning"}
                                    size="sm"
                                    label={`${checklist.filter(Boolean).length}/${checklistItems.length} completed`}
                                    showValueLabel
                                />
                            </div>

                            <Button
                                color="success"
                                className="font-semibold"
                                isDisabled={!allChecked}
                                onPress={() => alert("🎫 Ticket Handover document generated!")}
                            >
                                🎫 Generate Ticket Handover
                            </Button>

                            {!allChecked && (
                                <p className="text-xs text-danger text-center">
                                    Complete all checklist items to proceed
                                </p>
                            )}
                        </CardBody>
                    </Card>

                    {/* Candidate Info Mini Card */}
                    <Card className="bg-default-50 rounded-xl shadow-sm">
                        <CardBody className="p-4 flex flex-col gap-1">
                            <p className="font-semibold text-sm">{candidate.name}</p>
                            <p className="text-xs text-default-400">🛂 {candidate.passport}</p>
                            <p className="text-xs text-default-500">{candidate.jobApplied}</p>
                            <p className="text-xs text-default-500">{candidate.country}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Audit Log */}
            <Divider />
            <p className="text-xs text-default-400 italic">
                Last edited by Admin at 14:20 on 02/03/2026.
            </p>
        </div>
    );
};
