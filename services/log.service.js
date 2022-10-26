import chalk from 'chalk';
import dedent from 'dedent-js';

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ', message);
};

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ', error);
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')} 
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена`),
    );
};
const printWeather = ({ name, weather, main, wind }, icon) => {
    console.log(
        dedent(`${chalk.bgYellow(' WEATHER ')} 
            Погода в городе ${name}
            ${icon}  ${weather[0].description}
            Температура ${main.temp} (ощущается как ${main.feels_like})
            Влажность ${main.humidity}%
            Скорость ветра ${wind.speed}
        `),
    );
};

export { printSuccess, printError, printHelp, printWeather };
