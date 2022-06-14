export default function Goblin() {
  let goblin = {
    name: 'goblin',
    hp: 25,
    isAlive: true,
  }

  return (
    <div className="card gap-4">
      <h1>Goblin</h1>
      <p>Description</p>
      <p className="bar h-14 flex items-center justify-center">HP: {goblin.hp}</p>
      <div className="w-full flex justify-center gap-1">
        <button className="btn w-1/3">Punch</button>
        <button className="btn w-1/3">Kick</button>
      </div>
    </div>
  )
}
