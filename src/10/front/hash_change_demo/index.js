let mdzz = document.querySelector('#mdzz');
let hello = document.querySelector('#hello');



window.addEventListener('hashchange', function(e) {
    // console.log(e);
    hash = getURIHash(e.newURL);
    handle(hash);
});


function getURIHash(uri) {
    let a = document.createElement('a');
    a.href = uri;
    return a.hash.replace('#', '');
}
function handle(hash) {
    if(hash === 'hello') {
        mdzz.style.display = 'none';
        hello.style.display = 'block';
    } else if(hash === 'mdzz') {
        hello.style.display = 'none';
        mdzz.style.display = 'block';
    }
}