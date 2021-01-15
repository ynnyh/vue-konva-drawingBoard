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

// 根据传入的图形类型和attr修改
export function setAttr (type, params, data) { // 图形类型，图形自身参数，data里attr参数
  let obj = {
    draggable: params.draggable,
    rotate: Math.ceil(params.rotation) || 0
  }
  switch (type) {
    case 'rect':
      obj.width = params.width
      obj.height = params.height
      break
    case 'circle':
      obj.radiusX = params.radiusX
      obj.radiusY = params.radiusY
      break
    case 'triangle': case 'pentagon': case 'hexagon':
      obj.radius = params.radius
      break
    case 'arc':
      obj.innerRadius = params.innerRadius
      obj.outerRadius = params.outerRadius
      obj.angle = Math.ceil(params.angle)
      break
    case 'text':
      obj.fontSize = params.fontSize
      break
    case 'line':
      break
    default:
      return
  }
  return {
    ...data,
    ...obj
  }
}

// 图形旋转时解决rect、line和text的旋转中心问题
export function getCenter (shape) { // 需要参数为x, y, width, height, rotation
  // shape.rotation = shape.rotation >= 0 ? shape.rotation : 360 + shape.rotation
  // shape.deg = shape.deg >= 0 ? shape.deg : 360 + shape.deg
  console.log(shape)
  // 由于每次旋转时该图形的(x, y)坐标会发生改变，故而需要寻找一个固定点去推导原始坐标点从而进行旋转
  // 对于图形元素而言，中心点为((x + width) / 2, (y + height) / 2)，与旋转矩阵公式进行推导即可
  // 旋转矩阵公式 x = x * cos rotate - y * sin rotate; y = x * cos rotate + y * sin rotate

  // const newX = (shape.x + shape.width) / 2
  // const newY = (shape.y + shape.height) / 2


  const centerPoint = { // 求出中心点，中心点位置是不变的
    x: shape.oldX + (shape.width / 2) * Math.cos(shape.rotation * Math.PI / 180) + (shape.height / 2) * Math.sin(-shape.rotation * Math.PI / 180),
    y: shape.oldY + (shape.height / 2) * Math.cos(shape.rotation * Math.PI / 180) + (shape.width / 2) * Math.sin(shape.rotation * Math.PI / 180)
  }

  const nowCenterPoint = { // 求出中心点，中心点位置是不变的
    x: shape.x + (shape.width / 2) * Math.cos(shape.deg * Math.PI / 180) + (shape.deg / 2) * Math.sin(-shape.deg * Math.PI / 180),
    y: shape.y + (shape.height / 2) * Math.cos(shape.deg * Math.PI / 180) + (shape.deg / 2) * Math.sin(shape.deg * Math.PI / 180)
  }

  console.log(centerPoint, nowCenterPoint, 'center')

  // const origin = {
  //   x: centerPoint.x - shape.width / 2,
  //   y: centerPoint.y - shape.height / 2,
  // }

  // return {
  //   x: origin.x * Math.cos(shape.deg) - origin.y * Math.sin(shape.deg) + 0, // 不考虑偏移量
  //   y: origin.x * Math.sin(shape.deg) + origin.y * Math.cos(shape.deg) + 0,
  // }

  return {
    x: shape.x + centerPoint.x - nowCenterPoint.x,
    y: shape.y + centerPoint.y - nowCenterPoint.y
  }

}