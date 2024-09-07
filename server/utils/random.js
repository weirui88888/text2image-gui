function getRandomInt(min = 100, max = 200) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // 生成随机整数
}


module.exports = {
  getRandomInt
}
