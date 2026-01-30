import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD
    ? 'https://jsonplaceholder.typicode.com'
    : '/api')

export const api = axios.create({ baseURL })


console.log(
  'BASE:',
  import.meta.env.VITE_API_BASE,
  'PROD:',
  import.meta.env.PROD
)
