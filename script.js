var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var highscore = getCookie("highscore") || 0;

//zodat de gaat tussen -150 en -450 radom showed
hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});



// elke 10ms rekent het uit waar de top is van de character en door de nieuwe charater style top valt die steed naar beneden aka zwaartekracht
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping == 0){
        character.style.top = (characterTop + 3) + "px";
    }




    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);

    //game over 20- -50  als je the block aanraakt   als je ctop holetop is tussen de 120 pixel dan is het goed van 150-25 px = 125
    if((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 125)))){
        alert("Game over. Score: " + (counter - 1) + "\nHighscore: " + highscore);
        if (counter - 1 > highscore) {
            highscore = counter - 1;
            setCookie("highscore", highscore, 365);
        }
        character.style.top = 100 + "px";
        counter = 0;
    }
}, 10);
//gwn jump functie
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop > 6) && (jumpCount < 15)){
            character.style.top = (characterTop - 5) + "px";
        }
        if(jumpCount > 20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}


//hoelang het duurt om te verlopen
function setCookie(cname, cvalue, ) {
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//checkt op een cookie een specfieke naam heeft maar hij werk niet ;(
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//zodat de highscore opgeslagen wordt als je de pagina refresh
function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
