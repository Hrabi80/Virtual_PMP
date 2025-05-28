
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassroomsTab } from "./ClassroomsTab"
import { AllPMPsTab } from "./AllPMPsTab"
import { MyPMPsTab } from "./MyPMPsTab"
import { Header } from "../layout/Header"

interface PMP {
  id: string
  title: string
  description: string
  annonceOfTheProblem: string
  professorName: string
  classroomName: string
  createdBy: string
  createdAt: string
}

interface ProfessorDashboardProps {
  professorName: string
  professorId: string
  onLogout: () => void
}

export const ProfessorDashboard = ({ professorName, professorId, onLogout }: ProfessorDashboardProps) => {
  const [activeTab, setActiveTab] = useState("classrooms")
  
  // Mock data - replace with API calls
  const [allPMPs] = useState<PMP[]>([
    {
      id: "1",
      title: "Cardiovascular Assessment",
      description: "Interactive case study on heart disease diagnosis",
      annonceOfTheProblem: "Patient presents with chest pain and shortness of breath",
      professorName: "Dr. Smith",
      classroomName: "Medical Students - Year 3",
      createdBy: "prof1",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Neurological Examination",
      description: "Virtual patient with neurological symptoms",
      annonceOfTheProblem: "Patient shows signs of memory loss and confusion",
      professorName: "Dr. Johnson",
      classroomName: "Medical Students - Year 4",
      createdBy: "prof2",
      createdAt: "2024-01-10"
    }
  ])

  const myPMPs = allPMPs.filter(pmp => pmp.createdBy === professorId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="professor" userName={professorName} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage your classrooms, PMPs and view all available cases</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="classrooms" className="flex items-center gap-2">
              Classrooms
            </TabsTrigger>
            <TabsTrigger value="all-pmps" className="flex items-center gap-2">
              All PMPs
            </TabsTrigger>
            <TabsTrigger value="my-pmps" className="flex items-center gap-2">
              My PMPs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classrooms" className="space-y-6">
            <ClassroomsTab professorId={professorId} />
          </TabsContent>

          <TabsContent value="all-pmps" className="space-y-6">
            <AllPMPsTab pmps={allPMPs} />
          </TabsContent>

          <TabsContent value="my-pmps" className="space-y-6">
            <MyPMPsTab pmps={myPMPs} professorId={professorId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
