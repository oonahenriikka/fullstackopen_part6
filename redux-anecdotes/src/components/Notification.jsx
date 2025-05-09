import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notification) return null  // Varmista, että ilmoitus ei näy, jos sitä ei ole

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
