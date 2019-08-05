// // var submitSrc = 'http://120.77.181.41:3000/api/addngodcom'
// // var lenS = submitSrc.length - 6
// // // console.log(lenS);
// // submitSrc.substring(lenS, lenS + 3)
//
// // const str = '9kFZTQLbUWOjurz9IKRdeg28rYxULHWDUrIHxCY6tnHleoJ'
// // const obj = {}
// // Array.from(str).reduce((accumulator, current) => {
// //     current in accumulator ? accumulator[current]++ : accumulator[current] = 1
// //     return accumulator;
// // }, obj)
//
// // for (var item in obj) {
// //     console.log(item + " " + obj[item]);
// // }
//
// // function timeout1(ms) {
// //     return new Promise((resolve, reject) => {
// //         // Promise中是一些异步操作
// //         setTimeout(resolve, ms, 'res1')
// //     })
// // }
// //
// // function timeout2(ms) {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(reject, ms, 'rej')
// //     })
// // }
// //
// // Promise
// //     .all([timeout1(1000), timeout2(2000)])
// //     .then(res => {
// //         console.log(res);
// //     }).catch(error => {
// //     console.log(error);
// // })
//
// // var a="undefined";
// // var b="false";
// // var c="";
// // function assert(aVar){
// //     if(aVar)
// //         console.log(true);
// //     else
// //         console.log(false);
// // }
// // assert(a);
// // assert(b);
// // assert(c);
//
// // function* gen(x) {
// //     x +=1
// //     yield x+1
// //     x += 2
// //     yield x+2
// //     return x
// // }
// //
// // let g = gen(0)
// // // console.log(g.next().value);
// // // console.log(g.next().value);
// // // console.log(g.next());
// // // console.log(g.next());
// // // for (var item of g) {
// // //     console.log(item);
// // // }
// // var ag = Array.from(g)
// // console.log(ag);
// // Array.from(g).forEach(item => {
// //     console.log(item);
// // })

// 异步demo
// function takeLongTime(n) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(n + 200), n)
//         // setTimeout(function () {
//         //     resolve(n + 200)
//         // }, n)
//     })
// }
//
// function s1(n) {
//     console.log(`s1 with ${n}`);
//     return takeLongTime(n)
// }
//
// function s2(n) {
//     console.log(`s2 with ${n}`);
//     return takeLongTime(n)
// }
//
// function s3(n) {
//     console.log(`s3 with ${n}`);
//     return takeLongTime(n)
// }
//
// // function doAll() {
// //     console.log("start");
// //     let init = 1000
// //     s1(init).then(res => s2(res))
// //         .then(res => s3(res))
// //         .then(res => console.log(`final ${res}`))
// // }
// //
// // doAll()
//
// (async function doIt() {
//     console.log("start");
//     // 优点在于写法和同步类似
//     const t1 = 300
//     const t2 = await s1(t1)
//     // console.log("t1***t2")
//     const t3 = await s2(t2)
//     // console.log("t2***t3")
//     // setTimeout(function () {
//     //     console.log("inner Timeout")
//     // },0)
//     // console.log("t2***t3_bottom")
//     const res = await s3(t3)
//     console.log(`result is ${res}`);
//     console.log("end");
// })()

// var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// var newArr = arr.toString().split(",").map(Number).sort((a, b) => {
//     return a - b
// })
//
// console.log(Array.from(new Set(newArr)));

// 实现自己的new
// function _new(fun, ...arg) {
//     const obj = Object.create(fun.prototype)
//     // const ret = fun.apply(obj, arg)
//     console.log(arg)
//     console.log(...arg)
//     const ret = fun.call(obj, ...arg)
//     console.log(obj);
//     return typeof ret === "object"?ret:obj
// }
// function _new(fn, ...args) {
//     const obj = {};
//     Object.setPrototypeOf(obj, fn.prototype);
//     const result = fn.apply(obj, args);
//     console.log(result);
//     // 根据规范，返回 null 和 undefined 不处理，依然返回obj
//     return result instanceof Object ? result : obj;
// }
// function _new() {
//     // 获取构造函数名 shift会修改原数组
//     let fn = Array.prototype.shift.call(arguments)
//     // let fn = [].slice.apply(arguments, [0, 1])[0]
//     console.log(fn);
//     // console.log(arguments);
//     // console.log(...arguments);
//     // 创建空对象
//     const obj = Object.create(fn.prototype)
//     // this指向obj
//     const ret = fn.call(obj, ...arguments)
//     // 有返回值(对象） 则返回返回值（对象） 没有则返回新建的对象
//     return ret instanceof Object?ret:obj
// }
//
// function A(d,b) {
//     this.d = d;
//     this.b = b;
//     // return {
//     //     a: 6
//     // };
//     // return {}
// }
// console.log(new A(123,111));  //{a: 6}
// console.log(_new(A, 123,111)); //A {d: 123}

// 防抖和节流
// <!--<div class="content" style="height: 150px; background-color: #bfa;-->
// <!--text-align: center;line-height: 150px;color: #fff;font-size: 80px;">-->
//
// <!--</div>-->
// <!--<script>-->
// <!--let num = 1-->
// <!--let cnt = document.getElementsByClassName("content")[0]-->
//
// <!--function count() {-->
// <!--cnt.innerHTML = num++-->
// <!--}-->
//
// <!--// 暴力版本1 每次触发重置定时器 非立即执行-->
// <!--// function debounce(func, wait) {-->
// <!--//     let timeout-->
// <!--//     return function () {-->
// <!--//         let cnt = this-->
// <!--//         let args = arguments-->
// <!--//         // console.log(cnt, args);-->
// <!--//         if (timeout) clearTimeout(timeout)-->
// <!--//         timeout = setTimeout(() => {-->
// <!--//             func.apply(cnt, args)-->
// <!--//         }, wait)-->
// <!--//     }-->
// <!--// }-->
//
// <!--// 暴力版本2 每次触发重置定时器 立即执行-->
// <!--// function debounce(func, wait) {-->
// <!--//     let timeout-->
// <!--//     return function () {-->
// <!--//         let cnt = this-->
// <!--//         let args = arguments-->
// <!--//         // console.log(cnt, args);-->
// <!--//         let donow = !timeout-->
// <!--//         if (timeout) clearTimeout(timeout)-->
// <!--//         timeout = setTimeout(() => {-->
// <!--//             func.apply(cnt, args)-->
// <!--//         }, wait)-->
// <!--//         if (donow) func.apply(cnt, args)-->
// <!--//     }-->
// <!--// }-->
//
// <!--// 节流 时间戳-->
// <!--// function throttle(func, wait) {-->
// <!--//     let pre = 0-->
// <!--//     return function () {-->
// <!--//         let now = Date.now()-->
// <!--//         let cnt = this-->
// <!--//         let args = arguments-->
// <!--//         if (now - pre > wait) {-->
// <!--//             func.apply(cnt, args)-->
// <!--//             pre = now-->
// <!--//         }-->
// <!--//     }-->
// <!--// }-->
//
// <!--// 节流 定时器-->
// <!--function throttle(func, wait) {-->
// <!--let timeout-->
// <!--return function () {-->
// <!--let cnt = this-->
// <!--let args = arguments-->
// <!--if (!timeout) {-->
// <!--timeout = setTimeout(() => {-->
// <!--timeout = null-->
// <!--func.apply(cnt, args)-->
// <!--}, wait)-->
// <!--}-->
// <!--}-->
// <!--}-->
//
//
// <!--// cnt.addEventListener("mouseover", debounce(count, 1000))-->
// <!--// cnt.onmousemove = debounce(count, 1000)-->
// <!--cnt.onmousemove = throttle(count, 1000)-->
// <!--</script>-->

// 深浅拷贝
// var obj1 = {
//     name:"xbb",
//     age: 25,
//     fun: function getName() {
//         return this.name
//     },
//     innerObj: {
//         msg: "inner Obj",
//         flag: true
//     }
// }
//
// var obj2 = {
//     Newname: "AA"
// }
//
// // 其实还算是浅拷贝 因为对内部的对象拷贝依旧属于浅拷贝
// function myCopy(oldObj, newObj) {
//     newObj = newObj || {}
//     for (var i in oldObj) {
//         newObj[i] = oldObj[i]
//     }
// }
// // 深拷贝 考虑存在内部对象的情况
// function myDeepCopy(oldObj, newObj) {
//     newObj = newObj || {}
//     for (var i in oldObj) {
//         if (oldObj[i] instanceof Object) {
//             newObj[i] = (oldObj[i].constructor === Array?[]:{})
//             myDeepCopy(oldObj[i], newObj[i])
//         } else {
//             newObj[i] = oldObj[i]
//         }
//     }
// }
//
// // 深拷贝 数组和对象均通用
// function deepCopy(obj) {
//   if (!obj && typeof obj !== 'object') {
//     throw new Error('error arguments');
//   }
//   // const targetObj = obj.constructor === Array ? [] : {};
//   const targetObj = Array.isArray(obj) ? [] : {};
//   for (let key in obj) {
//     //只对对象自有属性进行拷贝
//     if (obj.hasOwnProperty(key)) {
//       if (obj[key] && typeof obj[key] === 'object') {
//         targetObj[key] = deepCopy(obj[key]);
//       } else {
//         targetObj[key] = obj[key];
//       }
//     }
//   }
//   return targetObj;
// }
//
// // 一招鲜吃遍天 深拷贝
// obj2 = JSON.parse(JSON.stringify(obj1))
// // obj2 = obj1
//
// // myDeepCopy(obj1, obj2)
// console.log(obj1);
// console.log(obj2);
// // obj2.innerObj.msg = "inner !!!!***!!!"
// obj2.fun = new Promise(resolve => {
//     setTimeout(() =>{
//         resolve("XBB")
//     }, 1000)
// })
// obj2.fun.then(res => {
//     console.log(res);
// })
// console.log(obj2);
// console.log(obj1);

// const obj = {
//     name: " jsCoder",
//     skill: ["es6", 'react', 'angular'],
//     say: function () {
//         for (let i = 0, len = this.skill.length; i < len; i++) {
//             setTimeout(() => {
//                 console.log('No.' + (i+1) + this.name);
//                 console.log(this.skill[i]);
//                 console.log('--------------------------');
//             }, 0);
//             console.log(i+1);
//         }
//     }
// };
// obj.say();
/*
期望得到下面的结果:
1
2
3
No.1 jsCoder
es6
/------------------------
No.2 jsCoder
react
/---------------------------
No. 3 jsCoder
angular
/--------------------------
*/
// let arr = [3,1,5,8]
// function xxl(arr, sum) {
//     arr.unshift(1)
//     arr.push(1)
//     // console.log(arr);
//     let max=0;
//     let index;
//     for (let i=1;i<=arr.length-2;i++) {
//         if (arr[i-1]*arr[i]*arr[i+1]>max) {
//             max = arr[i-1]*arr[i]*arr[i+1]
//             index = i
//         }
//     }
//     arr.splice(index,1)
//     arr.shift(1)
//     arr.pop()
//     console.log(arr);
//     sum += max
//     return sum
// }
//
// let summ = 0
// while (arr.length>2) {
//     summ = xxl(arr, summ)
//     console.log(summ);
// }
// if (arr.length==1) {
//     summ += arr[0]
// }
// if (arr.length==2) {
//     summ += arr[0]*(arr[1] + 1)
// }
// console.log(summ);

// var n1='zijietiaodong'
// var n2='ffi4ooioioi5gg111iiiiiii00ojj'
// var n3='ioo665o'
// function del(str) {
//     let arr = str.split("")
//     let res = []
//     for (let i = arr.length - 1; i >= 0;) {
//         if (arr[i] == "i" || arr[i] == "o") {
//             i = i - 2
//         } else {
//             res.unshift(arr[i])
//             i--
//         }
//     }
//     return res.join("")
// }
//
// console.log(del(n1));
// console.log(del(n2));
// console.log(del(n3));

// let str = "    tr    ime  ee aedd  "
// function mytrim(str) {
//     str = str.trim()
//     // console.log(str);
//     let patt = /\s+/g
//     str = str.replace(patt, " ")
//     return str
// }
//
// console.log(mytrim(str));

// function splitstr(str) {
//
//     var a = str.split('');//字符串数组
//     let over = true
//     for (let i = 1; i <= a.length - 1; i++) {
//         if (a[i] <= 'Z' && a[i] >= "A") {
//             if (over) {
//                 a[i] = "_" + a[i]
//             }
//             if (a[i + 1] <= 'Z' && a[i + 1] >= "A") {
//                 over = false
//                 continue
//             }
//             if (!over) {
//                 over = true
//                 a[i] = "_" + a[i]
//             }
//         }
//     }
//     return a.join("").toLowerCase();
// }
//
// console.log(splitstr("oneVariable"));//测试成功
// console.log(splitstr("OneHTTPRequest"));//测试成功
// console.log(splitstr("variable"));//测试成功

// function count(N) {
//     let rest = 1024 - N
//     let m = 64
//     let countCoins = Math.floor(rest / m)
//     let coins
//     rest = rest % m
//     while(rest !== 0 && (m /= 4)) {
//         coins = Math.floor(rest / m)
//         rest = rest % m
//         countCoins += coins
//     }
//     return countCoins
// }
//
// console.log(count(200));



