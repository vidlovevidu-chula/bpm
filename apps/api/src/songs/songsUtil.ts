import { songs } from "./songs"

export type Song = {
  id: string
  name: string
  artist: string
  BPM: string
  imgPath?: string
  songPath?: string
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
  const rand = Math.floor(Math.random() * nearestSongs.length)
  return {
    ...nearestSongs[rand],
    imgPath: `/songs/${nearestSongs[rand].id}.jpg`,
    songPath: `/songs/${nearestSongs[rand].id}.mp3`,
  }
}

const randomSong = () => {
  const rand = Math.floor(Math.random() * songs.length)
  return {
    ...songs[rand],
    imgPath: `/songs/${songs[rand].id}.jpg`,
    songPath: `/songs/${songs[rand].id}.mp3`,
  }
}

export { findSong, randomSong }
