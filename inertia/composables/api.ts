import axios from 'axios'

export default function useApi() {
  try {
    axios.defaults.withCredentials = true
    return axios as any
  } catch (error) {
    return null
  }
}
