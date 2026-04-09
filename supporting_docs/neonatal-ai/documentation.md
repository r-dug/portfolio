# Neonatal AI Documentation Log

## Purpose

This document captures the updated knowledge transfer required to keep Neonatal.AI usable by new collaborators and to show the lived architecture behind the clinical deployment.
It deliberately mirrors the terse GitHub READMEs with enough detail to bootstrap future contributors or reviewers.

## Architecture summary

- **Front-end:** React SPA built for the University of Louisville Health neonatal wing, focused on capturing clinician notes, surfacing guardrail prompts, and streaming contextual reminders. The README now explicitly states the React/TypeScript stack plus the player view that handles live documentation workflows.
- **Back-end:** Express + Node.js service connected to MongoDB that orchestrates document storage, guardrail enforcement, and OpenAI API calls. This repo now has schema references, endpoint lists, and run commands spelled out.
- **API surface:** Guardrail endpoints include Response Control (pre-send reranking), Audit Logging (per-prompt metadata), and Feedback Capture (clinician flagging). We document each of these in the new section along with expected payloads and status codes.

## Guardrails & clinical workflow

- The guardrail layer constrains prompts with a two-stage funnel: strict regex-guided sanitization (block disallowed terms) followed by templated prompt scaffolding that only allows medically safe response patterns.
- The UI surfaces guardrail metadata so neonatologists can see why a response was withheld, with links to instrumentation in the front-end.
- We log every clinician override and feed it into a “feedback loop” column that suggests prompt tweaks back to the developer team.

## Knowledge-sharing status

- README now mentions the mission statement, stack (Express, MongoDB, React, Node.js, OpenAI APIs), and the lack of automation as a “what you should know before you dive in” section.
- Added runbook snippets for developers: how to bootstrap the API server (`npm install && npm run dev`), connect to MongoDB, and configure OpenAI credentials.
- Documentation lives under `supporting_docs/neonatal-ai/documentation.md` inside this portfolio repo so reviewers can see the captured knowledge without requiring GitHub authentication.
