window.addEventListener('click', loadMain);
window.addEventListener('resize', resizeVideo);

// sets and maintains perfectly scaled height of video and site width
function resizeVideo() {
    document.querySelector('video').style.height = window.innerHeight + 'px';
    var vWidth = document.querySelector('video').clientWidth;
    console.log(vWidth);fs
    if (vWidth > window.innerWidth) {
        document.querySelector('video').style.width = "100%";
        // document.querySelector('video').style.height = "100%";
        console.log(vWidth);
    }
}


// Randomly generates increasing text for a screaming trip through a portal.
const timer = ms => new Promise(res => setTimeout(res, ms))
async function randomTyping () { 
    document.getElementById("intro-content").innerHTML = "A";  
     // This section increase text size and container width per iteration
    txt = document.getElementById('intro-content');
    fSize = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    fS = parseInt(fSize);
    cnt = document.getElementsByClassName("intro-container")[0]
    cWidth = window.getComputedStyle(cnt, null).getPropertyValue('width');
    cW = parseInt(cWidth);
    for (var i = 0; i < 60; i++) {
        document.getElementsByClassName("intro-container")[0].style.width =+ 100 + "%"; 
        // This section increase text size and container width per iteration
        fS += 6;
        cW += 50;
        txt.style.fontSize = fS + 'px';
        cnt.style.width = cW + 'px';
        // This section generates an 'a' or 'A' at random.
        let randomNumber = Math.floor(Math.random() * 3);
        switch (randomNumber) {
            case 0:
            case 1:
                document.getElementById("intro-content").innerHTML += "a";
            case 2:
                document.getElementById("intro-content").innerHTML += "A";
        await timer(50); 
        }
    }
}

function loadMain() {
    randomTyping();
    window.removeEventListener('click', loadMain);
    document.getElementById('intro').classList.add("intro-container-spin-fade");
    setTimeout(function() {
        document.body.style.overflow = "auto";
        document.getElementById('intro').style.display = 'none';
        document.getElementById('main').style.display = 'flex';
        // Sets background color to white for intro transition.
        document.getElementById('main').style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        resizeVideo();
        }, 2500);
}
