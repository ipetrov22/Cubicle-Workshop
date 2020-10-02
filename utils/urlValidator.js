module.exports = function (url) {
    return url.startsWith('http://') || url.startsWith('https://');
}