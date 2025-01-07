import { useState } from 'react'

function CreateUrl() {
  const [originalUrl, setOriginalUrl] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/shorten/${encodeURIComponent(originalUrl)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="create-url">
      <h3>Type URL you want to shorten</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>
            Original URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button type="submit">Create Short URL</button>
        </div>
      </form>
    </div>
  )
}

export default CreateUrl