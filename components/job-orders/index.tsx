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
    Textarea,
    Divider,
} from "@nextui-org/react";
import { Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { jobOrders as initialJobOrders, JobOrder } from "@/data/mockData";

// ── Static options ──────────────────────────────────────────────────────────

const COUNTRIES = [
    { code: "qa", name: "Qatar" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "ae", name: "UAE" },
    { code: "kw", name: "Kuwait" },
    { code: "bh", name: "Bahrain" },
    { code: "om", name: "Oman" },
    { code: "jo", name: "Jordan" },
    { code: "ro", name: "Romania" },
    { code: "pl", name: "Poland" },
    { code: "de", name: "Germany" },
    { code: "mt", name: "Malta" },
    { code: "cy", name: "Cyprus" },
    { code: "my", name: "Malaysia" },
    { code: "kr", name: "South Korea" },
    { code: "jp", name: "Japan" },
];

const CAT_LEVEL1 = [
    "Transport", "Construction", "Manufacturing", "Security",
    "Healthcare", "Hospitality", "Agriculture", "Engineering", "Other",
];
const CAT_LEVEL3 = ["Skilled", "Semi-Skilled", "Unskilled"];
const CURRENCIES = ["QAR", "SAR", "AED", "KWD", "BHD", "OMR", "EUR", "USD", "GBP", "MYR"];
const GENDERS = ["Male", "Female", "Any"];
const STATUSES: JobOrder["status"][] = ["Active", "Pending", "Closed"];

// ── Table columns ───────────────────────────────────────────────────────────

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

// ── Empty form ──────────────────────────────────────────────────────────────

const emptyForm = () => ({
    flag: "",
    country: "",
    position: "",
    categoryLevel1: "",
    categoryLevel2: "",
    categoryLevel3: "Skilled",
    totalVacancies: "",
    filledVacancies: "0",
    ageMin: "",
    ageMax: "",
    salary: "",
    currency: "USD",
    status: "Active",
    deadline: "",
    experience: "",
    gender: "Any",
    qualification: "",
    language: "",
    notes: "",
});

// ── Component ───────────────────────────────────────────────────────────────

export const JobOrders = () => {
    const viewDisclosure = useDisclosure();
    const addDisclosure = useDisclosure();

    const [orders, setOrders] = useState<JobOrder[]>(initialJobOrders);
    const [selectedJob, setSelectedJob] = useState<JobOrder | null>(null);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState(emptyForm());
    const [errors, setErrors] = useState<Record<string, string>>({});

    const filtered = orders.filter(
        (j) =>
            j.position.toLowerCase().includes(search.toLowerCase()) ||
            j.country.toLowerCase().includes(search.toLowerCase()) ||
            j.id.toLowerCase().includes(search.toLowerCase())
    );

    const fillPercent = (j: JobOrder) =>
        Math.round((j.filledVacancies / j.totalVacancies) * 100);

    const handleView = (job: JobOrder) => {
        setSelectedJob(job);
        viewDisclosure.onOpen();
    };

    const set = (field: string, value: string) => {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: "" }));
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.flag) e.flag = "Required";
        if (!form.position.trim()) e.position = "Required";
        if (!form.categoryLevel1) e.categoryLevel1 = "Required";
        if (!form.categoryLevel2.trim()) e.categoryLevel2 = "Required";
        if (!form.totalVacancies || Number(form.totalVacancies) < 1) e.totalVacancies = "Must be ≥ 1";
        if (!form.ageMin || !form.ageMax) e.ageMin = "Required";
        if (Number(form.ageMin) >= Number(form.ageMax)) e.ageMin = "Min must be < Max";
        if (!form.salary.trim()) e.salary = "Required";
        if (!form.deadline) e.deadline = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleAdd = () => {
        if (!validate()) return;
        const newId = `JO-${String(orders.length + 1).padStart(3, "0")}`;
        const newOrder: JobOrder = {
            id: newId,
            country: form.country,
            flag: form.flag,
            position: form.position,
            categoryLevel1: form.categoryLevel1,
            categoryLevel2: form.categoryLevel2,
            categoryLevel3: form.categoryLevel3 as JobOrder["categoryLevel3"],
            totalVacancies: Number(form.totalVacancies),
            filledVacancies: Number(form.filledVacancies),
            ageMin: Number(form.ageMin),
            ageMax: Number(form.ageMax),
            salary: form.salary,
            currency: form.currency,
            status: form.status as JobOrder["status"],
            requirements: {
                experience: form.experience,
                gender: form.gender,
                qualification: form.qualification,
                language: form.language,
                other: form.notes,
            },
            deadline: form.deadline,
        };
        setOrders((prev) => [...prev, newOrder]);
        setForm(emptyForm());
        setErrors({});
        addDisclosure.onClose();
    };

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
                <Button color="primary" onPress={addDisclosure.onOpen}>
                    + Add Job Order
                </Button>
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
                                            <img
                                                src={`https://flagcdn.com/24x18/${job.flag}.png`}
                                                srcSet={`https://flagcdn.com/48x36/${job.flag}.png 2x`}
                                                width={24}
                                                height={18}
                                                alt={job.country}
                                                className="rounded-sm shadow-sm"
                                            />
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
                                            color={
                                                job.status === "Active"
                                                    ? "success"
                                                    : job.status === "Pending"
                                                        ? "warning"
                                                        : "default"
                                            }
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

            {/* ── View Detail Modal ── */}
            <Modal isOpen={viewDisclosure.isOpen} onOpenChange={viewDisclosure.onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) =>
                        selectedJob && (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://flagcdn.com/40x30/${selectedJob.flag}.png`}
                                            srcSet={`https://flagcdn.com/80x60/${selectedJob.flag}.png 2x`}
                                            width={40}
                                            height={30}
                                            alt={selectedJob.country}
                                            className="rounded shadow-sm"
                                        />
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
                                    <Button variant="light" onPress={onClose}>Close</Button>
                                    <Button color="primary" onPress={onClose}>Assign Candidates</Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>

            {/* ── Add Job Order Modal ── */}
            <Modal
                isOpen={addDisclosure.isOpen}
                onOpenChange={(open) => {
                    if (!open) { setForm(emptyForm()); setErrors({}); }
                    addDisclosure.onOpenChange();
                }}
                size="3xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>New Job Order</ModalHeader>
                            <ModalBody className="gap-5">

                                {/* Basic Info */}
                                <Section title="Basic Information">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {/* Country */}
                                        <Select
                                            label="Destination Country"
                                            placeholder="Select country"
                                            isRequired
                                            isInvalid={!!errors.flag}
                                            errorMessage={errors.flag}
                                            selectedKeys={form.flag ? [form.flag] : []}
                                            onSelectionChange={(keys) => {
                                                const code = Array.from(keys)[0] as string;
                                                const c = COUNTRIES.find((x) => x.code === code);
                                                if (c) { set("flag", c.code); set("country", c.name); }
                                            }}
                                            startContent={
                                                form.flag ? (
                                                    <img
                                                        src={`https://flagcdn.com/20x15/${form.flag}.png`}
                                                        width={20}
                                                        height={15}
                                                        alt=""
                                                        className="rounded-sm"
                                                    />
                                                ) : null
                                            }
                                        >
                                            {COUNTRIES.map((c) => (
                                                <SelectItem
                                                    key={c.code}
                                                    startContent={
                                                        <img
                                                            src={`https://flagcdn.com/20x15/${c.code}.png`}
                                                            width={20}
                                                            height={15}
                                                            alt={c.name}
                                                            className="rounded-sm"
                                                        />
                                                    }
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        {/* Position */}
                                        <Input
                                            label="Position / Job Title"
                                            placeholder="e.g. Electrician"
                                            isRequired
                                            isInvalid={!!errors.position}
                                            errorMessage={errors.position}
                                            value={form.position}
                                            onValueChange={(v) => set("position", v)}
                                        />

                                        {/* Status */}
                                        <Select
                                            label="Status"
                                            selectedKeys={[form.status]}
                                            onSelectionChange={(keys) =>
                                                set("status", Array.from(keys)[0] as string)
                                            }
                                        >
                                            {STATUSES.map((s) => (
                                                <SelectItem key={s}>{s}</SelectItem>
                                            ))}
                                        </Select>

                                        {/* Deadline */}
                                        <Input
                                            label="Deadline"
                                            type="date"
                                            isRequired
                                            isInvalid={!!errors.deadline}
                                            errorMessage={errors.deadline}
                                            value={form.deadline}
                                            onValueChange={(v) => set("deadline", v)}
                                        />
                                    </div>
                                </Section>

                                <Divider />

                                {/* Category */}
                                <Section title="Category">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <Select
                                            label="Industry"
                                            placeholder="Select industry"
                                            isRequired
                                            isInvalid={!!errors.categoryLevel1}
                                            errorMessage={errors.categoryLevel1}
                                            selectedKeys={form.categoryLevel1 ? [form.categoryLevel1] : []}
                                            onSelectionChange={(keys) =>
                                                set("categoryLevel1", Array.from(keys)[0] as string)
                                            }
                                        >
                                            {CAT_LEVEL1.map((c) => (
                                                <SelectItem key={c}>{c}</SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            label="Trade / Sub-category"
                                            placeholder="e.g. Electrical"
                                            isRequired
                                            isInvalid={!!errors.categoryLevel2}
                                            errorMessage={errors.categoryLevel2}
                                            value={form.categoryLevel2}
                                            onValueChange={(v) => set("categoryLevel2", v)}
                                        />

                                        <Select
                                            label="Skill Level"
                                            selectedKeys={[form.categoryLevel3]}
                                            onSelectionChange={(keys) =>
                                                set("categoryLevel3", Array.from(keys)[0] as string)
                                            }
                                        >
                                            {CAT_LEVEL3.map((c) => (
                                                <SelectItem key={c}>{c}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </Section>

                                <Divider />

                                {/* Vacancies & Age */}
                                <Section title="Vacancies & Age Limit">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <Input
                                            label="Total Vacancies"
                                            type="number"
                                            min={1}
                                            isRequired
                                            isInvalid={!!errors.totalVacancies}
                                            errorMessage={errors.totalVacancies}
                                            value={form.totalVacancies}
                                            onValueChange={(v) => set("totalVacancies", v)}
                                        />
                                        <Input
                                            label="Filled So Far"
                                            type="number"
                                            min={0}
                                            value={form.filledVacancies}
                                            onValueChange={(v) => set("filledVacancies", v)}
                                        />
                                        <Input
                                            label="Age Min"
                                            type="number"
                                            isRequired
                                            isInvalid={!!errors.ageMin}
                                            errorMessage={errors.ageMin}
                                            value={form.ageMin}
                                            onValueChange={(v) => set("ageMin", v)}
                                        />
                                        <Input
                                            label="Age Max"
                                            type="number"
                                            isRequired
                                            value={form.ageMax}
                                            onValueChange={(v) => set("ageMax", v)}
                                        />
                                    </div>
                                </Section>

                                <Divider />

                                {/* Compensation */}
                                <Section title="Compensation">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            label="Monthly Salary"
                                            placeholder="e.g. 1,800"
                                            isRequired
                                            isInvalid={!!errors.salary}
                                            errorMessage={errors.salary}
                                            value={form.salary}
                                            onValueChange={(v) => set("salary", v)}
                                        />
                                        <Select
                                            label="Currency"
                                            selectedKeys={[form.currency]}
                                            onSelectionChange={(keys) =>
                                                set("currency", Array.from(keys)[0] as string)
                                            }
                                        >
                                            {CURRENCIES.map((c) => (
                                                <SelectItem key={c}>{c}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </Section>

                                <Divider />

                                {/* Requirements */}
                                <Section title="Requirements">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Input
                                            label="Experience"
                                            placeholder="e.g. 2+ years welding"
                                            value={form.experience}
                                            onValueChange={(v) => set("experience", v)}
                                        />
                                        <Select
                                            label="Gender"
                                            selectedKeys={[form.gender]}
                                            onSelectionChange={(keys) =>
                                                set("gender", Array.from(keys)[0] as string)
                                            }
                                        >
                                            {GENDERS.map((g) => (
                                                <SelectItem key={g}>{g}</SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            label="Qualification"
                                            placeholder="e.g. NVQ Level 4"
                                            value={form.qualification}
                                            onValueChange={(v) => set("qualification", v)}
                                        />
                                        <Input
                                            label="Language"
                                            placeholder="e.g. Basic English"
                                            value={form.language}
                                            onValueChange={(v) => set("language", v)}
                                        />
                                        <Textarea
                                            label="Additional Notes"
                                            placeholder="Accommodation, special conditions…"
                                            className="sm:col-span-2"
                                            value={form.notes}
                                            onValueChange={(v) => set("notes", v)}
                                            minRows={2}
                                        />
                                    </div>
                                </Section>

                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>Cancel</Button>
                                <Button color="primary" onPress={handleAdd}>Create Job Order</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-default-600">{title}</p>
        {children}
    </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-default-400 uppercase">{label}</span>
        <span className="text-sm text-default-800">{value}</span>
    </div>
);
