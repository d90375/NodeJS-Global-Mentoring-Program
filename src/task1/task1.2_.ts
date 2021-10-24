import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

pipeline(
  createReadStream(path.join('src', 'task1', 'csv', 'csv.csv')),
  csv({
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
  }),
  createWriteStream(path.join('src', 'task1', 'csv', 'csv.txt')),
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('complete');
      process.exit(0);
    }
  },
);
