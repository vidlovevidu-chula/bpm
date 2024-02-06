import { Request, Response } from "express";
import { findSong, randomSong } from "./songs/songsUtil";

type BpmRecord = {
  id: string;
  bpm: number;
  timestamp: Date;
};

const bpmRecordsQueue: BpmRecord[] = [];

let currentBpmRecords: BpmRecord[] = [];

async function registerBpm(req: Request, res: Response) {
  const id = req.params.id;
  const bpm = req.query.bpm;
  const timestamp = new Date();

  if (!id || !bpm) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  bpmRecordsQueue.push({
    id,
    bpm: parseInt(bpm as string),
    timestamp,
  });

  console.log(
    `Hardware ID: ${id} BPM: ${bpm} Registered at ${timestamp.toLocaleString()}`
  );

  res.json({
    message: `Hardware ID: ${id} BPM: ${bpm} Registered at ${timestamp.toLocaleString()}`,
    success: true,
  });
}

async function getQueue(req: Request, res: Response) {
  res.json({
    data: bpmRecordsQueue,
    success: true,
  });
}

async function popBpm(req: Request, res: Response) {
  const count = req.body.count;

  if (typeof count !== "number") {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  currentBpmRecords = [];
  let i = 0;

  for (; i < count && bpmRecordsQueue.length > 0; i++) {
    const record = bpmRecordsQueue.shift();

    if (!record) {
      break;
    }

    currentBpmRecords.push(record);

    console.log(
      `Retrieved Hardware ID: ${record.id} BPM: ${record.bpm} Registered at ${record.timestamp.toLocaleString()}`
    );
  }

  res.json({
    message: `Retrieved ${i} BPM records from the queue.`,
    success: true,
  });
}

async function getSong(req: Request, res: Response) {
  if (currentBpmRecords.length === 0) {
    const randomizedSong = randomSong();

    return res.status(400).json({
      success: true,
      data: {
        bpm: [randomizedSong.BPM],
        song: randomizedSong,
      },
    });
  }

  const avgBpm =
    currentBpmRecords.reduce((acc, cur) => acc + cur.bpm, 0) /
    currentBpmRecords.length;

  res.status(200).json({
    success: true,
    data: {
      bpm: currentBpmRecords.map((record) => record.bpm),
      song: {
        ...findSong(avgBpm),
      },
    },
  });
}

export { registerBpm, getQueue, popBpm, getSong };
