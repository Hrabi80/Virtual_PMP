import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchClassrooms,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} from "../../api/services/classroom.service";
import {
  Classroom,
  CreateClassroomRequest,
  UpdateClassroomRequest,
} from "@/types/api/";

export const useClassrooms = () => {
  return useQuery<Classroom[], Error>({
    queryKey: ["classrooms"],
    queryFn: fetchClassrooms,
  });
};

export const useCreateClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation<Classroom, Error, CreateClassroomRequest>({
    mutationFn: createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    },
  });
};

export const useUpdateClassroom = () => {
  const queryClient = useQueryClient();
  return useMutation<Classroom, Error, UpdateClassroomRequest>({
    mutationFn: updateClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    },
  });
};

export const useDeleteClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteClassroom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    },
  });
};
