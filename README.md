<div align="center">

# AuditEye-II

### AI-Powered Enterprise Auditing Platform

Analyze business documents, compare datasets, and verify compliance against organizational policies using intelligent AI workflows.

---

Built with **React**, **TypeScript**, **n8n**, and **Fireworks AI**

</div>

---

## Overview

AuditEye-II is an AI-powered auditing platform designed to streamline enterprise document review and compliance verification.

Instead of manually reviewing procurement records, invoices, receipts, contracts, expense reports, or supporting documents, users upload their files and organization policies. AuditEye-II automatically determines the appropriate auditing workflow, performs intelligent analysis, and generates structured audit insights.

The platform adapts to the uploaded evidence rather than forcing users into predefined workflows, making it suitable for a wide range of business auditing scenarios.

---

# Features

### AI Audit Intelligence

- AI-powered document auditing
- Executive audit summaries
- Compliance verification
- Risk assessment
- Missing information detection
- Actionable recommendations

---

### AI Comparison Engine

Automatically compares related datasets such as:

- Procurement vs Vendor Quotations
- Procurement vs Internal Catalog
- Procurement vs Invoice
- Financial Reports
- Custom Business Documents

Detects:

- Price discrepancies
- Missing records
- Policy violations
- Inconsistencies
- Potential fraud indicators

---

### Policy-Aware Auditing

Upload your organization's policies and AuditEye-II will:

- Validate compliance
- Detect policy violations
- Flag manual verification requirements
- Explain audit findings with supporting reasoning

---

### Modular AI Workflow

AuditEye-II automatically selects the appropriate workflow based on uploaded files.

- AI Audit
- Dataset Comparison
- Policy Verification

Future workflows can be added without changing the frontend.

---

## Architecture

```
                React Frontend
                      │
                      ▼
               n8n Workflow Engine
                      │
      ┌───────────────┼───────────────┐
      │               │               │
      ▼               ▼               ▼
 AI Audit      AI Comparison     Policy Engine
      │               │               │
      └───────────────┼───────────────┘
                      ▼
              Fireworks AI Models
                      │
                      ▼
             Structured Audit Output
```

---

# Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- Vite

### Workflow Automation

- n8n

### AI

- Fireworks AI
- OpenAI Compatible Models

### Other

- Markdown Reporting
- CSV Export
- REST API Integration

---

# Demo Workflows

## AI Audit

Upload:

- Procurement Records
- Organization Policy

Output:

- Executive Summary
- Risk Assessment
- Findings
- Recommendations
- Compliance Report

---

## AI Comparison

Upload:

- Procurement Records
- Vendor Quotes

Output:

- Data Comparison
- Price Variance
- Missing Records
- Discrepancies
- Audit Findings

---

## Project Structure

```
AuditEye-II
│
├── frontend/
├── n8n/
├── public/
├── screenshots/
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

# Future Roadmap

- OCR-powered document extraction
- Data normalization workflows
- ERP integrations
- Knowledge Base (RAG)
- Multi-organization workspaces
- Audit history
- Role-based access control
- Dashboard analytics
- Batch auditing
- Cloud deployment

---

# Why AuditEye-II?

Traditional auditing requires significant manual effort to review documents, compare records, and verify organizational policies.

AuditEye-II accelerates this process by combining intelligent document analysis, policy-aware reasoning, and automated dataset comparison into a single AI-powered workflow—helping auditors focus on decision-making rather than repetitive review.

---

# Authors

**Jairus Meneses**

Aspiring Student Developer

---

# Acknowledgements

Built during a hackathon using:

- Fireworks AI
- AMD Instinct™ GPUs
- n8n
- React
- TypeScript

---

## License

This project is licensed under the MIT License.
