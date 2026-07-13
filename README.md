<div align="center">

# AuditEye-II

### AI-Powered Policy-Aware Auditing Platform

Analyze business documents, compare datasets, and verify compliance against organizational policies using intelligent AI workflows.

**Built with React • TypeScript • n8n • Fireworks AI**

</div>

---

## Overview

AuditEye-II is an AI-powered auditing platform that streamlines document review, compliance verification, and dataset comparison.

Instead of manually inspecting procurement records, invoices, quotations, expense reports, contracts, and supporting documents, users simply upload their files together with organizational policies. AuditEye-II automatically determines the appropriate auditing workflow, performs intelligent analysis, and generates structured audit insights.

The platform is designed with a modular architecture, allowing additional AI workflows to be integrated as the product evolves.

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

The backend architecture is designed to support future auditing modules without requiring frontend modifications.

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

The backend routes AI requests through Fireworks AI using **DeepSeek V3**, orchestrated by an n8n workflow that dynamically selects the appropriate auditing pipeline based on uploaded documents.

---

# Fireworks AI Integration

Fireworks AI powers:

- AI Audit Intelligence
- Policy Compliance Verification
- Multi-Document Comparison
- Executive Audit Report Generation

The repository includes the complete **n8n workflow JSON**, allowing reviewers to inspect the backend orchestration and Fireworks AI integration.

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
- Discrepancy Detection
- Price Variance Analysis
- Missing Records
- Audit Findings

---

# Repository Structure

```text
AuditEye-II
│
├── frontend/
├── n8n/
├── sample-data/
├── README.md
└── LICENSE
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/jairusgadmeneses/AuditEye-II.git
```

Navigate into the project

```bash
cd AuditEye-II
```

Install dependencies

```bash
npm install
```

Run the development server

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
- Batch auditing
- Cloud deployment

---

# Why AuditEye-II?

Traditional auditing often requires manually reviewing documents, comparing datasets, and interpreting organizational policies.

AuditEye-II accelerates this process by combining AI-assisted document analysis, policy-aware reasoning, and intelligent dataset comparison into a unified workflow—helping auditors focus on decision-making rather than repetitive manual verification.

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
