setImmediate(() => {
  console.log("setImmediate-2")
  setImmediate(() => {  //没有阻塞的效果
    for (var i = 0; i < 100; i++) {
      console.log('nextTick')
    }
  })
})

setImmediate(() => {
  console.log("setImmediate-3")
})
