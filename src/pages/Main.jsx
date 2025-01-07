import { useEffect, useState } from 'react'
import UrlResult from '../components/UrlResult.jsx'
import CreateUrl from '../components/CreateUrl.jsx'
import { useNavigate } from 'react-router-dom'

function Main() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formShow, setFormShow] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleRedirect = (id) => {
    navigate(`/url/${id}`);
  };
  
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/',
      {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
      }
    )
      .then((response) => {
        console.log('Fetching from:', import.meta.env.API_URL + '/');
        console.log(response)
        if (!response.ok) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data)
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
      {!formShow && <button onClick={() => setFormShow(true)}>Add New URL</button>}
      {formShow && <CreateUrl/>}
      <h2>Your URLs</h2>
      <table className="data-table">
        <thead>
        <tr>
          <th>Original URL</th>
          <th>Shortened URL</th>
          <th>Click Count</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
            <tr key={item.id} onClick={() => handleRedirect(item.id)}>
              <UrlResult
                originalUrl={decodeURIComponent(item.originalUrl)}
                shortenedUrl={item.shortenedUrl}
                clickCount={item.clickCount}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
              />
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default Main