class EventEmitter {
  obj = {}

  on = (event, fn) => {
    (this.obj[event] || (this.obj[event] = [])).push(fn)
  }

  once = (event, fn) => {
    function on () {
      this.off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.on(event, on)
  }

  off = (event, fn) => {
    let fns = this.obj[evnet]
    if (!fns) return false
    if (!fn) {
      // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
      fns && (fns.length =0)
    } else {
      for (let i =0; i < fns.length; i++) {
        cb = fns[i]
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1)
          break
        }
      }
    }
  }

  emit = () => {
    let event = [].shift.call(arguments)
    let fns = [...this.obj[event]]
    if (!fns && fns.length === 0) {
      return false
    }
    fns.forEach(fn => {
      fn.apply(this, arguments)
    })
  }
}