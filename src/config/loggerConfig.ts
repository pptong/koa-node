export const LoggerConfig = {
    appenders: {
        request: {
            type: "dateFile",
            filename: "./logs/reqeust.log",
            pattern: ".yyyyMMdd",
        },
        trace: {
            type: "dateFile",
            filename: "./logs/error.log",
            pattern: ".yyyyMMdd",
        },
        error: {
            type: "dateFile",
            filename: "./logs/error.log",
            pattern: ".yyyyMMdd",
        }
    },
    categories: {
        default: {
            appenders: ["trace"],
            level: "trace"
        },
        error: {
            appenders: ["error"],
            level: "error"
        },
        request: {
            appenders: ["request"],
            level: "trace"
        }
    },
}