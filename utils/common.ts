export function handlePathGetFirst(path: string) {
  const arr = path.split('/')
  return arr.length >= 2 ? `/${arr[1]}` : ''
}

/**
 * 根据对象某一唯一属性返回对应index
 * @param array 目标的数组对象
 * @param key 属性key值
 * @param target
 * @returns 对应的index值
 */
export function handleGetIdxByObjAttr<T>(array: T[], key: keyof T, target: any) {
  return array.findIndex((item) => {
    return item[key] === target
  })
}

/**
 * 找出数组中最小或者最大的一个, 须保证数组的唯一性
 * @param array 寻找的数组
 * @param isBigFlg
 * @returns 返回的值
 */
export function arrFindNum(array: number[], isBigFlg = false) {
  // 数组去重
  const setArr = Array.from(new Set(array))
  const sortedArr = setArr.sort((a, b) => {
    return !isBigFlg ? b - a : a - b
  })

  return array.findIndex(item => item === sortedArr[sortedArr.length - 1])
}

/**
 * 样式类型收窄
 * @param judgeAttribute 要收窄的属性
 * @returns 返回对应的数据
 */
export function styleTypeReduce(judgeAttributeVal: string | number) {
  return typeof judgeAttributeVal === 'number' ? `${judgeAttributeVal}px` : judgeAttributeVal
}

/**
 * 保证loading加载时间不少于(duration)默认一秒，避免一闪而过
 * @author zhang_yu_jie
 * @param fn promise请求函数
 * @param status 要绑定的loading状态Ref<boolean>
 * @param extraFn 额外的执行操作
 * @param duration 持续时间
 */
export async function loadingKeep(fn: () => Promise<void>, status: Ref<boolean>, extraFn?: () => any, duration = 1000) {
  status.value = true

  const beforeDate = Date.now()
  await fn()
  const afterDate = Date.now()

  const spend = afterDate - beforeDate

  if (spend > duration) {
    if (extraFn)
      extraFn()

    status.value = false
  }
  else {
    setTimeout(() => {
      if (extraFn)
        extraFn()
      status.value = false
    }, duration - spend)
  }
}
