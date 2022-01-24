import chalk from 'chalk';

export const fillGreen = (text: string) => chalk.white.bgGreenBright.bold(text);

export const fillRed = (text: string, err?: unknown) => chalk.white.bgRed.bold(text, err);

export const fillGreenSoft = (text: string) => chalk.white.bgGreen.bold(text);
