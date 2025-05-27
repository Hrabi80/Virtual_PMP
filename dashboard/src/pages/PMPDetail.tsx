import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, User, School } from "lucide-react"

interface Question {
  id: string
  questionText: string
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE"
  response: string
  medicalPictureUrl?: string
  score: number
  questionCategoryId: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  pmpId: string
  questions: Question[]
}

interface PMP {
  id: string
  title: string
  description: string
  annonceOfTheProblem: string
  professorName: string
  classroomName: string
  createdBy: string
  createdAt: string
  isVisible?: boolean
}

export const PMPDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Mock data - in real app, this would come from API
  const pmp: PMP = {
    id: "1",
    title: "Cardiovascular Assessment",
    description: "Interactive case study on heart disease diagnosis with comprehensive patient evaluation and diagnostic procedures.",
    annonceOfTheProblem: "Patient presents with chest pain and shortness of breath",
    professorName: "Dr. Smith",
    classroomName: "Medical Students - Year 3",
    createdBy: "prof1",
    createdAt: "2024-01-15",
    isVisible: false // Default to not visible
  }

  const categories: Category[] = [
    {
      id: "cat1",
      name: "Initial Assessment",
      pmpId: "1",
      questions: [
        {
          id: "q1",
          questionText: "What brings you to the clinic today?",
          type: "NORMAL_QUESTION",
          response: "I've been having chest pain for the past week.",
          score: 10,
          questionCategoryId: "cat1",
          createdAt: "2024-01-15"
        },
        {
          id: "q2",
          questionText: "Can you show me where it hurts?",
          type: "ASK_FOR_MEDICAL_PICTURE",
          response: "The pain is located in the center of my chest.",
          medicalPictureUrl: "/images/chest-diagram.jpg",
          score: 15,
          questionCategoryId: "cat1",
          createdAt: "2024-01-15"
        }
      ]
    },
    {
      id: "cat2",
      name: "Medical History",
      pmpId: "1",
      questions: [
        {
          id: "q3",
          questionText: "Do you have any previous heart conditions?",
          type: "NORMAL_QUESTION",
          response: "My father had a heart attack when he was 55.",
          score: 20,
          questionCategoryId: "cat2",
          createdAt: "2024-01-15"
        }
      ]
    }
  ]

  const totalQuestions = categories.reduce((total, category) => total + category.questions.length, 0)
  const totalScore = categories.reduce((total, category) => 
    total + category.questions.reduce((catTotal, question) => catTotal + question.score, 0), 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pmp.title}</h1>
              <p className="text-gray-600 mt-2">{pmp.annonceOfTheProblem}</p>
            </div>
            <Button
              onClick={() => navigate(`/pmp/${id}/edit`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit PMP
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{pmp.description}</p>
              </CardContent>
            </Card>

            {categories.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Categories & Questions</CardTitle>
                  <CardDescription>
                    {categories.length} categories with {totalQuestions} total questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {categories.map((category) => (
                      <div key={category.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                          <Badge variant="secondary">
                            {category.questions.length} questions
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {category.questions.map((question) => (
                            <div key={question.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 mb-1">
                                    {question.questionText}
                                  </p>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {question.response}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <Badge 
                                      variant={question.type === "ASK_FOR_MEDICAL_PICTURE" ? "default" : "outline"}
                                    >
                                      {question.type === "ASK_FOR_MEDICAL_PICTURE" ? "Medical Picture" : "Normal"}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                      Score: {question.score}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>PMP Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Professor:</span>
                  <span className="text-sm font-medium">{pmp.professorName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <School className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Classroom:</span>
                  <span className="text-sm font-medium">{pmp.classroomName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Created:</span>
                  <span className="text-sm font-medium">
                    {new Date(pmp.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={pmp.isVisible ? "default" : "secondary"}>
                      {pmp.isVisible ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Categories:</span>
                    <span className="text-sm font-medium">{categories.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Questions:</span>
                    <span className="text-sm font-medium">{totalQuestions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Score:</span>
                    <span className="text-sm font-medium">{totalScore} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
