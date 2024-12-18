import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UrlDataResult from '../components/UrlDataResult.jsx'

function Url() {
  const { id } = useParams();
  const [urlObject, setUrlObject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/url/${id}`)
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
      <h2>Showing request data for URL: {urlObject.shortenedUrl} --> {urlObject.originalUrl}</h2>
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