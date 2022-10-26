#!/usr/bin/env node
import { getArgs } from './helper/args.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

const saveToken = async (token) => {
    try {
        if (!token.length) {
            printError('Нет токена');
            return;
        }
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    try {
        if (!city.length) {
            printError('Не указан город');
            return;
        }
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const getForecast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
};

(() => {
    console.log('Started');
    const argv = getArgs(process.argv);

    if (argv.h) {
        return printHelp();
    }

    if (argv.s) {
        return saveCity(argv.s);
    }

    if (argv.t) {
        return saveToken(argv.t);
    }
    return getForecast();
})();
