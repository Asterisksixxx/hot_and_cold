let isActive = false
const defaultValue = "00:00:00"
let intervalUpdate
let elapsedTime = 0
let startTime

const $timer = document.querySelector(".timer")

const updateTimer = () => {
  const time = Date.now() - startTime
  const minutes = Math.floor((time / 60000) % 60)
    .toString()
    .padStart(2, "0")
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0")
  const milliseconds = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, "0")
  $timer.textContent = `${minutes}:${seconds}:${milliseconds}`
}
const startTimer = () => {
  if (!isActive) {
    startTime = Date.now() - elapsedTime
    intervalUpdate = setInterval(updateTimer, 10)
    isActive = true
  }
}
const pauseTimer = () => {
  clearInterval(intervalUpdate)
}
const stopTimer = () => {
  clearInterval(intervalUpdate)
  startTime = null
  elapsedTime = 0
  isActive = false
  $timer.textContent = "00:00:00"
}
export { startTimer, stopTimer, pauseTimer }
