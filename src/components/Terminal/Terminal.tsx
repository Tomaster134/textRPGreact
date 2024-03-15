import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Terminal = () => {
  let socketio = useRef(io("localhost:5000", {
    auth: localStorage.user_id, autoConnect:false}));

    useEffect(() => {
      socketio.current.connect()
      return () => {socketio.current.disconnect()}
    }, [])

  const messages: HTMLElement | null = document.querySelector("#messages");
  const form: HTMLElement | null = document.querySelector("#input-form");
  const mapBox: HTMLElement | null = document.querySelector("#map-box");

  const createMap = (map: string): void => {
    const content: string = `<span class="map-header">MAP</span>
      <div class="map-content">
          ${map}
      </div>
      `;
    if (mapBox) {
      mapBox.innerHTML = content;
    }
  };

  const createEvent = (msg: string): void => {
    const content: string = `
      <div class="text">
          <span class="msg-text">
              ${msg}
          </span>
          <span class="msg-date">
                  ${new Date().toLocaleString()}
          </span>
      </div>
      `;
    if (messages) {
      messages.innerHTML += content;
      if (
        messages.scrollHeight - messages.clientHeight - messages.scrollTop <=
        60
      ) {
        messages.scrollTop = messages.scrollHeight + 10000;
      }
      console.log(
        messages.scrollHeight - messages.clientHeight - messages.scrollTop
      );
    }
  };

  socketio.current.on("map", (data: { map: string }) => {
    createMap(data.map);
  });

  socketio.current.on("event", (data: { message: string }) => {
    createEvent(data.message);
  });

  if (form) {
    form.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      const message: HTMLInputElement | null =
        document.querySelector("#message");
      if (message && message.value == "") return;
      const payload = {
        command: message.value.substr(0, message.value.indexOf(" ")),
        data: message.value.substr(message.value.indexOf(" ") + 1),
      };
      if (payload.command === "" && payload.data) {
        payload.command = payload.data;
        payload.data = "";
      }
      console.log(payload);
      socketio.current.emit("client", payload);
      if (message) {
        message.value = "";
      }
      if (messages) {
        messages.scrollTop = messages.scrollHeight;
      }
    });
  }

  return (
    <div className="papyrus-box">
      <div className="map-box" id="map-box" />
      <div className="room-box">
        <h2 className="room-header">Narnia</h2>
        <div className="message-box">
          <div className="messages" id="messages" />
          <form className="input" id="input-form">
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Type here!"
            />
            <button id="send-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Terminal;
