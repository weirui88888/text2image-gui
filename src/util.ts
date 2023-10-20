const sleep = async (time: number = 1) => {
  // eslint-disable-next-line promise/param-names
  return await new Promise(res => {
    setTimeout(res, time * 1000)
  })
}

export { sleep }
