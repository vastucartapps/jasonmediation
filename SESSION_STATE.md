# Universal Session State & Multi-PC Workspace Sync Protocol

> **PURPOSE**: This document is the **Single Source of Truth** for this codebase. Any developer or autonomous AI agent cloning this repository on any PC (Linux, macOS, Windows/WSL) can read this file and **immediately resume the exact working session with 100% context parity**.

---

## 1. Multi-PC Git Synchronization Protocol

To ensure seamless work across multiple computers without merge conflicts:

### A. Before You Begin Working On ANY PC:
Always pull the latest changes from the remote repository before making any edits:
```bash
git pull --rebase origin main
```

### B. When You Complete Work On ANY PC:
Always stage, commit, and push so other computers receive the exact state:
```bash
git add -A
git commit -m "feat/fix: detailed description of changes"
git push origin main
```

---

## 2. Setting Up Credentials On A New PC (Local Only)

Credentials (VPS passwords, FTPS secrets) are **NEVER committed to Git**. When cloning this repository onto a fresh machine:

1. Create the local `.secrets/` directory:
   ```bash
   mkdir -p .secrets
   ```
2. Copy the sample templates:
   ```bash
   cp .secrets.example/client_vps.json.example .secrets/client_vps.json
   cp .env.example .env.cpanel
   ```
3. Populate `.secrets/client_vps.json` with the production server IP (`129.121.94.176`) and root password.
4. Verify Git ignores your secrets:
   ```bash
   git status
   # .secrets/ and .env.cpanel MUST NOT appear in git status!
   ```

---

## 3. High-Level Workspace Architecture

```
/
├── handoff/                     <-- Autonomous Coding Agent Handoff Kit (Zero-Hallucination Blueprint)
│   ├── 00-MASTER-CODING-AGENT-PROTOCOL.md
│   ├── 01-DESIGN-AND-UI-UX-SYSTEM.md
│   ├── 02-CORE-WEB-VITALS-AND-PERFORMANCE.md
│   ├── 03-AHREFS-100-ZERO-ERROR-SPECIFICATION.md
│   ├── 04-GOOGLE-SEARCH-CONSOLE-AND-AI-DISCOVERY.md
│   ├── 05-NO-GBP-ENTITY-TRIANGULATION-SPEC.md
│   ├── 06-DYNAMIC-DOM-AND-ANTI-DOORWAY-ENGINE.md
│   ├── 07-GEO-AEO-AND-CONTENT-WRITING-SOP.md
│   ├── 08-HIGH-CONVERTING-CRO-ENGINE.md
│   ├── 09-DEPLOYMENT-AND-HOSTING-SOP.md
│   ├── templates/               <-- Reusable components (Spintax, Sticky Bar, Forms, Schema, Discovery)
│   └── scripts/                 <-- Standalone CLI harnesses: gatekeeper.py & crawl-verifier.py
│
├── Sites/                       <-- Sites Output Directory
│   ├── Jason/                   <-- Jason's Client Sites (Organized by Niche)
│   │   ├── family-mediation/    <-- Alderton & Cavendish Family Mediation
│   │   ├── peptides/            <-- AminoAcidSupplements, Peptides-UK, TrustlyPharma
│   │   ├── mold-remediation/    <-- Mold Remediation Service Network
│   │   ├── ev-chargers/         <-- EVChargerOne Staging
│   │   └── Temporary Site Resources/
│   │
│   ├── Prashant/                <-- Prashant's Multi-Niche Portfolio (Starting with 5 Niches)
│   │   ├── hvac-heatpumps/
│   │   ├── roofing-solar/
│   │   ├── emergency-plumbing/
│   │   ├── water-damage-restoration/
│   │   └── commercial-electrical/
│   │
│   └── Games/                   <-- Gaming & Interactive Applications Portfolio
│       ├── Web/                 <-- Browser-based HTML5 / Canvas / Three.js Games
│       └── Mobile/              <-- Mobile Application Wrappers
│           ├── Android/         <-- APK / Android App Bundles
│           └── iOS/             <-- Xcode / iOS Bundles
│
├── Agents and Skills/           <-- SEO Agent Repo, Docs, and Money Page Playbook
├── packages/core/               <-- Core shared UI library & components
└── scripts/                     <-- VPS deployment and maintenance automation
```

---

## 4. How An AI Agent Resumes Work On Any Machine

If you open this repo in Antigravity, Cursor, Claude Code, or Gemini CLI on a new machine, provide this exact prompt:

```text
Please read SESSION_STATE.md and handoff/00-MASTER-CODING-AGENT-PROTOCOL.md. 
We are building sites adhering strictly to the 10 Inviolable Quality Gates. 
Do not hallucinate, do not produce AI slop, and ensure all builds pass 
python3 handoff/scripts/gatekeeper.py --dir out before marking tasks as complete.
```

---

## 5. Active Production Status & VPS Endpoints

- **Live Staging Endpoint**: `https://swanmediation.online/`
- **Client Production VPS**: `129.121.94.176` (Ubuntu Nginx, Certbot SSL)
- **Domain Pending Switch**: `AminoAcidSupplements.co` (Awaiting client DNS pointing to VPS IP)
- **Autonomous Scheduler**: Running 104-week publishing queue on Client VPS via systemd daemon (`contentflow-daemon.service`).
