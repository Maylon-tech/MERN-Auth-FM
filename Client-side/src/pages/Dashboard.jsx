import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { HiOutlineViewGrid, HiOutlineChartBar, HiOutlineUserCircle } from 'react-icons/hi'
import { SiInfracost } from "react-icons/si"

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <HiOutlineViewGrid />
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <HiOutlineChartBar />
    },
    {
      id: "profile",
      label: "Profile",
      icon: <HiOutlineUserCircle />
    },
  ]

  return (
    <div>
      <aside>
        <div>
          <SiInfracost />
          <span>COSMO</span>
        </div>

        <nav>
          {
            navItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))
          }
        </nav>
      </aside>
    </div>
  )
}

export default Dashboard
