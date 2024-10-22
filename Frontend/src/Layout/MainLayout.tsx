import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col container mx-auto">
      {/* Navber */}
      <header>
        <Navbar/>
      </header>
      {/* Main Content */}
      <div className="flex-1">
        <Outlet/>
      </div>
      {/* Footer */}
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default MainLayout