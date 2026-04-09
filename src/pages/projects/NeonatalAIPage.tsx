import { ProjectPage } from '@/components/ProjectPage'

export function NeonatalAIPage() {
  return (
    <ProjectPage
      name="Neonatal AI"
      tagline="Clinical LLM application"
      githubUrl="https://github.com/Neonatal-AI"
      tech={['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI APIs', 'Clinical Workflow Integration']}
      sections={[
        {
          heading: 'Context',
          body: 'This project grew out of a Medical AI focus group organized by Drs. Jon and Terry Cohen of Norton Health\'s neonatal hospital in Louisville, KY. The question was whether LLMs could reduce the documentation burden on clinical staff. I built a proof-of-concept web application that uses form-driven LLM prompting to generate clerical documents — discharge summaries, progress notes, and similar paperwork that eats into time spent with patients. The goal was to demonstrate feasibility and build clinician buy-in.',
        },
        {
          heading: 'My Role',
          body: [
            {
              point: '**Sole developer** — built the full stack from scratch: React frontend, Express/Node API, MongoDB persistence, and OpenAI API integration.',
            },
            {
              point: '**Guardrail design:** The interesting problem isn\'t calling an LLM API — it\'s constraining the output so a clinician can trust it. Designed a guardrail layer that channels LLM behavior into clinically appropriate patterns rather than just blocking bad output.',
            },
            {
              point: '**Direct collaboration with the focus group:** Iterated on the proof-of-concept through feedback sessions with Drs. Cohen and clinical staff. "The AI doesn\'t understand what I mean" becomes a prompt engineering problem or a workflow gap — learning to hear that distinction is its own skill.',
            },
          ],
        },
        {
          heading: 'What I Learned',
          body: 'Clinical users have fundamentally different mental models than software users. The vocabulary they use to describe problems rarely maps directly to system-level causes. Building for a clinical audience means being honest about what the AI can and can\'t do, and designing the interface so the clinician stays in control. The guardrails exist as much for trust as for safety.',
        },
        {
          heading: 'Technical Decisions',
          body: [
            {
              point: '**MERN stack:** Chose Express + MongoDB + React to keep the proof-of-concept maintainable by a single developer. The complexity lives in the LLM integration and guardrail logic, not the web framework.',
            },
            {
              point: '**Form-driven LLM prompting:** Clinical staff fill out structured forms; the system uses the form data to prompt the LLM with appropriate context and constraints. This keeps the clinician in control of the input while the guardrail layer constrains the output.',
            },
            {
              point: '**Proof-of-concept scope:** This was built to demonstrate feasibility to the clinical team, not as a production deployment. The public repos are minimal — the priority was a working demo in a clinician\'s hands.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Project',
          items: [
            'Proof-of-concept built for Norton Health neonatal Medical AI focus group',
            'Sole developer: full stack from model integration to demo delivery',
            'Iterated through direct clinician feedback sessions',
          ],
        },
        {
          category: 'Architecture',
          items: [
            'MERN stack (React + Express + Node.js + MongoDB) with OpenAI API integration',
            'Guardrail layer constraining LLM output to clinically safe response patterns',
            'Form-driven document generation for clinical workflows',
          ],
        },
      ]}
    />
  )
}
