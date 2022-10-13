import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"


export const useLogout = () => {

  const { dispatch } = useAuthContext()
  
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')

    dispatch({type: 'LOGOUT'})
  }

  return { logout }
  
}