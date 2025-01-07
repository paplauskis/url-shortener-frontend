import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UrlDataResult from '../components/UrlDataResult.jsx'

function Url() {
  const { id } = useParams();
  const [urlObject, setUrlObject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const handleDeleteUrl = async (e, id) => {
    e.preventDefault();
    
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/url/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      navigate('/')
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/url/${id}`,
      {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => {
        setUrlObject(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>ERROR: {error.message}</h1>;
  }
  
  return (
    <>
      <h2>Showing request data for URL: {urlObject.shortenedUrl} -------- {decodeURIComponent(urlObject.originalUrl)}</h2>
      <button onClick={(e) => handleDeleteUrl(e, urlObject.id)}>Delete This URL</button>
      <table className="data-table">
        <thead>
        <tr>
          <th>IP Address</th>
          <th>Device</th>
          <th>Operating System</th>
          <th>Browser</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {urlObject.urlAccessLogs && urlObject.urlAccessLogs.length > 0 ? (
          urlObject.urlAccessLogs.map((item, index) => (
            <tr key={index}>
              <UrlDataResult
                ipAddress={item.ipAddress}
                device={item.device}
                operatingSystem={item.operatingSystem}
                browser={item.browser}
                createdAt={item.createdAt}
              />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No data available</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default Url