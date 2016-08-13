var addEvent = (function {
     if(addEventListener in document) {
        return function(ele, event, cb, useCapture) {
            useCapture = useCapture === undefined ? false : useCapture;
            ele.addEventListener(event, cb, e, useCapture);
        }
     } else if(attachEvent in document) {
        return function(ele, event, cb) {
            ele.attachEvent('on'+event, cb);
        }
     }
}());



function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
};


((params) => {
    console.log(params);
})('fdjkf')


const fn = params => params;
const fn2 = params => {
    return params;
}
console.log(fn2('jafkdj'));


[1,2,3].forEach( function(item, index) {
    console.log(this);
});
var arr = [1, 2, 3, 4 ,5 ,6]
var a = arr.filter(it => it % 2 === 0);

filter
forEach
map
reduce
reduceRight

var arr2 = [];
for(var i = 0; i < arr.length; i++) {
    if(arr[i] % 2 === 0) arr2.push(arr[i]);
}

狗.吃(屎)

吃(狗,屎)




console.log(arr2);

console.log(a);


function sumOfInt(a, b) {
    var sum = 0;
    for (var i = a; i <= b; i++) {
        sum += i;
    }
    return sum;
};

function sumOfSquare(a, b) {
    var sum = 0;
    for (var i = a; i <= b; i++) {
        sum += i*i;
    }
    return sum;
}
function sumOfCube(a, b) {
    var sum = 0;
    for (var i = a; i <= b; i++) {
        sum += i*i*i;
    }
    return sum;
}


function fn(cb) {
    return function(a, b) {
        var sum = 0;
        for (var i = a; i <= b; i++) {
            sum += cb(i);
        }
        return sum;
    }
}

const sumOfInt = fn(i => i);
const sumOfSquare =  fn(i => i*i);
const sumOfCube  = fn(i => i*i*i);



1/(1+3)
1/(3+5)
1/(5+7)


const sumOfSome = fn(i => {
    var a = 2 * i+1;
    return 1/(a+a+2)
})

console.log(sumOfInt(0, 2), sumOfSquare(0, 2), sumOfCube(0, 2));

console.log(sumOfSome(0,2));







forEach([1,2,3], x=> console.log(x));











