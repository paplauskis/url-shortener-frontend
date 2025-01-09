function Logout(){
  const handleLougout = () => {
    localStorage.removeItem('token');
    window.location.replace('user/login')
  }

  return (
    <a className="logout" onClick={handleLougout}>Logout</a>
  )
}

export default Logout