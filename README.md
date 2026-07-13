<div align="center">

# AuditEye-II

### AI-Powered Policy-Aware Auditing Platform

Analyze business documents, compare datasets, and verify compliance against organizational policies using intelligent AI workflows.

**Built with React • TypeScript • n8n • Fireworks AI**

</div>

---

# Overview

AuditEye-II is an AI-powered auditing platform that streamlines document review, compliance verification, and dataset comparison.

Instead of manually inspecting procurement records, invoices, quotations, expense reports, contracts, and supporting documents, users simply upload their files together with organizational policies. AuditEye-II intelligently determines the appropriate auditing workflow, performs AI-assisted analysis, and generates structured audit insights.

Designed with a modular architecture, AuditEye-II can easily support additional auditing workflows as the platform evolves.

---

# Features

## AI Audit Intelligence

- AI-powered document auditing
- Executive audit summaries
- Policy compliance verification
- Risk assessment
- Missing information detection
- Actionable recommendations

---

## AI Comparison Engine

Automatically compares related datasets, including:

- Procurement vs Vendor Quotations
- Procurement vs Internal Catalog
- Procurement vs Invoices
- Financial Reports
- Custom Business Documents

Detects:

- Price discrepancies
- Missing records
- Policy violations
- Data inconsistencies
- Potential fraud indicators

---

## Policy-Aware Auditing

Upload organizational policies and AuditEye-II automatically:

- Validates compliance
- Detects policy violations
- Flags manual verification requirements
- Explains findings with contextual reasoning

---

## Modular Workflow Architecture

AuditEye-II dynamically selects the appropriate workflow depending on the uploaded evidence.

Current workflows include:

- AI Audit
- Dataset Comparison
- Policy Verification

The backend workflow is designed to support future AI modules without requiring frontend modifications.

---

# Architecture

```text
                React + TypeScript
                       │
                       ▼
                 n8n Workflow Engine
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   AI Audit     Dataset Comparison   Policy Engine
        │              │              │
        └──────────────┼──────────────┘
                       ▼
             Fireworks AI (DeepSeek V3)
                       │
                       ▼
          Structured Audit Intelligence
```

---

# AI Infrastructure

AuditEye-II uses **Fireworks AI** as its inference platform.

The n8n workflow dynamically routes requests through **Fireworks AI** using **DeepSeek V3**, automatically selecting the appropriate auditing pipeline based on the uploaded documents and user instructions.

---

# Fireworks AI Integration

Fireworks AI powers:

- AI Audit Intelligence
- Policy Compliance Verification
- Multi-Document Comparison
- Executive Audit Report Generation

The repository includes the complete **n8n workflow JSON**, allowing reviewers to inspect the orchestration and Fireworks AI integration used throughout the application.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

## Workflow Automation

- n8n

## AI

- Fireworks AI
- DeepSeek V3

## Output

- Executive Audit Reports
- Markdown Reporting
- CSV Export
- REST API Integration

---

# Demo Workflows

## AI Audit

Upload:

- Procurement Records
- Organization Policies

Produces:

- Executive Summary
- Compliance Verification
- Risk Assessment
- Audit Findings
- Recommendations

---

## AI Comparison

Upload:

- Procurement Records
- Vendor Quotations
- Internal Catalogs
- Supporting Business Documents

Produces:

- Dataset Comparison
- Price Variance Analysis
- Missing Records
- Discrepancy Detection
- Audit Findings

---

# Sample Data

The repository includes sample datasets used during development and demonstration.

## AI Audit

- `standard_procurement.csv`
- `procurement_policy.txt`

## AI Comparison

- `standard_procurement.csv`
- `vendor_invoice.csv`
- `vendor_quote.csv`
- `internal_catalog.csv`

## Future Workflow

- `messy_purchase_log.txt`

The datasets contain fictional information and are intended solely for demonstration purposes.

---

# Repository Structure

```text
AuditEye-II
│
├── n8n/
│   └── AuditEye-II-Workflow.json
│
├── sample-data/
│
├── public/
│
├── src/
│
├── README.md
│
└── LICENSE
```

---

# Installation

Clone the repository.

```bash
git clone https://github.com/jairusgadmeneses/AuditEye-II.git
```

Navigate into the project.

```bash
cd AuditEye-II
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

---

# Roadmap

Future enhancements include:

- OCR-powered document extraction
- Data normalization workflows
- Retrieval-Augmented Generation (RAG)
- ERP integrations
- Audit history
- Role-based access control
- Dashboard analytics
- Batch document auditing
- Cloud deployment

---

# Why AuditEye-II?

Traditional auditing often requires manually reviewing documents, comparing datasets, and interpreting organizational policies.

AuditEye-II accelerates this process by combining AI-assisted document analysis, policy-aware reasoning, and intelligent dataset comparison into a unified workflow—allowing auditors to focus on decision-making rather than repetitive manual verification.

---

# Author

**Jairus Meneses**

Aspiring Student Developer

---

# Acknowledgements

Built during the **AMD AI Hackathon** using:

- Fireworks AI
- DeepSeek V3
- n8n
- React
- TypeScript
- Tailwind CSS

Frontend development was initially scaffolded with assistance from **Natively AI** and later customized and extended throughout development.

Special thanks to the AMD AI Hackathon organizers, Fireworks AI, Natively AI, and the open-source community for providing the tools and infrastructure that made this project possible.

---

# License

This project is licensed under the MIT License.
