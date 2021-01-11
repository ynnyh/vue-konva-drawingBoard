export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 删除图形
export function delShape (name, data) { // 接收图形name和data数组中图形数据集合
  let arr = data.slice()
  const index = arr.findIndex(i => i.name === name)
  arr.splice(index, 1)
  return arr
}

// 绘制图形onMouseDown
export function drawByDown (pos, data, type) {
  let params = {
    draggable: true,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    name: type + '-' + guid(),
  }
  switch (type) {
    case 'rect':
      params.width = 0
      params.height = 0
      break
    case 'circle':
      params.radiusX = 0
      params.radiusY = 0
      break
    case 'triangle': case 'pentagon': case 'hexagon':
      params.radius = 0
      break
    case 'arc':
      params.innerRadius = 0
      params.outerRadius = 0
      params.angle = 0
      break
    case 'line':
      params.points = [Number(pos.x), Number(pos.y)]
      break
    case 'text':
      params.fontSize = 0
      break
    default:
      return
  }
  if (type !== 'line') {
    params.x = Number(pos.x)
    params.y = Number(pos.y)
  }
  return [
    ...data,
    params,
  ]
}