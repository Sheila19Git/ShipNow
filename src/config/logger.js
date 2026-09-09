const winston = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
});

const transports = [
    new winston.transports.DailyRotateFile({
        filename: "logs/error-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "warning",
        maxFiles: "7d",
        zippedArchive: true
    }),

    new winston.transports.DailyRotateFile({
        filename: "logs/combined-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        maxFiles: "7d",
        zippedArchive: true
    })
];

if (process.env.NODE_ENV !== "production") {
    transports.push(
        new winston.transports.Console({
            format: combine(
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                logFormat
            )
        })
    );
}

const logger = winston.createLogger({
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    level:
        process.env.LOG_LEVEL ||
        (process.env.NODE_ENV === "production" ? "info" : "debug"),

    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),

    transports
});

module.exports = logger;
