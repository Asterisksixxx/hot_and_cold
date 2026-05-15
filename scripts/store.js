class Store {
  static #mysteryValue = null
  static #oldDifference = null

  static get mysteryValue() {
    return this.#mysteryValue
  }

  static get oldDifference() {
    return this.#oldDifference
  }

  static setMysteryValue(value) {
    this.#mysteryValue = value
  }

  static setOldDifference(value) {
    this.#oldDifference = value
  }
}

export default Store
