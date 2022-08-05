const smallCups = ".cup-small"
const liters = "#liters"
const percentage = "#percentage"
const remained = "#remained"
const bigCup = ".cup"

class Cups {
  constructor(bigCup, smallCups, liters, percentage, remained) {
    this.bigCup = document.querySelector(bigCup)
    this.smallCups = document.querySelectorAll(smallCups)
    this.liters = document.querySelector(liters)
    this.percentage = document.querySelector(percentage)
    this.remained = document.querySelector(remained)
  }
  fillCups(index) {
    const checkFull =
      this.smallCups[index].classList.contains("full") &&
      !this.smallCups[index].nextElementSibling.classList.contains("full")
    if (checkFull) {
      index--
    }

    this.smallCups.forEach((cup, localIndex) => {
      if (localIndex <= index) {
        localStorage.setItem("fullCups", index + 1)
        return cup.classList.add("full")
      }
      return cup.classList.remove("full")
    })
  }

  hidePercentage() {
    this.percentage.style.visibility = "hidden"
    this.percentage.style.height = 0
  }

  updatePercentage(height, percentage) {
    this.percentage.style.visibility = "visible"
    this.percentage.style.height = `${height}px`
    this.percentage.textContent = `${percentage}%`
  }

  hideRemained() {
    this.remained.style.visibility = "hidden"
    this.remained.style.height = 0
  }

  showRemained() {
    this.remained.style.visibility = "visible"
  }

  updateLiters(totalCups, fullCups) {
    this.liters.textContent = `${2000 - (2000 / totalCups) * fullCups}`
  }

  updateBigCup() {
    // Variables and constants declaration
    const fullCups = Array.from(this.smallCups).filter((cup) =>
      cup.classList.contains("full")
    ).length
    const totalCups = this.smallCups.length
    const waterHeight = (fullCups / totalCups) * this.bigCup.clientHeight
    const bigCupPercentage = (fullCups / totalCups) * 100

    if (!fullCups) {
      this.hidePercentage()
      this.updateLiters(totalCups, fullCups)
      return
    }
    this.updatePercentage(waterHeight, bigCupPercentage)

    if (fullCups === totalCups) {
      this.hideRemained()
      return
    }
    this.showRemained()
    this.updateLiters(totalCups, fullCups)
  }

  init() {
    const fullCupsCookie = parseInt(localStorage.getItem("fullCups"))
    if (fullCupsCookie) {
      this.smallCups.forEach((cup, index) => {
        if (index < fullCupsCookie) {
          this.fillCups(index)
          this.updateBigCup()
        }
      })
    }
    this.liters.textContent = 2000
    this.smallCups.forEach((cup, index) => {
      cup.addEventListener("pointerup", () => {
        this.fillCups(index)
        this.updateBigCup()
      })
    })
  }
}

function main() {
  const cups = new Cups(bigCup, smallCups, liters, percentage, remained)
  cups.init()
}

main()
