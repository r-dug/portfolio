import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/lib/theme'
import { Analytics } from '@/components/Analytics'
import { CookieConsent } from '@/components/CookieConsent'
import { Nav } from '@/components/Nav'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { TutorAILPage } from '@/pages/projects/TutorAILPage'
import { BountyOSPage } from '@/pages/projects/BountyOSPage'
import { NeonatalAIPage } from '@/pages/projects/NeonatalAIPage'
import { FungusClassifierPage } from '@/pages/projects/FungusClassifierPage'
import { FedLearningPage } from '@/pages/projects/FedLearningPage'
import { StyleMimicryPage } from '@/pages/projects/StyleMimicryPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[hsl(var(--background))]">
          <Analytics />
          <CookieConsent />
          <Nav />
          <Routes>
            <Route path="/"                          element={<HomePage />} />
            <Route path="/about"                     element={<AboutPage />} />
            <Route path="/projects"                  element={<ProjectsPage />} />
            <Route path="/projects/tutorail"         element={<TutorAILPage />} />
            <Route path="/projects/bounty-os"        element={<BountyOSPage />} />
            <Route path="/projects/neonatal-ai"      element={<NeonatalAIPage />} />
            <Route path="/projects/fungus-classifier" element={<FungusClassifierPage />} />
            <Route path="/projects/federated-learning" element={<FedLearningPage />} />
            <Route path="/projects/style-mimicry"    element={<StyleMimicryPage />} />
            <Route path="*"                          element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
