import { useEffect, useRef, useState } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Room.module.css";

function RoomsContainer() {
  const { socket, roomId, username } = useSockets();
  const [savedRooms, setSavedRooms] = useState([]);
  const [started, setStarted] = useState(false);
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const date = new Date().toDateString();
    const roomName = `Seth est disponible`;

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    // newRoomRef.current.value = "";
    setStarted(true);

  }

  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  async function getRooms() {
    try {
      const resp = await fetch(`http://localhost:4000/rooms/`);
      const jsonData = await resp.json();
      console.log(jsonData);
      setSavedRooms(jsonData)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, [socket]);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        {/* <input ref={newRoomRef} placeholder="Room name" /> */}
        <button
          disabled={started}
          className="cta" onClick={handleCreateRoom}>
          Discuter avec un conseiller
        </button>
      </div>

      <ul className={styles.roomList}>
        {savedRooms.map((room, key) => {
          return (
            <div key={key}>
              <button
                hidden
                disabled={key === room.room_id}
                title={`Join ${savedRooms[key].room_name}`}
                onClick={() => handleJoinRoom(room.room_id)}
              >
                {room.room_name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
