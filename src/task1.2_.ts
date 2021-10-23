import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

pipeline(
  createReadStream(path.join('src', 'csv', 'csv.csv')),
  csv({
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
  }),
  createWriteStream(path.join('src', 'csv', 'csv.txt')),
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    error ? console.log(error) : console.log('complete');
  },
);
