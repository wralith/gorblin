import axios from 'axios'
import { useEffect, useState } from 'react'

// TODO: All goblins should be turned into monsters, wait...
// TODO: Why everything is in one place??
// TODO: What is react-query ??

export default function Goblin() {
  const [goblin, setGoblin] = useState({})
  const [goblinKilled, setGoblinKilled] = useState(0)

  useEffect(() => {
    getGoblin().then(data => {
      setGoblin(data)
    })
    getKilledGoblinCount().then(data => {
      setGoblinKilled(data)
    })
  }, [])

  const getKilledGoblinCount = async () => {
    const { data } = await axios.get('http://localhost:8080/api/goblin/killed')
    return data.goblinKilled
  }
  const getGoblin = async () => {
    const { data } = await axios.get('http://localhost:8080/api/goblin')
    return data
  }

  const hitGoblin = async damage => {
    setGoblin({ ...goblin, hp: (goblin.hp -= damage) })

    const { data } = await axios.put('http://localhost:8080/api/goblin', JSON.stringify(goblin))
    if (goblin.hp <= 0) {
      setGoblin(data)
      setGoblinKilled(await getKilledGoblinCount())
    }
  }

  const punchGoblin = () => hitGoblin(5)
  const kickGoblin = () => hitGoblin(7)
  const healGoblin = () => hitGoblin(-5)

  // Heals goblin every 5 second =(
  useEffect(() => {
    const interval = setInterval(() => {
      healGoblin()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card flex gap-3 flex-col p-4 min-h-[15rem] min-w-[20rem]">
      <h1>{goblin.name}</h1>
      <p>Description</p>
      <p className="bar h-14 flex items-center justify-center font">HP: {goblin.hp}</p>
      <div className="w-full flex justify-center gap-1">
        <button className="btn w-1/3" onClick={punchGoblin}>
          Punch
        </button>
        <button className="btn w-1/3" onClick={kickGoblin}>
          Kick
        </button>
      </div>
      <div>
        <h1>Goblin Killed: {goblinKilled}</h1>
      </div>
    </div>
  )
}
