import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', (line: string) => {
  console.log(line.trim().split('').reverse().join(''));
});
