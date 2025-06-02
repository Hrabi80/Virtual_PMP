
import { useState } from "react"
import { LoginPage } from "@/components/auth/LoginPage"
import { ProfessorDashboard } from "@/components/dashboard"

interface User {
  id: string
  name: string
  email: string
  type: "professor" | "student"
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loginError, setLoginError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const goDashboard = true;
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setLoginError("")
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - replace with real API call
      if (email === "professor@university.edu" && password === "password123") {
        setUser({
          id: "prof1",
          name: "Dr. Smith",
          email: email,
          type: "professor"
        })
      } else {
        setLoginError("Invalid email or password")
      }
    } catch (error) {
      setLoginError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setLoginError("")
  }
  if(goDashboard){
    return (
      <ProfessorDashboard
        professorName={"Dr. Bachir"}
        professorId={"prof1"}
        onLogout={handleLogout}
      />
    )
  }
  if (!user) {
    return (
      <LoginPage
        onLogin={handleLogin}
        error={loginError}
        isLoading={isLoading}
      />
    )
  }

  if (user.type === "professor" ) {
    return (
      <ProfessorDashboard
        professorName={user.name}
        professorId={user.id}
        onLogout={handleLogout}
      />
    )
  }

  // Student dashboard would go here
  return <div>Student Dashboard (Coming Soon)</div>
}

export default Index
