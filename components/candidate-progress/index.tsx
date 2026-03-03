"use client";
import React, { useState, useRef } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Button,
    Input,
    Textarea,
    Divider,
    Avatar,
    Switch,
    Progress,
    RadioGroup,
    Radio,
    Tooltip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { candidates } from "@/data/mockData";

/* ─── Types ─────────────────────────────────────────── */
type UploadedFile = { name: string; size: string; type: string };

/* ─── Helpers ────────────────────────────────────────── */
function formatBytes(b: number) {
    if (b < 1024) return b + " B";
    if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
    return (b / 1048576).toFixed(1) + " MB";
}

/* ─── Step status helper ─────────────────────────────── */
const STEP_KEYS = ["lead", "interview", "medical", "visa", "slbfe", "flight"] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_LABELS: Record<StepKey, string> = {
    lead: "Lead & Registration",
    interview: "Interview",
    medical: "Medical",
    visa: "Visa Processing",
    slbfe: "SLBFE / Bureau",
    flight: "Flight & Departure",
};
const STEP_ICONS: Record<StepKey, string> = {
    lead: "📋",
    interview: "🎙️",
    medical: "🏥",
    visa: "📄",
    slbfe: "🛂",
    flight: "✈️",
};

/* ─── FileUploadZone ─────────────────────────────────── */
const FileUploadZone = ({
    label,
    accept,
    files,
    onFiles,
    multiple = true,
}: {
    label: string;
    accept: string;
    files: UploadedFile[];
    onFiles: (f: UploadedFile[]) => void;
    multiple?: boolean;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(e.target.files ?? []).map((f) => ({
            name: f.name,
            size: formatBytes(f.size),
            type: f.type,
        }));
        onFiles(multiple ? [...files, ...picked] : picked);
        e.target.value = "";
    };
    const remove = (idx: number) =>
        onFiles(files.filter((_, i) => i !== idx));

    const isImage = (t: string) => t.startsWith("image/");
    const isVideo = (t: string) => t.startsWith("video/");

    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-default-500 uppercase">
                {label}
            </label>
            <div
                onClick={() => ref.current?.click()}
                className="border-2 border-dashed border-default-300 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors flex flex-col items-center gap-1"
            >
                <span className="text-2xl">
                    {accept.includes("video") ? "🎬" : accept.includes("image") ? "🖼️" : "📎"}
                </span>
                <p className="text-xs text-default-400 text-center">
                    Click to upload {label.toLowerCase()}
                </p>
                <p className="text-xs text-default-300">{accept.replace(/,/g, " / ")}</p>
            </div>
            <input
                ref={ref}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={handleChange}
            />
            {files.length > 0 && (
                <div className="flex flex-col gap-1.5">
                    {files.map((f, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 bg-default-100 rounded-lg px-3 py-1.5"
                        >
                            <span className="text-base">
                                {isVideo(f.type) ? "🎬" : isImage(f.type) ? "🖼️" : "📄"}
                            </span>
                            <span className="text-xs flex-1 truncate text-default-700">{f.name}</span>
                            <span className="text-xs text-default-400 shrink-0">{f.size}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); remove(i); }}
                                className="text-danger text-xs hover:text-danger-600 shrink-0"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ─── StepCard wrapper ───────────────────────────────── */
const StepCard = ({
    stepKey,
    current,
    completed,
    onClick,
    children,
}: {
    stepKey: StepKey;
    current: boolean;
    completed: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => {
    const [open, setOpen] = useState(current);

    return (
        <Card
            className={`rounded-2xl shadow-md transition-all border-2 ${current
                    ? "border-primary"
                    : completed
                        ? "border-success"
                        : "border-default-200"
                }`}
        >
            <CardHeader
                className="cursor-pointer px-5 py-4 flex items-center gap-3"
                onClick={() => setOpen((o) => !o)}
            >
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${completed
                            ? "bg-success text-white"
                            : current
                                ? "bg-primary text-white"
                                : "bg-default-200 text-default-400"
                        }`}
                >
                    {completed ? "✓" : STEP_ICONS[stepKey]}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{STEP_LABELS[stepKey]}</p>
                    <p className="text-xs text-default-400">
                        {completed ? "Completed" : current ? "In Progress" : "Pending"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {completed && (
                        <Chip size="sm" color="success" variant="flat">
                            Done
                        </Chip>
                    )}
                    {current && (
                        <Chip size="sm" color="primary" variant="flat">
                            Active
                        </Chip>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); onClick(); }}
                        className={`text-xs px-2 py-0.5 rounded-lg font-medium ${completed
                                ? "bg-success/10 text-success"
                                : "bg-primary/10 text-primary"
                            }`}
                    >
                        {completed ? "Edit" : "Update"}
                    </button>
                    <span className="text-default-300 text-sm">{open ? "▲" : "▼"}</span>
                </div>
            </CardHeader>
            {open && (
                <>
                    <Divider />
                    <CardBody className="px-5 py-4">{children}</CardBody>
                </>
            )}
        </Card>
    );
};

/* ─── Section helper ─────────────────────────────────── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-default-400 uppercase tracking-wider border-b border-default-100 pb-1">
            {title}
        </p>
        {children}
    </div>
);

/* ─── Main Page ──────────────────────────────────────── */
export const CandidateProgressPage = () => {
    const [selectedId, setSelectedId] = useState(candidates[0].id);
    const candidate = candidates.find((c) => c.id === selectedId) ?? candidates[0];

    /* Determine which step index is "current" based on pipeline */
    const currentStepIdx = (() => {
        const completedCount = candidate.pipeline.filter((p) => p.completed).length;
        return Math.min(completedCount, STEP_KEYS.length - 1);
    })();

    /* ── Per-step form states ──────────────────────────── */
    // Lead
    const [leadData, setLeadData] = useState({
        fullName: candidate.name,
        passport: candidate.passport,
        dob: "",
        nic: "",
        phone: "",
        address: "",
        email: "",
        emergencyContact: "",
        jobApplied: candidate.jobApplied,
        country: candidate.country,
        category: candidate.category,
    });
    const [leadDocs, setLeadDocs] = useState<UploadedFile[]>([]);
    const [leadPhoto, setLeadPhoto] = useState<UploadedFile[]>([]);

    // Interview
    const [interviewData, setInterviewData] = useState({
        type: "zoom",
        scheduledDate: "",
        scheduledTime: "",
        interviewerName: "",
        zoomLink: "",
        result: "pending",
        notes: "",
    });
    const [interviewVideos, setInterviewVideos] = useState<UploadedFile[]>([]);
    const [interviewDocs, setInterviewDocs] = useState<UploadedFile[]>([]);

    // Medical
    const [medicalData, setMedicalData] = useState({
        hospital: "",
        examDate: candidate.pipeline[2]?.date !== "Pending" ? candidate.pipeline[2]?.date ?? "" : "",
        result: candidate.medicalStatus === "Pending" ? "pending" : candidate.medicalStatus.toLowerCase().replace("-", "_"),
        bpSystolic: "",
        bpDiastolic: "",
        height: "",
        weight: "",
        doctorName: "",
        retestDate: "",
        notes: "",
    });
    const [medicalDocs, setMedicalDocs] = useState<UploadedFile[]>([]);
    const [medicalImages, setMedicalImages] = useState<UploadedFile[]>([]);

    // Visa
    const [visaData, setVisaData] = useState({
        applicationNo: "",
        submissionDate: candidate.visaSubmissionDate,
        expectedDate: candidate.visaExpectedDate,
        embassy: "",
        visaType: "",
        agentRef: "",
        notes: "",
    });
    const [visaDocs, setVisaDocs] = useState<UploadedFile[]>([]);

    // SLBFE
    const [slbfeData, setSlbfeData] = useState({
        registrationNo: "",
        registrationDate: "",
        centerName: "",
        registered: candidate.slbfeRegistered,
        notes: "",
    });
    const [slbfeDocs, setSlbfeDocs] = useState<UploadedFile[]>([]);

    // Flight
    const [flightData, setFlightData] = useState({
        airline: "",
        flightNo: "",
        departureDate: "",
        departureTime: "",
        departureAirport: "BIA - Bandaranaike International",
        arrivalAirport: "",
        terminal: "",
        seatNo: "",
        notes: "",
    });
    const [flightDocs, setFlightDocs] = useState<UploadedFile[]>([]);

    /* ── Completion detection ──────────────────────────── */
    const completedSteps: Record<StepKey, boolean> = {
        lead: candidate.pipeline[0]?.completed ?? false,
        interview: candidate.pipeline[1]?.completed ?? false,
        medical: candidate.pipeline[2]?.completed ?? false,
        visa: candidate.pipeline[3]?.completed ?? false,
        slbfe: candidate.slbfeRegistered,
        flight: candidate.pipeline[4]?.completed ?? false,
    };

    const overallPercent = Math.round(
        (Object.values(completedSteps).filter(Boolean).length / STEP_KEYS.length) * 100
    );

    const handleSave = (step: StepKey) => {
        alert(`✅ ${STEP_LABELS[step]} data saved successfully!`);
    };

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[85rem] mx-auto w-full flex flex-col gap-5">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="flex gap-1 items-center">
                    <Link href="/candidates">Candidates</Link>
                    <span>/</span>
                </li>
                <li className="text-default-800 font-medium">Progress</li>
            </ul>

            {/* Page Title + Candidate Selector */}
            <div className="flex flex-wrap gap-4 items-end justify-between">
                <div>
                    <h3 className="text-xl font-semibold">Candidate Progress Manager</h3>
                    <p className="text-sm text-default-500 mt-0.5">
                        End-to-end pipeline management — data entry, documents & media for each step.
                    </p>
                </div>
                <div className="min-w-[260px] flex flex-col gap-1">
                    <label className="text-xs text-default-500">Select Candidate</label>
                    <Dropdown>
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
            </div>

            {/* Candidate Profile Banner */}
            <Card className="bg-primary rounded-2xl shadow-lg">
                <CardBody className="p-5">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Avatar
                            src={candidate.avatar}
                            size="lg"
                            isBordered
                            color="default"
                            className="ring-4 ring-white/30"
                        />
                        <div className="flex-1 min-w-[200px]">
                            <div className="flex flex-wrap gap-2 items-center mb-1">
                                <h4 className="text-lg font-bold text-white">{candidate.name}</h4>
                                <Chip size="sm" className="bg-white/20 text-white">{candidate.id}</Chip>
                            </div>
                            <p className="text-white/70 text-sm">🛂 {candidate.passport} · {candidate.country}</p>
                            <p className="text-white/70 text-sm">{candidate.jobApplied}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="text-center">
                                <p className="text-white/60 text-xs">Overall Progress</p>
                                <p className="text-white text-2xl font-bold">{overallPercent}%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white/60 text-xs">AI Score</p>
                                <p className="text-white text-2xl font-bold">{candidate.aiScore}%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white/60 text-xs">Balance Due</p>
                                <p className="text-white text-2xl font-bold">
                                    LKR {candidate.payments.balance.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Progress
                            value={overallPercent}
                            color="default"
                            className="mt-1"
                            classNames={{ indicator: "bg-white", track: "bg-white/20" }}
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Horizontal Step Indicators */}
            <div className="flex items-center w-full overflow-x-auto gap-0">
                {STEP_KEYS.map((key, idx) => {
                    const done = completedSteps[key];
                    const active = idx === currentStepIdx && !done;
                    return (
                        <React.Fragment key={key}>
                            <div className="flex flex-col items-center gap-1 min-w-[80px]">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all ${done
                                            ? "bg-success text-white shadow-md"
                                            : active
                                                ? "bg-primary text-white shadow-lg scale-110"
                                                : "bg-default-200 text-default-400"
                                        }`}
                                >
                                    {done ? "✓" : STEP_ICONS[key]}
                                </div>
                                <p className={`text-xs text-center leading-tight ${active ? "text-primary font-semibold" : done ? "text-success font-medium" : "text-default-400"}`}>
                                    {STEP_LABELS[key].split(" ")[0]}
                                </p>
                            </div>
                            {idx < STEP_KEYS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 min-w-[20px] ${done ? "bg-success" : "bg-default-200"}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ══════════════════════════════════════════════════
          STEP 1 — LEAD & REGISTRATION
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="lead"
                current={currentStepIdx === 0}
                completed={completedSteps.lead}
                onClick={() => handleSave("lead")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="Personal Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <Input label="Full Name" value={leadData.fullName} onValueChange={(v) => setLeadData((p) => ({ ...p, fullName: v }))} size="sm" />
                            <Input label="Passport Number" value={leadData.passport} onValueChange={(v) => setLeadData((p) => ({ ...p, passport: v }))} size="sm" />
                            <Input label="Date of Birth" type="date" value={leadData.dob} onValueChange={(v) => setLeadData((p) => ({ ...p, dob: v }))} size="sm" />
                            <Input label="NIC Number" value={leadData.nic} onValueChange={(v) => setLeadData((p) => ({ ...p, nic: v }))} size="sm" />
                            <Input label="Phone Number" value={leadData.phone} onValueChange={(v) => setLeadData((p) => ({ ...p, phone: v }))} size="sm" />
                            <Input label="Email Address" type="email" value={leadData.email} onValueChange={(v) => setLeadData((p) => ({ ...p, email: v }))} size="sm" />
                            <Input label="Emergency Contact" value={leadData.emergencyContact} onValueChange={(v) => setLeadData((p) => ({ ...p, emergencyContact: v }))} size="sm" />
                        </div>
                        <Textarea label="Address" value={leadData.address} onValueChange={(v) => setLeadData((p) => ({ ...p, address: v }))} size="sm" minRows={2} />
                    </Section>

                    <Section title="Job Details">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Input label="Job Applied" value={leadData.jobApplied} onValueChange={(v) => setLeadData((p) => ({ ...p, jobApplied: v }))} size="sm" />
                            <Input label="Destination Country" value={leadData.country} onValueChange={(v) => setLeadData((p) => ({ ...p, country: v }))} size="sm" />
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-default-500">Category</label>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            size="sm"
                                            className="w-full justify-between font-normal text-sm"
                                            endContent={<span className="text-default-400 text-xs">▼</span>}
                                        >
                                            {leadData.category}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Category">
                                        <DropdownItem key="Skilled" onPress={() => setLeadData((p) => ({ ...p, category: "Skilled" as any }))}>Skilled</DropdownItem>
                                        <DropdownItem key="Semi-Skilled" onPress={() => setLeadData((p) => ({ ...p, category: "Semi-Skilled" as any }))}>Semi-Skilled</DropdownItem>
                                        <DropdownItem key="Unskilled" onPress={() => setLeadData((p) => ({ ...p, category: "Unskilled" as any }))}>Unskilled</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </Section>

                    <Section title="Documents & Photo">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUploadZone label="Candidate Photo" accept="image/*" files={leadPhoto} onFiles={setLeadPhoto} multiple={false} />
                            <FileUploadZone label="Supporting Documents (Passport copy, NIC, etc.)" accept=".pdf,.jpg,.jpeg,.png" files={leadDocs} onFiles={setLeadDocs} />
                        </div>
                    </Section>

                    <div className="flex justify-end">
                        <Button color="primary" size="sm" onPress={() => handleSave("lead")}>
                            💾 Save Lead Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* ══════════════════════════════════════════════════
          STEP 2 — INTERVIEW
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="interview"
                current={currentStepIdx === 1}
                completed={completedSteps.interview}
                onClick={() => handleSave("interview")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="Interview Scheduling">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-default-500">Interview Type</label>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            size="sm"
                                            className="w-full justify-between font-normal text-sm"
                                            endContent={<span className="text-default-400 text-xs">▼</span>}
                                        >
                                            {{
                                                zoom: "📹 Zoom (Video)",
                                                inperson: "🏢 In-Person",
                                                phone: "📞 Phone Call",
                                                employer: "🏭 Employer Visit",
                                            }[interviewData.type] ?? "Select type"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Interview Type">
                                        <DropdownItem key="zoom" onPress={() => setInterviewData((p) => ({ ...p, type: "zoom" }))}>📹 Zoom (Video)</DropdownItem>
                                        <DropdownItem key="inperson" onPress={() => setInterviewData((p) => ({ ...p, type: "inperson" }))}>🏢 In-Person</DropdownItem>
                                        <DropdownItem key="phone" onPress={() => setInterviewData((p) => ({ ...p, type: "phone" }))}>📞 Phone Call</DropdownItem>
                                        <DropdownItem key="employer" onPress={() => setInterviewData((p) => ({ ...p, type: "employer" }))}>🏭 Employer Visit</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <Input label="Scheduled Date" type="date" value={interviewData.scheduledDate} onValueChange={(v) => setInterviewData((p) => ({ ...p, scheduledDate: v }))} size="sm" />
                            <Input label="Scheduled Time" type="time" value={interviewData.scheduledTime} onValueChange={(v) => setInterviewData((p) => ({ ...p, scheduledTime: v }))} size="sm" />
                            <Input label="Interviewer Name" value={interviewData.interviewerName} onValueChange={(v) => setInterviewData((p) => ({ ...p, interviewerName: v }))} size="sm" />
                            {interviewData.type === "zoom" && (
                                <Input label="Zoom Meeting Link" value={interviewData.zoomLink} onValueChange={(v) => setInterviewData((p) => ({ ...p, zoomLink: v }))} size="sm" className="lg:col-span-2" />
                            )}
                        </div>
                    </Section>

                    <Section title="Interview Result">
                        <div className="flex flex-col gap-3">
                            <RadioGroup
                                label="Result"
                                orientation="horizontal"
                                value={interviewData.result}
                                onValueChange={(v) => setInterviewData((p) => ({ ...p, result: v }))}
                                size="sm"
                            >
                                <Radio value="pending">⏳ Pending</Radio>
                                <Radio value="passed">✅ Passed</Radio>
                                <Radio value="failed">❌ Failed</Radio>
                                <Radio value="rescheduled">🔄 Reschedule</Radio>
                            </RadioGroup>
                            <Textarea label="Interview Notes" value={interviewData.notes} onValueChange={(v) => setInterviewData((p) => ({ ...p, notes: v }))} size="sm" minRows={3} placeholder="Skills assessment, employer feedback, special observations…" />
                        </div>
                    </Section>

                    <Section title="Interview Recording & Documents">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUploadZone label="Interview Recording (Video)" accept="video/*,.mp4,.mov,.avi" files={interviewVideos} onFiles={setInterviewVideos} />
                            <FileUploadZone label="Interview Documents (Result letter, score sheet)" accept=".pdf,.jpg,.jpeg,.png" files={interviewDocs} onFiles={setInterviewDocs} />
                        </div>
                    </Section>

                    <div className="flex justify-end gap-2">
                        <Button variant="bordered" size="sm" color="secondary" onPress={() => alert("📧 Interview invitation sent!")}>
                            📧 Send Zoom Invite
                        </Button>
                        <Button color="primary" size="sm" onPress={() => handleSave("interview")}>
                            💾 Save Interview Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* ══════════════════════════════════════════════════
          STEP 3 — MEDICAL
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="medical"
                current={currentStepIdx === 2}
                completed={completedSteps.medical}
                onClick={() => handleSave("medical")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="Medical Examination Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <Input label="Hospital / Medical Center" value={medicalData.hospital} onValueChange={(v) => setMedicalData((p) => ({ ...p, hospital: v }))} size="sm" placeholder="e.g. Nawaloka Hospital" />
                            <Input label="Exam Date" type="date" value={medicalData.examDate} onValueChange={(v) => setMedicalData((p) => ({ ...p, examDate: v }))} size="sm" />
                            <Input label="Doctor Name" value={medicalData.doctorName} onValueChange={(v) => setMedicalData((p) => ({ ...p, doctorName: v }))} size="sm" />
                        </div>
                    </Section>

                    <Section title="Medical Measurements">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Input label="BP Systolic (mmHg)" type="number" value={medicalData.bpSystolic} onValueChange={(v) => setMedicalData((p) => ({ ...p, bpSystolic: v }))} size="sm" />
                            <Input label="BP Diastolic (mmHg)" type="number" value={medicalData.bpDiastolic} onValueChange={(v) => setMedicalData((p) => ({ ...p, bpDiastolic: v }))} size="sm" />
                            <Input label="Height (cm)" type="number" value={medicalData.height} onValueChange={(v) => setMedicalData((p) => ({ ...p, height: v }))} size="sm" />
                            <Input label="Weight (kg)" type="number" value={medicalData.weight} onValueChange={(v) => setMedicalData((p) => ({ ...p, weight: v }))} size="sm" />
                        </div>
                    </Section>

                    <Section title="Medical Result">
                        <RadioGroup
                            label="Examination Result"
                            orientation="horizontal"
                            value={medicalData.result}
                            onValueChange={(v) => setMedicalData((p) => ({ ...p, result: v }))}
                            size="sm"
                        >
                            <Radio value="pending">⏳ Pending</Radio>
                            <Radio value="passed">✅ Passed</Radio>
                            <Radio value="failed">❌ Failed</Radio>
                            <Radio value="re_test">🔄 Re-test Required</Radio>
                        </RadioGroup>
                        {medicalData.result === "re_test" && (
                            <Input label="Re-test Scheduled Date" type="date" value={medicalData.retestDate} onValueChange={(v) => setMedicalData((p) => ({ ...p, retestDate: v }))} size="sm" className="max-w-xs mt-2" />
                        )}
                        <Textarea label="Medical Notes / Observations" value={medicalData.notes} onValueChange={(v) => setMedicalData((p) => ({ ...p, notes: v }))} size="sm" minRows={2} placeholder="Any medical findings, conditions, remarks from doctor…" />
                    </Section>

                    <Section title="Medical Documents & X-Ray Images">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUploadZone label="Medical Report (PDF)" accept=".pdf" files={medicalDocs} onFiles={setMedicalDocs} />
                            <FileUploadZone label="X-Ray / Lab Images" accept="image/*,.jpg,.jpeg,.png,.dcm" files={medicalImages} onFiles={setMedicalImages} />
                        </div>
                    </Section>

                    <div className="flex justify-end">
                        <Button color="primary" size="sm" onPress={() => handleSave("medical")}>
                            💾 Save Medical Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* ══════════════════════════════════════════════════
          STEP 4 — VISA PROCESSING
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="visa"
                current={currentStepIdx === 3}
                completed={completedSteps.visa}
                onClick={() => handleSave("visa")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="Visa Application Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <Input label="Visa Application Number" value={visaData.applicationNo} onValueChange={(v) => setVisaData((p) => ({ ...p, applicationNo: v }))} size="sm" />
                            <Input label="Submission Date" type="date" value={visaData.submissionDate} onValueChange={(v) => setVisaData((p) => ({ ...p, submissionDate: v }))} size="sm" />
                            <Input label="Expected Approval Date" type="date" value={visaData.expectedDate} onValueChange={(v) => setVisaData((p) => ({ ...p, expectedDate: v }))} size="sm" />
                            <Input label="Embassy / Consulate" value={visaData.embassy} onValueChange={(v) => setVisaData((p) => ({ ...p, embassy: v }))} size="sm" placeholder="e.g. Embassy of Qatar, Colombo" />
                            <Input label="Visa Type" value={visaData.visaType} onValueChange={(v) => setVisaData((p) => ({ ...p, visaType: v }))} size="sm" placeholder="e.g. Employment Visa - Category D" />
                            <Input label="Agency Reference No." value={visaData.agentRef} onValueChange={(v) => setVisaData((p) => ({ ...p, agentRef: v }))} size="sm" />
                        </div>
                        <Textarea label="Notes" value={visaData.notes} onValueChange={(v) => setVisaData((p) => ({ ...p, notes: v }))} size="sm" minRows={2} placeholder="Agent communications, embassy requirements, follow-up actions…" />
                    </Section>

                    <Section title="Visa Documents">
                        <FileUploadZone label="Visa Copy & Supporting Documents (Stamped passport page, approval letters)" accept=".pdf,.jpg,.jpeg,.png" files={visaDocs} onFiles={setVisaDocs} />
                    </Section>

                    <div className="flex justify-end">
                        <Button color="primary" size="sm" onPress={() => handleSave("visa")}>
                            💾 Save Visa Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* ══════════════════════════════════════════════════
          STEP 5 — SLBFE / BUREAU
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="slbfe"
                current={currentStepIdx === 4}
                completed={completedSteps.slbfe}
                onClick={() => handleSave("slbfe")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="SLBFE Registration">
                        <div className="flex items-center gap-3 mb-2">
                            <Switch
                                isSelected={slbfeData.registered}
                                onValueChange={(v) => setSlbfeData((p) => ({ ...p, registered: v }))}
                                color="success"
                                size="md"
                            >
                                <span className="font-semibold">Registration Completed</span>
                            </Switch>
                            {slbfeData.registered && (
                                <Chip size="sm" color="success" variant="flat">✓ Registered</Chip>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <Input label="SLBFE Registration Number" value={slbfeData.registrationNo} onValueChange={(v) => setSlbfeData((p) => ({ ...p, registrationNo: v }))} size="sm" isDisabled={!slbfeData.registered} />
                            <Input label="Registration Date" type="date" value={slbfeData.registrationDate} onValueChange={(v) => setSlbfeData((p) => ({ ...p, registrationDate: v }))} size="sm" isDisabled={!slbfeData.registered} />
                            <Input label="Registration Center" value={slbfeData.centerName} onValueChange={(v) => setSlbfeData((p) => ({ ...p, centerName: v }))} size="sm" isDisabled={!slbfeData.registered} placeholder="e.g. SLBFE Colombo" />
                        </div>
                        <Textarea label="Notes" value={slbfeData.notes} onValueChange={(v) => setSlbfeData((p) => ({ ...p, notes: v }))} size="sm" minRows={2} placeholder="Any SLBFE requirements, training completion, insurance details…" />
                    </Section>

                    <Section title="SLBFE Documents">
                        <FileUploadZone label="SLBFE Card & Registration Documents" accept=".pdf,.jpg,.jpeg,.png" files={slbfeDocs} onFiles={setSlbfeDocs} />
                    </Section>

                    <div className="flex justify-end">
                        <Button color="primary" size="sm" onPress={() => handleSave("slbfe")}>
                            💾 Save SLBFE Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* ══════════════════════════════════════════════════
          STEP 6 — FLIGHT & DEPARTURE
      ══════════════════════════════════════════════════ */}
            <StepCard
                stepKey="flight"
                current={currentStepIdx === 5}
                completed={completedSteps.flight}
                onClick={() => handleSave("flight")}
            >
                <div className="flex flex-col gap-6">
                    <Section title="Flight Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <Input label="Airline" value={flightData.airline} onValueChange={(v) => setFlightData((p) => ({ ...p, airline: v }))} size="sm" placeholder="e.g. Emirates, Qatar Airways" />
                            <Input label="Flight Number" value={flightData.flightNo} onValueChange={(v) => setFlightData((p) => ({ ...p, flightNo: v }))} size="sm" placeholder="e.g. EK 344" />
                            <Input label="Departure Date" type="date" value={flightData.departureDate} onValueChange={(v) => setFlightData((p) => ({ ...p, departureDate: v }))} size="sm" />
                            <Input label="Departure Time" type="time" value={flightData.departureTime} onValueChange={(v) => setFlightData((p) => ({ ...p, departureTime: v }))} size="sm" />
                            <Input label="Seat Number" value={flightData.seatNo} onValueChange={(v) => setFlightData((p) => ({ ...p, seatNo: v }))} size="sm" placeholder="e.g. 24A" />
                            <Input label="Terminal" value={flightData.terminal} onValueChange={(v) => setFlightData((p) => ({ ...p, terminal: v }))} size="sm" placeholder="e.g. Terminal B" />
                            <Input label="Departure Airport" value={flightData.departureAirport} onValueChange={(v) => setFlightData((p) => ({ ...p, departureAirport: v }))} size="sm" />
                            <Input label="Arrival Airport" value={flightData.arrivalAirport} onValueChange={(v) => setFlightData((p) => ({ ...p, arrivalAirport: v }))} size="sm" placeholder="e.g. Hamad Intl, Doha" />
                        </div>
                        <Textarea label="Special Notes" value={flightData.notes} onValueChange={(v) => setFlightData((p) => ({ ...p, notes: v }))} size="sm" minRows={2} placeholder="Airport reporting time, luggage allowance, contact on arrival…" />
                    </Section>

                    <Section title="Flight Ticket & Travel Documents">
                        <FileUploadZone label="E-Ticket, Boarding Pass & Travel Documents" accept=".pdf,.jpg,.jpeg,.png" files={flightDocs} onFiles={setFlightDocs} />
                    </Section>

                    <div className="flex justify-end gap-2">
                        <Button variant="bordered" size="sm" color="success" onPress={() => alert("🎫 Ticket Handover document generated!")}>
                            🎫 Generate Handover
                        </Button>
                        <Button color="primary" size="sm" onPress={() => handleSave("flight")}>
                            💾 Save Flight Data
                        </Button>
                    </div>
                </div>
            </StepCard>

            {/* Audit Footer */}
            <Divider />
            <p className="text-xs text-default-400 italic">
                Last edited by Admin at {new Date().toLocaleTimeString("en-LK", { hour: "2-digit", minute: "2-digit" })} on 02/03/2026. All changes are logged.
            </p>
        </div>
    );
};
