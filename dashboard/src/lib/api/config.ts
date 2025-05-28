
export const API_CONFIG = {
  baseURL: 'http://localhost:3000',
  endpoints: {
    classrooms: '/classrooms',
    pmps: '/pmps',
    categories: '/categories',
    questions: '/questions',
  },
} as const

export const createApiUrl = (endpoint: string, id?: string | number) => {
  const baseUrl = `${API_CONFIG.baseURL}${endpoint}`
  return id ? `${baseUrl}/${id}` : baseUrl
}
