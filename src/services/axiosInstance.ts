import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})
