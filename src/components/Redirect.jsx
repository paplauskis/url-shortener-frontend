import { useNavigate, useParams } from 'react-router-dom'

function Redirect() {
  const { shortUrl } = useParams()
  
  window.location.replace(import.meta.env.VITE_API_URL + '/' + shortUrl)
}

export default Redirect