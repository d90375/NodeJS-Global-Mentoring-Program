import CONFIG from './common/config';
import app from './app';
import { fillGreen } from './common/chulk';

app.listen(CONFIG.PORT, () =>
  console.log(fillGreen(`App is running on http://localhost:${CONFIG.PORT}`)),
);
