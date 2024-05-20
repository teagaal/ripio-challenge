import { Header } from "./common/Header/Header"
import { Dashboard } from "./features/dashboard/Dashboard"

const App = () => {
  return (
    <div className="min-h-screen w-[80%] m-auto grid grid-rows-layout py-5">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default App
