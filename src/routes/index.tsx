import { Routes, Route } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import PortfolioJourney from '../layouts/PortfolioJourney'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<PortfolioJourney />} />
                <Route path="/about" element={<PortfolioJourney />} />
                <Route path="/projects" element={<PortfolioJourney />} />
                <Route path="/contact" element={<PortfolioJourney />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes