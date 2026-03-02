"use client";
import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Button,
    Input,
    Progress,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { jobOrders, JobOrder } from "@/data/mockData";

const columns = [
    { name: "ORDER ID", uid: "id" },
    { name: "COUNTRY", uid: "country" },
    { name: "POSITION", uid: "position" },
    { name: "CATEGORY", uid: "category" },
    { name: "VACANCIES", uid: "vacancies" },
    { name: "AGE LIMIT", uid: "age" },
    { name: "STATUS", uid: "status" },
    { name: "DETAILS", uid: "actions" },
];

export const JobOrders = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedJob, setSelectedJob] = useState<JobOrder | null>(null);
    const [search, setSearch] = useState("");

    const filtered = jobOrders.filter(
        (j) =>
            j.position.toLowerCase().includes(search.toLowerCase()) ||
            j.country.toLowerCase().includes(search.toLowerCase()) ||
            j.id.toLowerCase().includes(search.toLowerCase())
    );

    const handleView = (job: JobOrder) => {
        setSelectedJob(job);
        onOpen();
    };

    const fillPercent = (j: JobOrder) =>
        Math.round((j.filledVacancies / j.totalVacancies) * 100);

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="flex gap-1 items-center text-default-800 font-medium">
                    Job Orders
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Job Orders Board</h3>

            {/* Toolbar */}
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <Input
                    className="max-w-xs"
                    placeholder="Search by country, position, ID…"
                    value={search}
                    onValueChange={setSearch}
                    classNames={{ input: "w-full", mainWrapper: "w-full" }}
                />
                <Button color="primary">+ Add Job Order</Button>
            </div>

            {/* Table */}
            <Table aria-label="Job Orders table">
                <TableHeader columns={columns}>
                    {(col) => (
                        <TableColumn
                            key={col.uid}
                            align={col.uid === "actions" ? "center" : "start"}
                            hideHeader={col.uid === "actions"}
                        >
                            {col.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filtered}>
                    {(job) => (
                        <TableRow key={job.id}>
                            {(colKey) => (
                                <TableCell>
                                    {colKey === "id" && (
                                        <span className="font-mono text-xs font-semibold text-primary">
                                            {job.id}
                                        </span>
                                    )}
                                    {colKey === "country" && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{job.flag}</span>
                                            <span className="font-medium">{job.country}</span>
                                        </div>
                                    )}
                                    {colKey === "position" && (
                                        <span className="font-medium">{job.position}</span>
                                    )}
                                    {colKey === "category" && (
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs text-default-500">
                                                {job.categoryLevel1}
                                            </span>
                                            <span className="text-xs font-medium">
                                                {job.categoryLevel2}
                                            </span>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={
                                                    job.categoryLevel3 === "Skilled"
                                                        ? "success"
                                                        : job.categoryLevel3 === "Semi-Skilled"
                                                            ? "secondary"
                                                            : "default"
                                                }
                                            >
                                                {job.categoryLevel3}
                                            </Chip>
                                        </div>
                                    )}
                                    {colKey === "vacancies" && (
                                        <div className="flex flex-col gap-1 min-w-[120px]">
                                            <span className="text-sm font-semibold">
                                                {job.filledVacancies}/{job.totalVacancies} filled
                                            </span>
                                            <Progress
                                                size="sm"
                                                value={fillPercent(job)}
                                                color={
                                                    fillPercent(job) >= 90
                                                        ? "danger"
                                                        : fillPercent(job) >= 60
                                                            ? "warning"
                                                            : "success"
                                                }
                                                className="max-w-[120px]"
                                            />
                                        </div>
                                    )}
                                    {colKey === "age" && (
                                        <span className="text-sm">
                                            {job.ageMin}–{job.ageMax} yrs
                                        </span>
                                    )}
                                    {colKey === "status" && (
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={job.status === "Active" ? "success" : "default"}
                                        >
                                            {job.status}
                                        </Chip>
                                    )}
                                    {colKey === "actions" && (
                                        <Tooltip content="View Requirements">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                color="primary"
                                                onPress={() => handleView(job)}
                                            >
                                                View
                                            </Button>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Detail Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) =>
                        selectedJob && (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{selectedJob.flag}</span>
                                        <div>
                                            <p className="text-lg font-bold">{selectedJob.position}</p>
                                            <p className="text-sm text-default-500 font-normal">
                                                {selectedJob.country} · {selectedJob.id}
                                            </p>
                                        </div>
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoRow label="Experience" value={selectedJob.requirements.experience} />
                                        <InfoRow label="Gender" value={selectedJob.requirements.gender} />
                                        <InfoRow label="Qualification" value={selectedJob.requirements.qualification} />
                                        <InfoRow label="Language" value={selectedJob.requirements.language} />
                                        <InfoRow
                                            label="Salary"
                                            value={`${selectedJob.salary} ${selectedJob.currency}/month`}
                                        />
                                        <InfoRow
                                            label="Age Limit"
                                            value={`${selectedJob.ageMin}–${selectedJob.ageMax} years`}
                                        />
                                        <InfoRow
                                            label="Vacancies"
                                            value={`${selectedJob.filledVacancies}/${selectedJob.totalVacancies} filled`}
                                        />
                                        <InfoRow label="Deadline" value={selectedJob.deadline} />
                                    </div>
                                    <div className="mt-2 p-3 bg-default-100 rounded-xl">
                                        <p className="text-xs text-default-500 font-semibold uppercase mb-1">
                                            Additional Notes
                                        </p>
                                        <p className="text-sm">{selectedJob.requirements.other}</p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Assign Candidates
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </div>
    );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-default-400 uppercase">{label}</span>
        <span className="text-sm text-default-800">{value}</span>
    </div>
);
