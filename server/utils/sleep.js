module.exports = {
  async sleep(second = 1) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, second * 1000)
    })
  }
}
