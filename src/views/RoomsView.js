import { Room } from "./RoomView";

export async function Rooms() {
  const section = document.createElement("section");

  section.innerHTML = `
        <h2>Rooms</h2>
        <p id="loading">Loading...</p>
    `;

  section.className = "rooms-section-container";

  fetch("http://localhost:3000/rooms")
    .then((response) => response.json())
    .then((rooms) => {
      const ul = document.createElement("ul");
      ul.className = "ul-room-section";
      const lis = rooms.map((room) => Room(room));

      ul.append(...lis);

      section.querySelector("#loading").remove();
      section.append(ul);
      section.append(image);
    });

  return section;
}
