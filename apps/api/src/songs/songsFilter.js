import fs from "fs"
export const songsFull = [
  {
    id: "1",
    name: "เพื่อนเล่น ไม่เล่นเพื่อน",
    artist: "Tilly Birds",
    BPM: "55",
  },
  {
    id: "2",
    name: "เธอหมุนรอบฉัน ฉันหมุนรอบเธอ",
    artist: "Scrubb",
    BPM: "57",
  },
  {
    id: "3",
    name: "1 2 3 4 5 I Love You",
    artist: "The Bottom Blues",
    BPM: "59",
  },
  {
    id: "4",
    name: "เรา",
    artist: "Cocktail",
    BPM: "60",
  },
  {
    id: "5",
    name: "Fly Me To The Moon",
    artist: "Frank Sinatra",
    BPM: "60",
  },
  {
    id: "6",
    name: "17",
    artist: "Dept",
    BPM: "61",
  },
  {
    id: "7",
    name: "ใจความสำคัญ",
    artist: "Musketeers",
    BPM: "61",
  },
  {
    id: "8",
    name: "สักวันหนึ่ง",
    artist: "Boyd Kosiyabong",
    BPM: "62",
  },
  {
    id: "9",
    name: "อยากร้องดังดัง",
    artist: "Palmy",
    BPM: "62",
  },
  {
    id: "10",
    name: "Rewrite The Stars",
    artist: "Zac Efron",
    BPM: "63",
  },
  {
    id: "11",
    name: "รักแรกพบ",
    artist: "Tattoo Colour",
    BPM: "64",
  },
  {
    id: "12",
    name: "Here Comes The Sun",
    artist: "The Beatles",
    BPM: "65",
  },
  {
    id: "13",
    name: "เธอคือกาแฟในตอนเช้า",
    artist: "No One Else",
    BPM: "66",
  },
  {
    id: "14",
    name: "น้อย",
    artist: "Whatcharawalee",
    BPM: "67",
  },
  {
    id: "15",
    name: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    BPM: "68",
  },
  {
    id: "16",
    name: "Lover",
    artist: "Taylor Swift",
    BPM: "69",
  },
  {
    id: "17",
    name: "เพ้อเจ้อ",
    artist: "อลาร์ม9",
    BPM: "69",
  },
  {
    id: "18",
    name: "ทำได้เพียง",
    artist: "25 Hours",
    BPM: "70",
  },
  {
    id: "19",
    name: "PLEASE",
    artist: "Atom Chanakan",
    BPM: "70",
  },
  {
    id: "20",
    name: "ถ้าเธอรักใครคนหนึ่ง",
    artist: "Ink Waruntorn",
    BPM: "71",
  },
  {
    id: "21",
    name: "โกหกหน้าตาย",
    artist: "เท่ห์ อุเทน พรหมมินทร์",
    BPM: "72",
  },
  {
    id: "22",
    name: "Tiny Dancer",
    artist: "Elton John",
    BPM: "73",
  },
  {
    id: "23",
    name: "คืนที่ดาวเต็มฟ้า",
    artist: "Pramote Vilepana",
    BPM: "73",
  },
  {
    id: "24",
    name: "ไม่เคย",
    artist: "25 Hours",
    BPM: "74",
  },
  {
    id: "25",
    name: "มองได้แต่อย่าชอบ",
    artist: "Lula",
    BPM: "75",
  },
  {
    id: "26",
    name: "เพื่อนสนิท",
    artist: "Endorphine",
    BPM: "76",
  },
  {
    id: "27",
    name: "ถ้าเราเจอกันอีก",
    artist: "Tilly Birds",
    BPM: "76",
  },
  {
    id: "28",
    name: "L.O.V.E.",
    artist: "คูณสาม ซูเปอร์แก๊งค์",
    BPM: "76",
  },
  {
    id: "29",
    name: "พี่ ๆ ตัดแว่นให้หน่อย",
    artist: "Serious Bacon",
    BPM: "77",
  },
  {
    id: "30",
    name: "ฤดูกาล",
    artist: "25 Hours",
    BPM: "78",
  },
  {
    id: "31",
    name: "แค่มีเธอไปเดินเตะคลื่นทะเลด้วยกัน",
    artist: "No One Else",
    BPM: "78",
  },
  {
    id: "32",
    name: "เพื่อน",
    artist: "Polycat",
    BPM: "79",
  },
  {
    id: "33",
    name: "ดีใจด้วยนะ",
    artist: "Ink Waruntorn",
    BPM: "80",
  },
  {
    id: "34",
    name: "ยินดี",
    artist: "Sarah Salola",
    BPM: "80",
  },
  {
    id: "35",
    name: "คู่แท้",
    artist: "Bird Thongchai",
    BPM: "81",
  },
  {
    id: "36",
    name: "สลักจิต",
    artist: "Pop Pongkool, Da Endorphine",
    BPM: "81",
  },
  {
    id: "37",
    name: "ถ้าเขาจะรัก (ยืนเฉยๆเขาก็รัก)",
    artist: "First Anuwat",
    BPM: "82",
  },
  {
    id: "38",
    name: "เวลาเธอยิ้ม",
    artist: "Polycat",
    BPM: "83",
  },
  {
    id: "39",
    name: "Treat You Better",
    artist: "Shawn Mendes",
    BPM: "83",
  },
  {
    id: "40",
    name: "ดาวหางฮัลเลย์",
    artist: "Fellow Fellow",
    BPM: "84",
  },
  {
    id: "41",
    name: "โต๊ะริม",
    artist: "Nont Tanont",
    BPM: "84",
  },
  {
    id: "42",
    name: "ถ้าเธอ",
    artist: "Stamp, Violette Wautier",
    BPM: "85",
  },
  {
    id: "43",
    name: "ลั่นทม",
    artist: "Cocktail",
    BPM: "86",
  },
  {
    id: "44",
    name: "ทำอะไรสักอย่าง",
    artist: "Pang Nakarin",
    BPM: "87",
  },
  {
    id: "45",
    name: "ลมหายใจ",
    artist: "Boyd Kosiyabong",
    BPM: "88",
  },
  {
    id: "46",
    name: "อยู่ต่อเลยได้ไหม",
    artist: "Singto Numchok",
    BPM: "88",
  },
  {
    id: "47",
    name: "ลา ลา ลา",
    artist: "Dept",
    BPM: "89",
  },
  {
    id: "48",
    name: "Bad Liar",
    artist: "Imagine Dragons",
    BPM: "89",
  },
  {
    id: "49",
    name: "เอาปากกามาวง",
    artist: "Bell Warisara",
    BPM: "90",
  },
  {
    id: "50",
    name: "Happier",
    artist: "Ed Sheeran",
    BPM: "90",
  },
  {
    id: "51",
    name: "ซ่อนกลิ่น",
    artist: "Palmy",
    BPM: "91",
  },
  {
    id: "52",
    name: "มัธยม",
    artist: "Polycat",
    BPM: "92",
  },
  {
    id: "53",
    name: "ไม่อยากเหงาแล้ว",
    artist: "Ink Waruntorn",
    BPM: "93",
  },
  {
    id: "54",
    name: "ลูกอม",
    artist: "Whatcharawalee",
    BPM: "93",
  },
  {
    id: "55",
    name: "ถามหน่อย",
    artist: "VARINZ, Z TRIP, Ponchet, Nonny9, Kanom",
    BPM: "94",
  },
  {
    id: "56",
    name: "Live & Learn",
    artist: "Boyd Kosiyabong",
    BPM: "95",
  },
  {
    id: "57",
    name: "Perfect",
    artist: "Ed Sheeran",
    BPM: "95",
  },
  {
    id: "58",
    name: "คู่ชีวิต",
    artist: "Cocktail",
    BPM: "96",
  },
  {
    id: "59",
    name: "วาสนาผู้ใด",
    artist: "Parkmalody",
    BPM: "96",
  },
  {
    id: "60",
    name: "เดาไม่เก่ง",
    artist: "Three Man Down",
    BPM: "96",
  },
  {
    id: "61",
    name: "แก้มน้องนางนั้นแดงกว่าใคร",
    artist: "เขียนไขและวานิช",
    BPM: "96",
  },
  {
    id: "62",
    name: "รอยยิ้ม",
    artist: "Scrubb",
    BPM: "97",
  },
  {
    id: "63",
    name: "ใจกลางความรู้สึกดีดี",
    artist: "Ae Jirakorn, วิน รัตนพล",
    BPM: "98",
  },
  {
    id: "64",
    name: "ด้วยรักและผูกพัน",
    artist: "Bird Thongchai",
    BPM: "99",
  },
  {
    id: "65",
    name: "ส่งเพลงนี้มาบอกฝันดี",
    artist: "First Anuwat",
    BPM: "99",
  },
  {
    id: "66",
    name: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    BPM: "100",
  },
  {
    id: "67",
    name: "ฟ้า",
    artist: "Tattoo Colour",
    BPM: "100",
  },
  {
    id: "68",
    name: "ข้างกาย",
    artist: "Safeplanet",
    BPM: "102",
  },
  {
    id: "69",
    name: "Something Just Like This",
    artist: "The Chainsmokers",
    BPM: "103",
  },
  {
    id: "70",
    name: "แอบดี",
    artist: "Stamp",
    BPM: "104",
  },
  {
    id: "71",
    name: "How Deep Is Your Love",
    artist: "Bee Gees",
    BPM: "105",
  },
  {
    id: "72",
    name: "คุณและคุณเท่านั้น",
    artist: "Tanatat Chaiyaat",
    BPM: "107",
  },
  {
    id: "73",
    name: "Just the Way You Are",
    artist: "Bruno Mars",
    BPM: "109",
  },
]

const songs = songsFull.filter((song) => {
  return fs.existsSync("./apps/background-removal-poc/songs/" + song.id + ".mp3")
})

console.log(songs)
