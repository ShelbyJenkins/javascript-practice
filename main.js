document.querySelector('video').setAttribute("height",  window.innerHeight + 'px');
window.addEventListener('resize', function() {
    document.querySelector('video').setAttribute("height",  window.innerHeight + 'px');
    console.log('Window resized to ' + window.innerHeight + 'px');
});