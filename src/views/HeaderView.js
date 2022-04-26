import "./headerview.scss";

export function HeaderView() {
  const header = document.createElement("div");
  header.innerHTML = `
        <div class="words word-first">
            <span>H</span>
            <span>O</span>
            <span>L</span>
            <span>I</span>
            <span>D</span>
            <span>A</span>
            <span>Y</span>
        </div>
        <div class="words word-second">
            <span>R</span>
            <span>E</span>
            <span>S</span>
            <span>O</span>
            <span>R</span>
            <span>T</span>
        </div>
        `;
  return header;
}
