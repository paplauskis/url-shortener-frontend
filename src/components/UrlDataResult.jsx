function UrlDataResult({
   ipAddress = 'unknown',
   device = 'unknown',
   operatingSystem = 'unknown',
   browser = 'unknown',
   createdAt = '',
}) {
  return (
    <>
      <td>{ipAddress}</td>
      <td>{device}</td>
      <td>{operatingSystem}</td>
      <td>{browser}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
    </>
  )
}

export default UrlDataResult