
import UploadPage from './pages/UplaodPage'
import ConvertPage from './pages/ConvertPage'
import logo from './assets/logo-univ-rouen.jpg'
import { Link, Route, Routes } from 'react-router'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={logo} alt="Université de Rouen" className="h-16" />
          <nav className="space-x-6 text-sm font-semibold">
            <Link to="/" className="hover:underline">Transfert fichier</Link>
            <Link to="/convert" className="hover:underline">Convertisseur</Link>
          </nav>
        </div>
        <p className="text-center text-sm mt-2 pb-2">Version de l'application : 1.0</p>
      </header>

      {/* Routes */}
      <main className="py-10 container mx-auto px-4">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/convert" element={<ConvertPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

