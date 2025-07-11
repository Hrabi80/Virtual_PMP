
export const API_CONFIG = {
  baseURL: '',
  endpoints: {
    classrooms: '/classrooms',
    pmps: '/pmp',
    categories: '/categories',
    questions: '/questions',
  },
} as const

export const createApiUrl = (endpoint: string, id?: string | number) => {
  const baseUrl = `${API_CONFIG.baseURL}${endpoint}`
  return id ? `${baseUrl}/${id}` : baseUrl
}
