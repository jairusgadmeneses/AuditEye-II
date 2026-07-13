<div align="center">

# AuditEye-II

### AI-Powered Enterprise Auditing Platform

Automate document auditing, dataset comparison, and policy-aware compliance verification using intelligent AI workflows.

**Built with React • TypeScript • n8n • Fireworks AI • AMD Instinct™ GPUs**

---

</div>

# Overview

AuditEye-II is an AI-powered auditing platform that streamlines enterprise document review and compliance verification.

Instead of manually reviewing procurement records, invoices, receipts, contracts, expense reports, and supporting documents, users simply upload their files together with their organization's policies. AuditEye-II automatically determines the appropriate audit workflow, performs intelligent analysis, and generates structured audit insights.

Rather than relying on rigid templates, the platform adapts to the uploaded evidence, making it flexible across multiple business auditing scenarios.

---

# AMD Compute Resources

AuditEye-II performs AI inference using **Fireworks AI APIs**, leveraging **AMD Instinct™ GPU infrastructure** provided through the AMD AI Hackathon ecosystem.

The platform routes AI-powered workflows through Fireworks-hosted foundation models for:

- AI Audit Intelligence
- AI Dataset Comparison
- Policy-Aware Compliance Verification

Fireworks model identifiers are preserved in workflow responses, demonstrating AMD-backed inference throughout the application.

---

# Features

## AI Audit Intelligence

- Executive audit summaries
- Policy-aware compliance verification
- Risk assessment
- Missing information detection
- Audit recommendations
- Manual verification guidance

---

## AI Comparison Engine

Automatically compares related business datasets including:

- Procurement vs Vendor Quotations
- Procurement vs Internal Catalog
- Procurement vs Invoices
- Financial Records
- Custom Business Documents

Detects:

- Price discrepancies
- Missing records
- Policy violations
- Data inconsistencies
- Potential fraud indicators

---

## Policy-Aware Auditing

Upload your organization's internal policies and AuditEye-II will automatically:

- Validate compliance
- Detect policy violations
- Flag manual verification requirements
- Explain findings with supporting reasoning

---

## Intelligent Workflow Routing

AuditEye-II automatically determines the appropriate workflow based on uploaded evidence.

Current workflows include:

- AI Audit
- Dataset Comparison
- Policy Verification

Its modular architecture allows future workflows to be integrated without changing the frontend.

---

# Architecture

```text
                    React Frontend
                          │
                          ▼
                   n8n Workflow Engine
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
     AI Audit      AI Comparison    Policy Engine
          │               │               │
          └───────────────┼───────────────┘
                          ▼
        Fireworks AI (AMD Instinct™ GPUs)
                          │
                          ▼
              Structured Audit Intelligence
```

---

# Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

## Workflow Automation

- n8n

## AI & Inference

- Fireworks AI
- DeepSeek V4

## Output

- Executive Audit Reports
- Markdown Reports
- CSV Export
- REST API Integration

---

# Demo Workflows

## AI Audit

**Input**

- Procurement Records
- Organization Policies

**Output**

- Executive Summary
- Compliance Assessment
- Risk Analysis
- Findings
- Recommendations

---

## AI Comparison

**Input**

- Procurement Records
- Vendor Quotes
- Internal Catalog
- Supporting Documents

**Output**

- Dataset Comparison
- Missing Records
- Price Variance
- Discrepancies
- Audit Findings

---

# Project Structure

```text
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

# Roadmap

- OCR-powered document extraction
- Data Normalization Engine
- Retrieval-Augmented Generation (RAG)
- ERP Integrations
- Multi-Organization Workspaces
- Audit History
- Dashboard Analytics
- Batch Auditing
- Role-Based Access Control
- Cloud Deployment

---

# Why AuditEye-II?

Enterprise auditing often requires significant manual effort to review documents, compare records, and verify compliance against organizational policies.

AuditEye-II reduces that workload by combining AI-powered document analysis, policy-aware reasoning, and automated dataset comparison into a single intelligent workflow—allowing auditors to focus on decision-making instead of repetitive review.

---

# Screenshots

> Add your application screenshots here.

```
screenshots/
├── ai-audit.png
├── comparison.png
├── workflow.png
```

---

# Author

**Jairus Meneses**

Aspiring Student Developer

---

# Acknowledgements

AuditEye-II was developed during the **AMD AI Hackathon** using:

- Fireworks AI
- AMD Instinct™ GPU Infrastructure
- n8n Workflow Automation
- React
- TypeScript

Special thanks to the organizers and sponsors for providing access to modern AI infrastructure that made rapid prototyping possible.

---

# License

This project is licensed under the MIT License.
