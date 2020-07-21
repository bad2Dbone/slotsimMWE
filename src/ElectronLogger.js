const logger = window.require('electron-log');

logger.transports.file.fileName = "slotsim.log";
logger.transports.file.maxSize = 10485760;

class ElectronLogger   {

    log (...args) {
        logger.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [32m{level}:[39m{text}';
        logger.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s} [32m{level}:[39m{text}';
        logger.log(...args);
    }

    info(...args) {
        logger.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [32m{level}:[39m{text}';
        logger.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s} [32m{level}:[39m{text}';
        logger.log(...args);
    }

    warn(...args) {
        logger.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [33m{level}:[39m{text}';
        logger.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s} [33m{level}:[39m{text}';
        logger.warn(...args);
    }

    error(...args) {
        logger.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s} [31m{level}:[39m{text}';
        logger.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s} [31m{level}:[39m{text}';
        logger.error(...args);
    }
}

export default ElectronLogger;


