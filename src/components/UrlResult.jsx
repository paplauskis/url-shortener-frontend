function UrlResult({
  originalUrl = 'original',
  shortenedUrl = 'short',
  clickCount = 'click count',
  createdAt = 'created at',
  updatedAt = 'updated at',
}) {
  return (
    <>
      <td>{originalUrl}</td>
      <td>{shortenedUrl}</td>
      <td>{clickCount}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
      <td>{new Date(updatedAt).toLocaleString()}</td>
    </>
  )
}

export default UrlResult;