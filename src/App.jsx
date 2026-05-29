import { useState, useEffect, lazy, Suspense } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import './index.css'

// Lazy load — solo se cargan cuando se usan
const Francia = lazy(() => import('./components/Francia/Francia'))
const RRSS = lazy(() => import('./components/RRSS/RRSS'))
const RevenueTracker = lazy(() => import('./components/RevenueTracker/RevenueTracker'))
const OutboundEngine = lazy(() => import('./components/Outbound/OutboundEngine'))
const AgentDashboard = lazy(() => import('./components/Agents/AgentDashboard'))
const CalculadoraMargenes = lazy(() => import('./components/Calculadora/CalculadoraMargenes'))
const Petfood = lazy(() => import('./components/Petfood/Petfood'))
const Stack = lazy(() => import('./components/Stack/Stack'))
const Prompt = lazy(() => import('./components/Prompt/Prompt'))
const Roadmap = lazy(() => import('./components/Roadmap/Roadmap'))
const Conexiones = lazy(() => import('./components/Conexiones/Conexiones'))
const Chatwoot = lazy(() => import('./components/Chatwoot/Chatwoot'))
const Contenidos = lazy(() => import('./components/Contenidos/Contenidos'))
const Funnel = lazy(() => import('./components/Funnel/Funnel'))
const Pipeline = lazy(() => import('./components/Pipeline/Pipeline'))

const VISTAS = {
    dashboard:      Dashboard,
    funnel:         Funnel,
    pipeline:       Pipeline,
    contenidos:     Contenidos,
    roadmap:        Roadmap,
    francia:        Francia,
    petfood:        Petfood,
    conexiones:     Conexiones,
    rrss:           RRSS,
    revenuetracker: RevenueTracker,
    outbound:       OutboundEngine,
    agents:         AgentDashboard,
    calculadora:    CalculadoraMargenes,
    stack:          Stack,
    prompt:         Prompt,
    chatwoot:       Chatwoot,
}

const LoadingView = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)', fontSize: '13px' }}>
        Cargando...
    </div>
)

export default function App() {
    const [vistaActual, setVistaActual] = useState('dashboard')
    const [tema, setTema] = useState(
        () => localStorage.getItem('grenoucerie-tema') || 'oscuro'
    )
    const Componente = VISTAS[vistaActual] || Dashboard

    useEffect(() => {
        localStorage.setItem('grenoucerie-tema', tema)
    }, [tema])

    const toggleTema = () => {
        setTema(prev => prev === 'oscuro' ? 'claro' : 'oscuro')
    }

    return (
        <div className={`app-layout ${tema === 'claro' ? 'light-theme' : ''}`}>
            <Sidebar
                vistaActual={vistaActual}
                cambiarVista={setVistaActual}
                tema={tema}
                toggleTema={toggleTema}
            />
            <main className="main-content">
                <Suspense fallback={<LoadingView />}>
                    <Componente cambiarVista={setVistaActual} />
                </Suspense>
            </main>
        </div>
    )
}
