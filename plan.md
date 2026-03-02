Since you are using **Claude Code** to generate the demo, providing a highly structured `.md` file with explicit UI/UX requirements and data schemas will ensure the AI generates high-quality, functional code.

This plan focuses on a **React + Tailwind** implementation with "Rich Data"—meaning we aren't just showing names, we are showing the details that matter to a Sri Lankan agency (Passport numbers, SLBFE status, etc.).

---

# Implementation Plan: Prudential Agency Demo (PAMS)

## 1. Project Setup

* **Framework:** React (Vite) + Tailwind CSS.
* **Data Strategy:** A local `mockData.js` file containing a `candidates` array and a `jobOrders` array.
* **Navigation:** A simple Sidebar for: Dashboard, Job Orders, Candidates, and Payments.

---

## 2. Global Mock Data (Rich Data Example)

Claude Code should use this structure for the "Rich Data" feel:

```javascript
const candidates = [
  {
    id: "CAN-001",
    name: "Pathum Kumara",
    passport: "N8823412",
    jobApplied: "Heavy Vehicle Driver - Qatar",
    category: "Skilled",
    status: "Visa Processing",
    medicalStatus: "Passed",
    payments: { total: 150000, paid: 50000, balance: 100000 },
    docs: ["Passport_Copy.pdf", "License_Front.jpg"],
    pipeline: [
      { step: "Lead", date: "2026-02-01", completed: true },
      { step: "Interview", date: "2026-02-10", completed: true },
      { step: "Medical", date: "2026-02-15", completed: true },
      { step: "Visa", date: "Pending", completed: false },
      { step: "Flight", date: "Pending", completed: false },
    ]
  }
];

```

---

## 3. Screen-by-Screen Requirements

### **Screen 1: The Management Dashboard**

* **Goal:** Visual summary of the agency "Health."
* **Components:**
* **Stat Cards:** Total Leads (24), Pending Medicals (5), Ready for Flight (3), Total Revenue (LKR 1.2M).
* **Urgent Tasks:** A "Notifications" list showing: *"Pathum's Passport expires in 3 months"* or *"Romania Job Order 90% full."*



### **Screen 2: Job Order Board (Step 1)**

* **Goal:** Show how the agency organizes foreign offers.
* **Table Columns:** Order ID, Country (with Flag icon), Category (3-level), Vacancies (e.g., 5/10 filled), and Age Limit.
* **Detail View:** Clicking a Job Order shows the "Job Filter" requirements (Exp: 2yrs, Gender: Male, Qualification: NVQ Level 4).

### **Screen 3: Candidate Selection Pipeline (Steps 3-6)**

* **Goal:** Show the "AI Matching" and "Interview" logic.
* **Layout:** A Split Screen.
* **Left Side:** List of new applicants.
* **Right Side:** "AI Score" (e.g., 95% Match) and a big **"Schedule Zoom Interview"** button.


* **Visual:** A simple status badge: `[Unskilled - Direct Selection]` or `[Skilled - Interview Required]`.

### **Screen 4: The Progress Tracker (Steps 7-9)**

* **Goal:** The most detailed screen. Visualize the individual journey.
* **Visual Element:** A vertical or horizontal **Stepper** (Timeline).
1. **Offer Letter:** Show a "Download PDF" icon.
2. **Medical:** Color-coded status (Green: Pass, Red: Fail, Yellow: Re-test).
3. **Visa:** Fields for "Submission Date" and "Expected Date."
4. **Bureau (SLBFE):** Toggle for "Registration Completed."



### **Screen 5: Final Verification & Finance (Step 10)**

* **Goal:** The "Safety Lock" before flying.
* **UI Components:**
* **Payment Table:** List of installments (LKR 20,000 for Medical, LKR 50,000 for Visa). Show "Balance to Settle."
* **Final Checklist:** 4 Checkboxes that must be ticked before the "Generate Ticket Handover" button becomes active.
* **Audit Log Snippet:** Small text at the bottom: *"Last edited by Admin at 14:20 on 02/03/2026."*



---

## 4. Claude Code Prompt Strategy

When you start generating with Claude Code, use this prompt:

> "Create a  frontend demo for a Recruitment Agency. I have an `.md` plan. Start by creating a `Dashboard` with summary cards. Then, create a `CandidateProfile` component that visualizes a 10-step recruitment pipeline using a Stepper. Use rich mock data including Passport numbers and LKR payment balances. Focus on a clean, professional 'Enterprise' look."

