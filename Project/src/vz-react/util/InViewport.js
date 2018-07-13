const isInViewport = elem => {
  let rect = elem.getBoundingClientRect()
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight || document.documentElement.clientHeight) - 500
  )
}

export default isInViewport
