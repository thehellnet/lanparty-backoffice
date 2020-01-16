/* eslint-disable no-fallthrough */
/*eslint no-console: ["off"] */

export class AppLogger {
  constructor() {
    const level = process.env.VUE_APP_LOG_LEVEL || "info";
    this.initLogger(level);
  }

  initLogger(level) {
    this.log = this.debug = this.info = this.warn = this.error = () => {};
    switch (level) {
      case "debug":
        this.debug = console.debug.bind(console);
      case "error":
        this.error = console.error.bind(console);
      case "warn":
        this.warn = console.warn.bind(console);
      case "info":
        this.info = console.info.bind(console);
      case "log":
        this.log = console.log.bind(console);
        break;
      default:
        this.log = this.debug = this.info = this.warn = this.error = () => {};
    }

    this.logToServer = err => {
      /** temp added to print in the console during production */
      console.error(err);
      /** TODO: API integration for logging to server or any custom logic in case of Production environment */
    };
  }
}
