var arr = [1,3,[5,2],7,[4,5,5],5,6]
// arr = Array.from(arr.reduce((acc, val) => acc.concat(val), []));
// arr.flat();
arr = arr.toString().split(',')
arr.sort(function (a, b) {
    return a-b
})

console.log(arr.map(item => parseInt(item)));