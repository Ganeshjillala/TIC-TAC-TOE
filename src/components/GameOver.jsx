export default function GameOver({ winner, onRestart }) {
  //if (winner) {
  return (
    <div id="game-over">
      <h3>GAMEOVER</h3>
      {winner && <p>{winner} you won!!</p>}
      {!winner && <p>its draw</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}
