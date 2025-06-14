
import { Classroom, PMP, QuestionCategory, Question } from "@/types";

export const mockClassrooms: Classroom[] = [
  {
    id: "1",
    name: "Cardiology Case Study",
    major: "Cardiology",
    description: "Advanced cardiovascular diagnostic training with real-world case studies and expert supervision.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    studentCount: 10
  },
  {
    id: "2",
    name: "Neurology Diagnostics",
    major: "Neurology",
    description: "Comprehensive neurological assessment and diagnostic procedures for complex cases.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    studentCount: 15
  },
  {
    id: "3",
    name: "Pediatrics Simulation",
    major: "Pediatrics",
    description: "Specialized pediatric consultation training with age-appropriate assessment techniques.",
    imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    studentCount: 8
  },
  {
    id: "4",
    name: "Emergency Medicine Training",
    major: "Emergency Medicine",
    description: "High-intensity emergency response training with critical decision-making scenarios.",
    imageUrl: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    studentCount: 20
  }
];

export const mockPMPs: PMP[] = [
  {
    id: "1",
    title: "Chest Pain Diagnosis",
    description: "A 45-year-old patient presents with acute chest pain. Practice your diagnostic approach through systematic questioning and examination.",
    annonceOfTheProblem: "A 45-year-old male presents to the emergency department with a 2-hour history of severe chest pain. The pain is described as crushing, radiating to the left arm and jaw. The patient appears diaphoretic and anxious.",
    professorName: "Dr. Emily Carter",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    classroomId: "1",
    difficulty: "Advanced",
    maxScore: 100
  },
  {
    id: "2",
    title: "Arrhythmia Management",
    description: "Evaluate and manage a patient with cardiac arrhythmia. Learn to identify key symptoms and appropriate interventions.",
    annonceOfTheProblem: "A 68-year-old female patient is brought to the clinic complaining of palpitations and dizziness that started this morning. She has a history of hypertension.",
    professorName: "Dr. Emily Carter",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    classroomId: "1",
    difficulty: "Intermediate",
    maxScore: 80
  },
  {
    id: "3",
    title: "Heart Failure Assessment",
    description: "Comprehensive assessment of a patient presenting with signs of congestive heart failure.",
    annonceOfTheProblem: "A 72-year-old man presents with progressively worsening shortness of breath, particularly when lying flat, and swelling in his ankles over the past week.",
    professorName: "Dr. Emily Carter",
    imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    classroomId: "1",
    difficulty: "Advanced",
    maxScore: 95
  }
];

export const mockCategories: QuestionCategory[] = [
  { id: "1", name: "History Taking", pmpId: "1" },
  { id: "2", name: "Physical Examination", pmpId: "1" },
  { id: "3", name: "Investigations", pmpId: "1" },
  { id: "4", name: "Differential Diagnosis", pmpId: "1" }
];

export const mockQuestions: Question[] = [
  {
    id: "1",
    questionText: "Can you describe the pain in more detail?",
    type: "NORMAL_QUESTION",
    response: "The pain is a crushing sensation, 8/10 intensity, started suddenly while I was mowing the lawn. It feels like an elephant is sitting on my chest.",
    score: 10,
    questionCategoryId: "1"
  },
  {
    id: "2",
    questionText: "Do you have any family history of heart disease?",
    type: "NORMAL_QUESTION",
    response: "Yes, my father had a heart attack when he was 50, and my brother has high cholesterol.",
    score: 8,
    questionCategoryId: "1"
  },
  {
    id: "3",
    questionText: "Can I see your ECG?",
    type: "ASK_FOR_MEDICAL_PICTURE",
    response: "Here is the patient's ECG showing ST elevation in leads II, III, and aVF.",
    medicalPictureUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    score: 15,
    questionCategoryId: "3"
  },
  {
    id: "4",
    questionText: "What are the heart sounds like?",
    type: "NORMAL_QUESTION",
    response: "Heart rate is 110 bpm, regular rhythm. S1 and S2 are normal, no murmurs detected.",
    score: 12,
    questionCategoryId: "2"
  }
];
