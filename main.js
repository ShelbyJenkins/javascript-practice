// Click anywhere to load main page.
window.addEventListener('click', loadMain);

function loadMain() {
    // Generates effects for transition from intro to main.
    randomTyping();
    document.getElementById('intro').classList.add('intro-container-spin-fade');
    // Removes EL once main page is loaded to prevent repeat reload.
    window.removeEventListener('click', loadMain);
    // Loads main page once transition ends.
    setTimeout(function() {
        document.body.style.overflow = 'auto';
        document.getElementById('intro').style.display = 'none';
        document.getElementById('main').style.display = 'flex';
        document.getElementById('main').style.backgroundColor = 'white';
        document.body.style.backgroundColor = 'white';
        }, 2500);
}

// Randomly generates increasing text for a screaming trip through a portal.
// Must be async due to the interaction between the for loop and the timeout.
const timer = ms => new Promise(res => setTimeout(res, ms))
async function randomTyping () {   
    // Grabs the elements before the loop is initiated 
    txt = document.getElementById('intro-content');
    fS = parseInt(window.getComputedStyle(txt, null).getPropertyValue('font-size'));
    cnt = document.getElementsByClassName('intro-container')[0]
    cW = parseInt(window.getComputedStyle(cnt, null).getPropertyValue('width'));
    for (var i = 0; i < 60; i++) {
        // Increases the width of the container per iteration.
        document.getElementsByClassName('intro-container')[0].style.width =+ 100 + '%'; 
        // Increases text size per iteration
        txt.style.fontSize = (fS += 6) + 'px';
        cnt.style.width = (cW += 50) + 'px';
        // This section generates an 'a' or 'A' at random. Switch is cleaner than if.
        let randomNumber = Math.floor(Math.random() * 3);
        switch (randomNumber) {
            case 0:
            case 1:
                document.getElementById('intro-content').innerHTML += 'a';
            case 2:
                document.getElementById('intro-content').innerHTML += 'A';
        await timer(50); 
        }
    }
}