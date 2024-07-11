const getElementY = elem => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

export const scollToElem = (elem, duration, offset) => {
  // 当前页面滚动条所在的位置
  const startingY = window.pageYOffset
  // 指定元素所在的位置
  const elementY = getElementY(elem)
  // 指定元素的位置 - 当前滚动条的位置 = 还需要滚动多少距离
  const diff = elementY - (startingY + offset)

  // easing 是一个滚动条滚动轨迹的函数
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

  if (!diff) return
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
