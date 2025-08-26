export class Logger {
  static log(arg0: string, ...args: any[]) {
    console.log(`[🐱 戴宠光愈] ${arg0}`, ...args)
  }

  static error(arg0: string, ...args: any[]) {
    console.error(`[🐱 戴宠光愈] ${arg0}`, ...args)
  }

  static warn(arg0: string, ...args: any[]) {
    console.warn(`[🐱 戴宠光愈] ${arg0}`, ...args)
  }
}
