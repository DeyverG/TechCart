
import TechCart from './components/TechCart'

function App() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">TechCart Environment</h1>
        <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide uppercase">Test environment for E2E automation</p>
      </header>
      <TechCart />
    </div>
  )
}

export default App
