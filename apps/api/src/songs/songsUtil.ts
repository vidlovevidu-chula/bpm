import { songs } from "./songs"

type Song = {
  id: string
  name: string
  artist: string
  BPM: string
}

const findSong = (bpm: number) => {
  let nearestSongs: Song[] = []
  let minDiff = Number.POSITIVE_INFINITY
  let diff = 0

  for (let song of songs) {
    diff = Math.abs(parseInt(song.BPM) - bpm)
    if (diff < minDiff) {
      minDiff = diff
      nearestSongs = [song]
    } else if (diff === minDiff) {
      nearestSongs.push(song)
    }
  }

  return nearestSongs[Math.floor(Math.random() * nearestSongs.length)]
}

const randomSong = () => {
  return songs[Math.floor(Math.random() * songs.length)]
}

export { findSong, randomSong }
