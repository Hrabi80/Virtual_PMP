
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassroomsTab } from "./ClassroomTab"
import { AllPMPsTab } from "./PMPsTab"
import { MyPMPsTab } from "./MyPMPsTab"
import { Header } from "../layout/Header"
import { PMP } from "@/types/api"



interface ProfessorDashboardProps {
  professorName: string
  professorId: string
  onLogout: () => void
}

export const ProfessorDashboard = ({ professorName, professorId, onLogout }: ProfessorDashboardProps) => {
  const [activeTab, setActiveTab] = useState("classrooms")
  
  // Mock data - replace with API calls
  const [allPMPs] = useState<PMP[]>([])

//  const myPMPs = allPMPs.filter(pmp => pmp.createdBy === professorId)
  const myPMPs = allPMPs
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
            <MyPMPsTab professorId={professorId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
