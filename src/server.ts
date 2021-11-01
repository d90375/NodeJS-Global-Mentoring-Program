import CONFIG from './common/config';
import app from './app';
import { fillGreen, fillRed } from './common/chulk';

process
  .on('unhandledRejection', (err: { message: unknown }) => {
    console.log(fillRed('Unhandled Rejection', err.message));
  })
  .on('uncaughtException', (err) => {
    console.log(fillRed('Uncaught Exception', err.message));
    const { exit } = process;
    exit(1);
  });

app.listen(CONFIG.PORT, () =>
  console.log(fillGreen(`App is running on http://localhost:${CONFIG.PORT}`)),
);
