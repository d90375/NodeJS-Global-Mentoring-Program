import chalk from 'chalk';

export const fillGreen = (text: string) => chalk.white.bgGreenBright.bold(text);

export const fillRed = (text: string) => chalk.white.bgRed.bold(text);
