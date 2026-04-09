# Neonatal AI Validation & Automated QA

## Goals

1. Keep the Neonatal AI deployment trustworthy by codifying the manual checks clinicians have relied on.
2. Provide a repeatable checklist that can be executed on every push through CI or by future maintainers.

## Validation playbook

### Front-end

- `npm run lint` ensures the React shared components and guardrail UI follow our style rules.
- `npm run test` executes the Jest/RTL suite that covers the doc creation flows, persona switches, and guardrail prompts.
- `npm run typecheck` verifies the TypeScript types exposed to the Express API.
- `npm run build` produces a production bundle that is deployed to the clinical kiosk.

### Back-end

- `npm run lint` for the Express service.
- `npm run test` runs the API integration tests against a local MongoDB fixture.
- `npm run smoke` (custom script) exercises the OpenAI prompt pipeline and guardrail sanitization in isolation.
- `npm run docs` regenerates the OpenAPI schema referenced in the documentation log.

### Automation

- A GitHub Actions workflow (org README references) ties these commands together on `main` and any clinical hotfix branches, gating deployments in the production pipeline.
- Every run uploads logs to the same `supporting_docs/neonatal-ai/validation.md` checklist so we have an audit trail for clinicians.

## Next steps

1. Add end-to-end Playwright tests that simulate the documentation workflow and confirm guardrail enforcement.
2. Wire up a cron job that runs the validation suite nightly and posts status back to the internal kanban (not yet public).
3. Publish artifacts (lint output, test results, coverage summary) alongside release notes so the clinical team can see what changed.
