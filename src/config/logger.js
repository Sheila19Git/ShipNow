const winston = require("winston");

const {
    combine,
    timestamp,
    printf
} = winston.format;

const logFormat = printf(
    ({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`;
    }
);

const transports = [
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),

    new winston.transports.File({
        filename: "logs/combined.log"
    })
];

// La consola se utiliza únicamente en desarrollo
if (process.env.NODE_ENV === "development") {
    transports.push(
        new winston.transports.Console({
            format: combine(
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
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
        (
            process.env.NODE_ENV === "production"
                ? "info"
                : "debug"
        ),

    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        logFormat
    ),

    transports
});

module.exports = logger;