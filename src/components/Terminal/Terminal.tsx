import { io } from "socket.io-client"

const Terminal = () => {

    const socket = io("localhost:5000")

  return (
    <div>Terminal</div>
  )
}
export default Terminal