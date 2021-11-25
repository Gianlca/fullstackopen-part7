import axios from "axios";
import { authHeader } from "../utils/auth_util";
const baseUrl = '/api/users'

const getAllUsers = async() => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default {
  getAllUsers
}