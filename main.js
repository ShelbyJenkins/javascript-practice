window.addEventListener('click', loadMain);

// sets and maintains perfectly scaled height of video and site width
document.getElementById('cityVideo').style.height = window.innerHeight + 'px';
document.querySelector('video').style.height = window.innerHeight + 'px';
// document.querySelector('body').style.width = window.innerWidth + 'px';

window.addEventListener('resize', function() {
    document.getElementById('cityVideo').style.height = window.innerHeight + 'px';
    document.querySelector('video').style.height = window.innerHeight + 'px';
    // document.querySelector('body').style.width = window.innerWidth + 'px';
});



    
function loadMain() {
    console.log('test');
    window.removeEventListener('click', loadMain);
    document.getElementById('intro').style.display = 'none';
    document.getElementById('main').style.display = 'flex';
    // Sets background color to white for intro transition.
    window.onLoad = document.querySelector('body').style = "background-color: white";
}


