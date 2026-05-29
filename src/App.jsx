import { useState, useEffect, lazy, Suspense } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import './index.css'

// Lazy load — solo se cargan cuando se usan
const Pipeline = lazy(() => import('./components/Pipeline/Pipeline'))
const AgentDashboard = lazy(() => import('./components/Agents/AgentDashboard'))
const CalculadoraMargenes = lazy(() => import('./components/Calculadora/CalculadoraMargenes'))
const OutboundEngine = lazy(() => import('./components/Outbound/OutboundEngine'))
const RevenueTracker = lazy(() => import('./components/RevenueTracker/RevenueTracker'))
const RRSS = lazy(() => import('./components/RRSS/RRSS'))
const Francia = lazy(() => import('./components/Francia/Francia'))
const Contenidos = lazy(() => import('./components/Contenidos/Contenidos'))
const Roadmap = lazy(() => import('./components/Roadmap/Roadmap'))
const Prompt = lazy(() => import('./components/Prompt/Prompt'))
const Conexiones = lazy(() => import('./components/Conexiones/Conexiones'))
const Stack = lazy(() => import('./components/Stack/Stack'))

const VISTAS = {
    dashboard:      Dashboard,
    funnel:         Dashboard,  // deprecated — redirect a Dashboard
    pipeline:       Pipeline,
    contenidos:     Contenidos,
    roadmap:        Roadmap,
    francia:        Francia,
    espana:         Dashboard,
    petfood:        Dashboard,
    conexiones:     Conexiones,
    agents:         AgentDashboard,
    calculadora:    CalculadoraMargenes,
    outbound:       OutboundEngine,
    revenuetracker: RevenueTracker,
    rrss:           RRSS,
    prompt:         Prompt,
    stack:          Stack,
    brightbean:     RRSS,
    chatwoot:       RRSS,
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
