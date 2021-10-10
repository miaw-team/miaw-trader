const log = (...msg: any): void => {
  process.env.NODE_ENV === 'development' && console.log(...msg)
}
export default {
  log,
}
