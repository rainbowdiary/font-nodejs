module.exports = compose
// middleware: 对应Koa实例的中间件数组
function compose(middleware) {
  //保证middleware的数据结构 必须是数组中放函数
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  //context : 上下文对象  next:初次为undefined
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      //防止next函数被调多次 （处理边界情况）
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i

      //  每个中间件函数
      let fn = middleware[i]
      // 没有中间件了 （处理边界情况）
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // fn(context, dispatch.bind(null, i + 1)) 是对中间件的调用 next是dispatch，返回一个promise
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
