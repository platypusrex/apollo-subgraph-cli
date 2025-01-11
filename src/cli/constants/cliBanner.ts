import boxen from 'boxen';
import chalk from 'chalk';

export const cliBanner = {
  header: (command: string) => {
    console.log(
      boxen(chalk.blueBright(`subgraph: ${chalk.green(command)}`), {
        borderStyle: 'round',
        textAlignment: 'center',
        width: 40,
      })
    );
  },
  footer: () => {
    console.log(chalk.green('\nTasks completed successfully. Happy coding!'));
  },
};
