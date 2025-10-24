import './App.css'
import SearchBar from './components/SearchBar'
import Sorting from './components/Sorting'
import Results from './components/Results'
import logo from './assets/logo.svg'
import { CountryProvider } from './components/CountryContext'

function App() {
  return (
    <CountryProvider>
      <AppContent />
    </CountryProvider>
  )
}

function AppContent() {
  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <main>
        <SearchBar />
        <div className='second'>
          <Sorting />
          <Results />
        </div>
      </main>
    </>
  )
}

export default App