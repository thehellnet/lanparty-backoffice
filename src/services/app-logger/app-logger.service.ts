export class AppLogger {
    public log: any
    public debug: any
    public info: any
    public error: any
    public warn: any

    constructor() {
        const level = process.env.VUE_APP_LOG_LEVEL || 'info'
        this.log = this.debug = this.info = this.warn = this.error = () => {}
        this.initLogger(level)
    }

    initLogger(level) {
        switch (level) {
            case 'debug':
                this.debug = console.debug.bind(console)
            case 'error':
                this.error = console.error.bind(console)
            case 'warn':
                this.warn = console.warn.bind(console)
            case 'info':
                this.info = console.info.bind(console)
            case 'log':
                this.log = console.log.bind(console)
                break
            default:
                this.log = this.debug = this.info = this.warn = this.error = () => {}
        }
    }
}

const logger = new AppLogger()

export default logger
