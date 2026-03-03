// Central mock data for PAMS - Prudential Agency Management System

export const dashboardStats = {
    totalLeads: 24,
    pendingMedicals: 5,
    readyForFlight: 3,
    totalRevenueLKR: 1200000,
    activeJobOrders: 6,
    placedThisMonth: 8,
};

export const urgentNotifications = [
    {
        id: "N001",
        type: "passport",
        priority: "high",
        message: "Pathum Kumara's Passport expires in 3 months",
        candidate: "CAN-001",
        date: "2026-05-10",
    },
    {
        id: "N002",
        type: "jobOrder",
        priority: "medium",
        message: "Romania Job Order JO-004 is 90% full (9/10 vacancies)",
        candidate: null,
        date: "2026-03-02",
    },
    {
        id: "N003",
        type: "medical",
        priority: "high",
        message: "Suresh Rajapaksha's medical re-test is overdue",
        candidate: "CAN-003",
        date: "2026-02-28",
    },
    {
        id: "N004",
        type: "visa",
        priority: "medium",
        message: "Visa approval pending for 3 candidates — Qatar batch",
        candidate: null,
        date: "2026-03-01",
    },
    {
        id: "N005",
        type: "flight",
        priority: "low",
        message: "Nimal Perera is flight-ready — book ticket before Mar 10",
        candidate: "CAN-005",
        date: "2026-03-02",
    },
];

export const recentActivity = [
    {
        id: "A001",
        candidateName: "Pathum Kumara",
        avatar: "https://i.pravatar.cc/150?u=pam001",
        event: "Visa Application Submitted",
        amount: "LKR 50,000",
        date: "2026-03-01",
    },
    {
        id: "A002",
        candidateName: "Nimal Perera",
        avatar: "https://i.pravatar.cc/150?u=pam002",
        event: "Medical Clearance Received",
        amount: "LKR 20,000",
        date: "2026-02-28",
    },
    {
        id: "A003",
        candidateName: "Sisira Bandara",
        avatar: "https://i.pravatar.cc/150?u=pam003",
        event: "Offer Letter Signed",
        amount: "LKR 5,000",
        date: "2026-02-26",
    },
    {
        id: "A004",
        candidateName: "Kamal Dissanayake",
        avatar: "https://i.pravatar.cc/150?u=pam004",
        event: "SLBFE Registration Done",
        amount: "LKR 10,000",
        date: "2026-02-25",
    },
    {
        id: "A005",
        candidateName: "Ruwan Jayawardena",
        avatar: "https://i.pravatar.cc/150?u=pam005",
        event: "Interview Scheduled",
        amount: "—",
        date: "2026-02-24",
    },
];

export type PipelineStep = {
    step: string;
    date: string;
    completed: boolean;
    details?: string;
};

export type Candidate = {
    id: string;
    name: string;
    passport: string;
    jobApplied: string;
    jobOrderId: string;
    country: string;
    category: "Skilled" | "Unskilled" | "Semi-Skilled";
    status:
    | "Lead"
    | "Interview"
    | "Medical"
    | "Visa Processing"
    | "SLBFE"
    | "Flight Ready"
    | "Departed";
    medicalStatus: "Passed" | "Failed" | "Re-test" | "Pending";
    aiScore: number;
    payments: { total: number; paid: number; balance: number };
    installments: {
        description: string;
        amount: number;
        paid: boolean;
        date: string;
    }[];
    docs: string[];
    slbfeRegistered: boolean;
    visaSubmissionDate: string;
    visaExpectedDate: string;
    pipeline: PipelineStep[];
    avatar: string;
};

export const candidates: Candidate[] = [
    {
        id: "CAN-001",
        name: "Pathum Kumara",
        passport: "N8823412",
        jobApplied: "Heavy Vehicle Driver - Qatar",
        jobOrderId: "JO-001",
        country: "Qatar",
        category: "Skilled",
        status: "Visa Processing",
        medicalStatus: "Passed",
        aiScore: 95,
        payments: { total: 150000, paid: 50000, balance: 100000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: true, date: "2026-02-15" },
            { description: "Visa Processing Fee", amount: 50000, paid: false, date: "2026-03-01" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "2026-03-10" },
            { description: "Ticket & Departure", amount: 70000, paid: false, date: "2026-03-25" },
        ],
        docs: ["Passport_Copy.pdf", "License_Front.jpg", "Medical_Report.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "2026-02-20",
        visaExpectedDate: "2026-03-15",
        pipeline: [
            { step: "Lead", date: "2026-02-01", completed: true },
            { step: "Interview", date: "2026-02-10", completed: true },
            { step: "Medical", date: "2026-02-15", completed: true, details: "Passed - Nawaloka Hospital" },
            { step: "Visa", date: "Pending", completed: false },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam001",
    },
    {
        id: "CAN-002",
        name: "Nimal Perera",
        passport: "N7712345",
        jobApplied: "Construction Worker - Saudi Arabia",
        jobOrderId: "JO-002",
        country: "Saudi Arabia",
        category: "Unskilled",
        status: "Flight Ready",
        medicalStatus: "Passed",
        aiScore: 78,
        payments: { total: 120000, paid: 120000, balance: 0 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: true, date: "2026-01-20" },
            { description: "Visa Processing Fee", amount: 50000, paid: true, date: "2026-02-01" },
            { description: "SLBFE Registration", amount: 10000, paid: true, date: "2026-02-10" },
            { description: "Ticket & Departure", amount: 40000, paid: true, date: "2026-02-25" },
        ],
        docs: ["Passport_Copy.pdf", "Medical_Report.pdf", "Visa_Copy.pdf", "SLBFE_Card.pdf"],
        slbfeRegistered: true,
        visaSubmissionDate: "2026-01-25",
        visaExpectedDate: "2026-02-15",
        pipeline: [
            { step: "Lead", date: "2026-01-05", completed: true },
            { step: "Interview", date: "2026-01-12", completed: true },
            { step: "Medical", date: "2026-01-20", completed: true, details: "Passed - Lanka Hospitals" },
            { step: "Visa", date: "2026-02-15", completed: true },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam002",
    },
    {
        id: "CAN-003",
        name: "Suresh Rajapaksha",
        passport: "N6601289",
        jobApplied: "Machine Operator - UAE",
        jobOrderId: "JO-003",
        country: "UAE",
        category: "Semi-Skilled",
        status: "Medical",
        medicalStatus: "Re-test",
        aiScore: 82,
        payments: { total: 130000, paid: 20000, balance: 110000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: true, date: "2026-02-10" },
            { description: "Visa Processing Fee", amount: 50000, paid: false, date: "" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "" },
            { description: "Ticket & Departure", amount: 50000, paid: false, date: "" },
        ],
        docs: ["Passport_Copy.pdf", "Work_Experience.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "",
        visaExpectedDate: "",
        pipeline: [
            { step: "Lead", date: "2026-02-05", completed: true },
            { step: "Interview", date: "2026-02-14", completed: true },
            { step: "Medical", date: "2026-02-20", completed: false, details: "Re-test required - BP issue" },
            { step: "Visa", date: "Pending", completed: false },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam003",
    },
    {
        id: "CAN-004",
        name: "Sisira Bandara",
        passport: "N9934567",
        jobApplied: "Security Guard - Bahrain",
        jobOrderId: "JO-005",
        country: "Bahrain",
        category: "Unskilled",
        status: "Interview",
        medicalStatus: "Pending",
        aiScore: 65,
        payments: { total: 100000, paid: 5000, balance: 95000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: false, date: "" },
            { description: "Visa Processing Fee", amount: 40000, paid: false, date: "" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "" },
            { description: "Ticket & Departure", amount: 30000, paid: false, date: "" },
        ],
        docs: ["Passport_Copy.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "",
        visaExpectedDate: "",
        pipeline: [
            { step: "Lead", date: "2026-02-20", completed: true },
            { step: "Interview", date: "2026-03-05", completed: false },
            { step: "Medical", date: "Pending", completed: false },
            { step: "Visa", date: "Pending", completed: false },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam004",
    },
    {
        id: "CAN-005",
        name: "Kamal Dissanayake",
        passport: "N5578901",
        jobApplied: "Electrician - Kuwait",
        jobOrderId: "JO-006",
        country: "Kuwait",
        category: "Skilled",
        status: "SLBFE",
        medicalStatus: "Passed",
        aiScore: 90,
        payments: { total: 140000, paid: 80000, balance: 60000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: true, date: "2026-02-05" },
            { description: "Visa Processing Fee", amount: 50000, paid: true, date: "2026-02-18" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "" },
            { description: "Ticket & Departure", amount: 60000, paid: false, date: "" },
        ],
        docs: ["Passport_Copy.pdf", "NVQ_Certificate.pdf", "Medical_Report.pdf", "Visa_Copy.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "2026-02-12",
        visaExpectedDate: "2026-03-01",
        pipeline: [
            { step: "Lead", date: "2026-01-25", completed: true },
            { step: "Interview", date: "2026-02-02", completed: true },
            { step: "Medical", date: "2026-02-05", completed: true, details: "Passed - Apollo Hospital" },
            { step: "Visa", date: "2026-03-01", completed: true },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam005",
    },
    {
        id: "CAN-006",
        name: "Ruwan Jayawardena",
        passport: "N4467823",
        jobApplied: "Welder - Romania",
        jobOrderId: "JO-004",
        country: "Romania",
        category: "Skilled",
        status: "Lead",
        medicalStatus: "Pending",
        aiScore: 88,
        payments: { total: 110000, paid: 0, balance: 110000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: false, date: "" },
            { description: "Visa Processing Fee", amount: 45000, paid: false, date: "" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "" },
            { description: "Ticket & Departure", amount: 35000, paid: false, date: "" },
        ],
        docs: ["Passport_Copy.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "",
        visaExpectedDate: "",
        pipeline: [
            { step: "Lead", date: "2026-03-01", completed: false },
            { step: "Interview", date: "Pending", completed: false },
            { step: "Medical", date: "Pending", completed: false },
            { step: "Visa", date: "Pending", completed: false },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam006",
    },
    {
        id: "CAN-007",
        name: "Chaminda Weerasinghe",
        passport: "N3356712",
        jobApplied: "Carpenter - Qatar",
        jobOrderId: "JO-001",
        country: "Qatar",
        category: "Skilled",
        status: "Departed",
        medicalStatus: "Passed",
        aiScore: 92,
        payments: { total: 150000, paid: 150000, balance: 0 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: true, date: "2026-01-10" },
            { description: "Visa Processing Fee", amount: 50000, paid: true, date: "2026-01-20" },
            { description: "SLBFE Registration", amount: 10000, paid: true, date: "2026-01-25" },
            { description: "Ticket & Departure", amount: 70000, paid: true, date: "2026-02-05" },
        ],
        docs: ["Passport_Copy.pdf", "NVQ_Certificate.pdf", "Medical_Report.pdf", "Visa_Copy.pdf", "SLBFE_Card.pdf", "Ticket.pdf"],
        slbfeRegistered: true,
        visaSubmissionDate: "2026-01-15",
        visaExpectedDate: "2026-02-01",
        pipeline: [
            { step: "Lead", date: "2025-12-20", completed: true },
            { step: "Interview", date: "2025-12-28", completed: true },
            { step: "Medical", date: "2026-01-10", completed: true, details: "Passed - Asiri Hospital" },
            { step: "Visa", date: "2026-02-01", completed: true },
            { step: "Flight", date: "2026-02-10", completed: true },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam007",
    },
    {
        id: "CAN-008",
        name: "Pradeep Fernando",
        passport: "N2245678",
        jobApplied: "Plumber - Saudi Arabia",
        jobOrderId: "JO-002",
        country: "Saudi Arabia",
        category: "Semi-Skilled",
        status: "Lead",
        medicalStatus: "Pending",
        aiScore: 71,
        payments: { total: 125000, paid: 0, balance: 125000 },
        installments: [
            { description: "Medical Examination", amount: 20000, paid: false, date: "" },
            { description: "Visa Processing Fee", amount: 50000, paid: false, date: "" },
            { description: "SLBFE Registration", amount: 10000, paid: false, date: "" },
            { description: "Ticket & Departure", amount: 45000, paid: false, date: "" },
        ],
        docs: ["Passport_Copy.pdf"],
        slbfeRegistered: false,
        visaSubmissionDate: "",
        visaExpectedDate: "",
        pipeline: [
            { step: "Lead", date: "2026-03-02", completed: false },
            { step: "Interview", date: "Pending", completed: false },
            { step: "Medical", date: "Pending", completed: false },
            { step: "Visa", date: "Pending", completed: false },
            { step: "Flight", date: "Pending", completed: false },
        ],
        avatar: "https://i.pravatar.cc/150?u=pam008",
    },
];

export type JobOrder = {
    id: string;
    country: string;
    flag: string;
    position: string;
    categoryLevel1: string;
    categoryLevel2: string;
    categoryLevel3: string;
    totalVacancies: number;
    filledVacancies: number;
    ageMin: number;
    ageMax: number;
    salary: string;
    currency: string;
    status: "Active" | "Closed" | "Pending";
    requirements: {
        experience: string;
        gender: string;
        qualification: string;
        language: string;
        other: string;
    };
    deadline: string;
};

export const jobOrders: JobOrder[] = [
    {
        id: "JO-001",
        country: "Qatar",
        flag: "qa",
        position: "Heavy Vehicle Driver",
        categoryLevel1: "Transport",
        categoryLevel2: "Driving",
        categoryLevel3: "HV License",
        totalVacancies: 10,
        filledVacancies: 7,
        ageMin: 25,
        ageMax: 45,
        salary: "1,800",
        currency: "QAR",
        status: "Active",
        requirements: {
            experience: "3 years HV driving",
            gender: "Male",
            qualification: "Valid HV License + NVQ Level 3",
            language: "Basic English",
            other: "Clean driving record required",
        },
        deadline: "2026-04-30",
    },
    {
        id: "JO-002",
        country: "Saudi Arabia",
        flag: "sa",
        position: "Construction Worker",
        categoryLevel1: "Construction",
        categoryLevel2: "General Labour",
        categoryLevel3: "Unskilled",
        totalVacancies: 20,
        filledVacancies: 12,
        ageMin: 20,
        ageMax: 40,
        salary: "1,200",
        currency: "SAR",
        status: "Active",
        requirements: {
            experience: "No experience required",
            gender: "Male",
            qualification: "G.C.E. O/L minimum",
            language: "None",
            other: "Medical fitness mandatory",
        },
        deadline: "2026-05-15",
    },
    {
        id: "JO-003",
        country: "UAE",
        flag: "ae",
        position: "Machine Operator",
        categoryLevel1: "Manufacturing",
        categoryLevel2: "Operations",
        categoryLevel3: "Semi-Skilled",
        totalVacancies: 8,
        filledVacancies: 5,
        ageMin: 22,
        ageMax: 40,
        salary: "1,500",
        currency: "AED",
        status: "Active",
        requirements: {
            experience: "1-2 years machine operation",
            gender: "Male",
            qualification: "NVQ Level 2 preferred",
            language: "Basic English",
            other: "Shift work (12 hrs). Accommodation provided",
        },
        deadline: "2026-04-20",
    },
    {
        id: "JO-004",
        country: "Romania",
        flag: "ro",
        position: "Welder (MIG/TIG)",
        categoryLevel1: "Construction",
        categoryLevel2: "Skilled Trades",
        categoryLevel3: "Skilled",
        totalVacancies: 10,
        filledVacancies: 9,
        ageMin: 23,
        ageMax: 42,
        salary: "€900",
        currency: "EUR",
        status: "Active",
        requirements: {
            experience: "2+ years welding (MIG/TIG)",
            gender: "Any",
            qualification: "Welding Certification or NVQ Level 4",
            language: "None",
            other: "EU work permit processed by employer",
        },
        deadline: "2026-03-31",
    },
    {
        id: "JO-005",
        country: "Bahrain",
        flag: "bh",
        position: "Security Guard",
        categoryLevel1: "Security",
        categoryLevel2: "Guard Services",
        categoryLevel3: "Unskilled",
        totalVacancies: 15,
        filledVacancies: 6,
        ageMin: 21,
        ageMax: 38,
        salary: "250",
        currency: "BHD",
        status: "Active",
        requirements: {
            experience: "Military/police background preferred",
            gender: "Male",
            qualification: "G.C.E. A/L or equivalent",
            language: "English + Arabic (basic)",
            other: "Height min 5'8\". Security training provided",
        },
        deadline: "2026-06-01",
    },
    {
        id: "JO-006",
        country: "Kuwait",
        flag: "kw",
        position: "Electrician",
        categoryLevel1: "Construction",
        categoryLevel2: "Electrical",
        categoryLevel3: "Skilled",
        totalVacancies: 6,
        filledVacancies: 2,
        ageMin: 24,
        ageMax: 45,
        salary: "450",
        currency: "KWD",
        status: "Active",
        requirements: {
            experience: "3+ years industrial electrical work",
            gender: "Male",
            qualification: "NVQ Level 4 Electrical or City & Guilds",
            language: "Basic English",
            other: "Accommodation & food provided. 2yr contract",
        },
        deadline: "2026-05-30",
    },
];
