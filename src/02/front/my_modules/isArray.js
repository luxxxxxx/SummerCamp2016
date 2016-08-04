var isArray = function (arr) {
    return Object.prototype.toString.call(arr) == Object.prototype.toString.call([]); 
}
module.exports = isArray;