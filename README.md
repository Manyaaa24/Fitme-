# FitMe — Healthcare Appointment Platform

## Project Summary
FitMe is a clean and user-focused healthcare appointment website that demonstrates realistic UI design and professional project management practices through structured workflows and prioritized feature development.

---

## Vision Document

### Project Name
**FitMe**

---

### Overview
FitMe is a healthcare appointment and consultation platform designed to simplify how users discover medical services and connect with healthcare professionals through a clean, structured interface.

---

### Problem It Solves
Many healthcare platforms suffer from:
- Cluttered and confusing interfaces
- Complex appointment flows
- Poor navigation
- Low trust due to inconsistent design

FitMe addresses these issues with:
- A minimal, professional UI
- Clear call-to-actions
- Structured content sections
- Trust indicators

---

### Target Users (Personas)

#### 1. Busy Professionals
- Need quick doctor bookings
- Value speed and clarity

#### 2. Elderly Users
- Need simple navigation
- Prefer large, readable interfaces

#### 3. Health-Conscious Individuals
- Explore healthcare services
- Compare doctors and clinics

---

### Vision Statement
To provide a clean, accessible, and trustworthy digital platform that simplifies healthcare discovery and appointment booking.

---

### Key Features / Goals
- Doctor browsing interface
- Appointment call-to-actions
- Service categories
- Healthcare statistics section
- Trust indicators and partner logos
- Clear navigation structure

---

### Success Metrics
- Time to find a doctor: less than 30 seconds
- Booking flow completion rate: more than 80 percent
- User satisfaction score: above 4 out of 5

---

### Assumptions & Constraints
- Desktop-first design
- No real patient data
- UI-focused prototype
- Backend is a dummy service for architecture demonstration

---

## Project Management Approach

### Issue-Driven Development
- 27 GitHub issues created
- Each issue represents a feature, enhancement, or constraint

---

### MoSCoW Prioritization
Features are categorized as:
- **Must Have**
- **Should Have**
- **Could Have**
- **Won’t Have**

---

## Branching Strategy — GitHub Flow

We follow **GitHub Flow** for version control:

1. The `main` branch always represents a stable, production-ready version.
2. New features are developed in separate feature branches.
3. Feature branches are created from `main`.
4. Changes are committed and pushed to the feature branch.
5. A Pull Request is created for review.
6. After review, the feature branch is merged back into `main`.

This approach ensures clean version control and traceability of changes.

---

## Architecture Overview

### High-Level Architecture

User → Frontend (React + Vite) → Backend (Node.js + Express)
→ Future Database / Cache

Containerization & Local Deployment via Docker and Docker Compose


---

## Quick Start — Local Development

### Prerequisites
- Docker Desktop installed
- Git installed

---

### Steps to Run the Project

1. Clone the repository:
git clone <repository-url>
cd fitme


2. Build and run the application:
docker-compose up --build


3. Access the application:
- Frontend: http://localhost:5173  
- Backend: http://localhost:5000

4. Stop the application:
docker-compose down


---

## Local Development Tools

| Tool | Purpose |
|-----|--------|
| React | Frontend UI |
| Vite | Development server |
| Node.js | Backend runtime |
| Express | Backend framework |
| Docker | Containerization |
| Docker Compose | Multi-container management |
| GitHub Projects | Issue tracking |
| Figma | Wireframes |
| Draw.io | Architecture diagram |

---

## Proof of Functionality

Screenshots are provided to demonstrate:
- Successful Docker build and docker-compose up
- Application running in the browser on localhost
- GitHub repository with README and branches

---

## License
Academic project for educational purposes only.
