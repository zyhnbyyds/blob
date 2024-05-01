import { addColors, createLogger, format, transports } from 'winston'

const { label, colorize, timestamp, splat, json, prettyPrint, printf } = format

addColors({
  error: 'red bold',
  warn: 'yellow bold',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
})

export default createLogger({
  level: 'info',
  format: format.combine(
    label({ label: 'Blob' }),
    colorize(),
    timestamp(),
    json(),
    colorize(),
    splat(),
    prettyPrint(),
    printf(({ level, message, timestamp, label }) => {
      return `[${label}] ${dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}: ${level}: ${message}`
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'info.log', level: 'info' }),
  ],
})
