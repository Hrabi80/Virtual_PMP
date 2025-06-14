
import { useState, useCallback } from "react";
import { ConsultationState, Question, AskedQuestion } from "@/types";

export const useConsultation = () => {
  const [consultationState, setConsultationState] = useState<ConsultationState>({
    selectedPMP: null,
    selectedCategory: null,
    askedQuestions: [],
    currentScore: 0,
    medicalImages: []
  });

  const askQuestion = useCallback((question: Question) => {
    setConsultationState(prev => {
      const isAlreadyAsked = prev.askedQuestions.some(
        aq => aq.question.id === question.id && question.type === 'NORMAL_QUESTION'
      );
      
      if (isAlreadyAsked && question.type === 'NORMAL_QUESTION') {
        return prev;
      }

      const newAskedQuestion: AskedQuestion = {
        question,
        askedAt: new Date()
      };

      const newMedicalImages = question.medicalPictureUrl 
        ? [...prev.medicalImages, question.medicalPictureUrl]
        : prev.medicalImages;

      return {
        ...prev,
        askedQuestions: [...prev.askedQuestions, newAskedQuestion],
        currentScore: prev.currentScore + question.score,
        medicalImages: newMedicalImages
      };
    });
  }, []);

  const resetConsultation = useCallback(() => {
    setConsultationState({
      selectedPMP: null,
      selectedCategory: null,
      askedQuestions: [],
      currentScore: 0,
      medicalImages: []
    });
  }, []);

  return {
    consultationState,
    setConsultationState,
    askQuestion,
    resetConsultation
  };
};
