import chalk from 'chalk';
import app from './api';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.green(port)}`);
});
