export const LoggerConfig = {
    appenders: {
        request: {
            type: "dateFile",
            filename: "./logs/reqeust.log",
            pattern: "-yyyy-MM-dd",
        },
        console: {
            type: "console",
        },
        trace: {
            type: "dateFile",
            filename: "./logs/error.log",
            pattern: "yyyy-MM-dd",
        },
        error: {
            type: "dateFile",
            filename: "./logs/error.log",
            pattern: "yyyy-MM-dd",
        }
    },
    categories: {
        default: {
            appenders: ["console", "trace"],
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