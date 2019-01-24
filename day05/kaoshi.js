/**********************直接将代码或文字写在题目下面即可(每题10分)***************************/
/* 考试为闭卷, 不需要用到网络, 不允许查阅资料, 可以使用浏览器控制台或者index.html文件进行代码调试 */
// 姓名:  李天成


// 1. 封装函数实现字符串的翻转abcde->edcba

// ES3 函数封装:
// function reverse(str) {
//   return str.split('').reverse().join('').replace(/\s/, '')
// }

// 箭头函数简写:
let reverse = (str = '') => str.split('').reverse().join('').replace(/\s/, '')

// 测试代码:
console.log(reverse())
console.log(reverse('abcde'))
console.log(reverse('a bcde'))

// ----------------------------------------------------------------------------------------------------- 
// 2. jquery中的$(document).ready()方法和window.onload有什么区别？

// $(document).ready() 和 window.onload都是页面加载事件

// 区别在于, window.onload事件是指页面HTML结构和外部资源(图片等)都加载完毕后才触发
// $(document).ready() 是在页面HTML结构加载完毕后立即触发
// $(document).ready() 实际上等同于把script标签写在body标签底部, 而window.onload就需要等待资源的加载结束


// -----------------------------------------------------------------------------------------------------
// 3. 封装函数实现将任意二维数组转为一维数组
let arr1 = [[1, 2, 3, 4], [4, 3, 2, 1], [5, 6, 7, 8]]
let arr2 = [[11, 22, 33], [{ a: 1, b: 2 }, { x: 1, x: 2 }]]
// ES3 函数封装
// function parseArray(arr) {
//   // ES5:
//   // let result = []
//   // arr.forEach(item => result = result.concat(item))
//   // return result
//   // ES6:
//   return [].concat(...arr)
// }

// 箭头函数简写:
let parseArray = (arr = []) => [].concat(...arr)

// 测试代码:
console.log(parseArray())
console.log(parseArray(arr1))
console.log(parseArray(arr2))

// -----------------------------------------------------------------------------------------------------
// 4. 封装函数实现JS对任意对象的深拷贝(需要考虑被拷贝的对象上有函数和数组)
function deepCopy(source = {}, target = {}) {
  for (const key in source) {
    const value = source[key]
    if (Array.isArray(value)) {
      target[key] = []
      deepCopy(value, target[key])
    } else if (value instanceof Object) {
      target[key] = {}
      deepCopy(value, target[key])
    } else {
      target[key] = value
    }
  }
  return target
}

// 测试代码:
let obj1 = {
  name: 'zs',
  age: 18,
  gender: 'male',
  friends: ['lily', 'cat'],
  dog: {
    name: 'big yellow',
    age: 1
  }
}

console.log(obj1)
let obj2 = deepCopy(obj1)
console.log(obj2)

obj1.dog.name = 'little black'
console.log(obj1)
console.log(obj2)
// -----------------------------------------------------------------------------------------------------
// 5. 写一个下面两种方式都能调用的函数
// console.log(sum(2,3)); // 输出 5
// console.log(sum(2)(3)); // 输出 5

function sum() {
  if (arguments.length === 1) {
    let arg1 = arguments[0]
    return function (arg2) {
      return arg1 + arg2
    }
  }
  let result = 0
  Array.prototype.forEach.call(arguments, item => result += item)
  return result
}

// 测试代码:
console.log(sum(2, 3))
console.log(sum(2, 3, 4))
console.log(sum(2)(3))

// -----------------------------------------------------------------------------------------------------
// 6. 简述call、apply的区别,使用call或者apply封装一个函数实现bind的功能.
// call和apply都是调用函数时改变函数内部this的指向
// 区别在于call在传参数时是以参数列表的方式传入实参, call的参数列表是可变的
// 例如: Math.max.call(null, 1, 2, 3)
// 而apply是将所有的参数放入一个数组中, 直接传入一个数组, apply只有两个参数
// 例如: Math.max.apply(null, [1, 2, 3])

Function.prototype.myBind = function (obj, ...args) {
  return () => this.apply(obj, args)
}

// 测试代码:
let person1 = {
  name: 'person1',
}
let person2 = {
  name: 'person2',
}

function show(arg1, arg2) {
  console.log(this.name, arg1, arg2)
}

window.name = 'window'
show('嘿嘿', '吼吼')

let newFn1 = show.bind(person2, '嘿嘿', '吼吼')
newFn1()

let newFn2 = show.myBind(person1, '嘿嘿', '吼吼')
newFn2()

let newFn3 = show.myBind(person2, '嘿嘿', '吼吼')
newFn3()

show.myBind(person2, '嘿嘿', '吼吼')()


// -----------------------------------------------------------------------------------------------------
// 7. 封装函数获取url地址 ? 后面的参数, 将参数以键值对的方式存放到对象中进行返回
// 例如http://www.lovegf.cn?name=zs&age=18&type=1 参数对象为{name:'zs',age:18,type:1}

function parseQueryStr(url = '') {
  let queryString = url.split('?')[1]
  if (!queryString) return

  let params = queryString.split('&')
  let result = {}
  params.forEach(item => result[item.split('=')[0]] = item.split('=')[1])
  return result
}

// 测试代码:
let result = parseQueryStr('http://www.lovegf.cn?name=zs&age=18&type=1')
console.log(result)


// -----------------------------------------------------------------------------------------------------
// 8. 封装函数实现数组的随机排序, 例如给定数组[1,2,3,'a','b','c'], 每次调用函数都会得到一个随机排序的数组
// 参照loadash的shuffle方法

function getRandom(arr, max) {
  let random = parseInt(Math.random() * max)
  if (arr.includes(random)) {
    random = getRandom(arr, max)
  }
  return random
}

// loadash
function shuffle(arr) {
  let len = arr.length
  let randomIndex = []
  arr.forEach(() => randomIndex.push(getRandom(randomIndex, len)))
  let newArr = []
  randomIndex.forEach(item => newArr.push(arr[item]))
  return newArr
}

let array1 = [1, 2, 3, 'a', 'b', 'c']
console.log(array1)
console.log(shuffle(array1))

let array2 = [11, 23, 2, 32, 3, 4, 'a', 'b', 'c']
console.log(array2)
console.log(shuffle(array2))

// -----------------------------------------------------------------------------------------------------
// 9. 请用你熟悉的编程语言写出两个以上的排序算法
// 快排 希尔 插入排序 归并排序 冒泡排序 选择排序

// 快排
function quickSort(array) {
  function sort(prev, numsize) {
    var nonius = prev;
    var j = numsize - 1;
    var flag = array[prev];
    if ((numsize - prev) > 1) {
      while (nonius < j) {
        for (; nonius < j; j--) {
          if (array[j] < flag) {
            array[nonius++] = array[j];
            break;
          }
        }
        for (; nonius < j; nonius++) {
          if (array[nonius] > flag) {
            array[j--] = array[nonius];
            break;
          }
        }
      }
      array[nonius] = flag;
      sort(0, nonius);
      sort(nonius + 1, numsize);
    }
  }

  sort(0, array.length);
  return array;
}

let sortArr = [9, 32, 4, 56, 12, 34, 3, 1, 0, 99]
console.log(quickSort(sortArr))

// 归并排序
function mergeSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var temp = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > temp; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
  return arr
}
console.log(mergeSort(sortArr))


// -----------------------------------------------------------------------------------------------------
// 10. 使用熟悉的语言实现一个单例模式(多次调用,返回同一个实例)

// 饿汉式
class Person {
  constructor(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}

function getPerson() {
  if (!Person.p) {
    Person.p = new Person('zs', 18, 'male')
  }
  return Person.p
}

// 测试代码
console.log(getPerson())
console.log(getPerson() === getPerson())
console.log(getPerson() === getPerson())


// Java代码

// public class Test {
//   class Person {
//   private String name;
//   private int age;
//   private String gender;
//   public Person(String name, int age, String gender) {
//     this.name = name;
//     this.age = age;
//     this.gender = gender;
//   }
//   private static Person p;
//   public static Person getPerson() {
//     if (!p) {
//       p = new Person("zs", 18, "male");
//     }
//     return p;
//   }
// }
//   public static void main(String[] args) {
//   Person p1 = Person.getPerson();
//   Person p2 = Person.getPerson();
//   System.out.println(p1 == p2);
// }

/**********************以下题目辅导老师选做***************************/
// 11. 列举出你所知道的所有数据结构, 并说出各种数据结构的特点.
// 堆栈: 先进后出, 例如弹夹填装弹药时的特性, 一般用于任务堆栈和方法栈以及移动端开发的layout栈
//       堆栈的时间复杂度: 增删: O(1)  查询:  O(n)
// 队列: 先进先出, 例如排队场景
//       队列的时间复杂度: 增删: O(1)  查询:  O(n)
// 哈希表: 包含Key-Value的数据结构, 使用散列函数来把关键码值映射到表中一个位置来访问记录, 以加快查找的速度
//       哈希表的时间复杂度: 增删查: O(1)
// 链表: 分为双向链表和单向链表, 双向链表记录当前Node首尾的邻居, 特性是增删快, 查询慢, 与数组特点相反
// 数组: 有序索引的集合, 特点是查询快, 增删慢, 与链表相反
// 图: 顶点节点发散的一个数据结构, 用于复杂的数据结构存储, 多个结构的集合
// 树: 红黑树可以实现数据的自然排序
// Set: 一般分HashSet和TreeSet, Hash的特点是无序且唯一, Tree的特点是排序且唯一, 底层是树结构实现的排序
// Map: Key-Value的特性, 键唯一, 用于快速取值的结构

// 12. TCP、IP、HTTP协议分别在OSI网络参考模型中的哪一层？TCP协议和UDP协议的区别?
// TCP / IP不是协议, 也是一种分层模型, HTTP协议是应用层协议
// OSI七层模型分别对应: 物理层, 数据链路层, 网络层, 传输层, 会话层, 表现层, 应用层
// TCP协议是面向连接协议, UDP是面向无连接协议
// TCP的特点是每次传输数据时都必须建立连接, 而UDP无需建立连接
// TCP每次发送SYN报文必须要收到ACK响应, 才可以继续通信
// UDP的特点是不管另一端是否存在, 都会不断发送数据报文
// TCP如果中途丢包, 会在下次重新建立连接后继续补包, 而UDP丢失了就丢失了
// 所以最终体现在应用上, TCP的效率低下但安全, UDP效率非常高, 适合在一些高性能网络场景应用
// 而且现在也有基于UDP的TCP特性封装

// 13. 大致回答网络请求状态码1xx、2xx、3xx、4xx、5xx分别代表的含义
// 2xx系表示成功类
// 3xx系重定向或缓存类
// 4xx系表示客户端错误, 例如bad request / not found等
// 5xx系表示服务端错误, 例如Internal Error等


// 14. 线程和进程的区别？多线程应用会存在什么问题？如何解决?
// 进程一般是指操作系统为每个程序开启的一个单独的环境, 而线程是指程序内部为了提高并发执行效率

// 分不同的线程去执行任务, 在高并发量的情况下, 多线程的优势非常巨大, 但是有了多线程就会出现

// 共享数据操作混乱的现象, 例如A数据, 在主线程中会访问, 在子线程中也会访问, 此时就会产生数据管理混乱

// 当然, 大部分非重要数据都不需要担心管理混乱的问题, 但是重要数据, 例如银行卡余额等数据

// 必须要精确的控制时, 一般会采用线程锁的方式来完成, 例如Java中的线程同步机制, 强制限制线程的

// 原子性操作, 某个线程操作数据时, 其他现场必须等待, 这样就可以解决数据安全的问题了, 不过效率也会降低


// 15. 将1024转化为8进制和16进制, 简述转换方式
// 最基础的办法是先把十进制转为二进制, 使用8421算法进行转换, 得出结果是: 0100 0000 0000

// 将二进制转为八进制:
// 三位二进制数按权展开相加得到1位八进制数.(注意事项: 3位二进制转成八进制是从右到左开始转换, 不足时补0)
// 421 421 421 421
// 010 000 000 000
//  2   0   0   0

// 将二进制转为十六进制:
// 与二进制转八进制方法近似, 八进制是取三合一, 十六进制是取四合一(注意事项: 四位二进制转成十六进制是从右到左开始转换, 不足时补0)

//8421 8421 8421
//0100 0000 0000
// 4    0    0


// 结果是:
// OCT: 2000
// HEX: 400

// 16. (选做)现有初始状态均为空的栈X和队列Y, 元素a、b、c、d、e、f、g依次进入栈X, 每个元素出栈后即进入队列Y, 如果出队列的顺序为b、c、f、e、g、d、a, 则要求栈X最小容量为________

// 由于队列是先进先出线性表, 队列Y的出队顺序为b、c、f、e、g、d、a, 则入队顺序必定也是b、c、f、e、g、d、a, 这一顺序就是栈X的出栈顺序. 又由于入栈顺序为a、b、c、d、e、f、g, 因此入栈和出栈顺序是: a、b入栈, b出栈, c入栈, c出栈,  d、e、f入栈, f、e出栈, g入栈, g、d、a出栈. 因此栈中驻留元素最多是4个, 因此栈X的容量至少应该为4. 