const GameDiv = document.querySelector(".game");
const classArray = ["card-1", "card-1", "card-2", "card-2", "card-3", "card-3", "card-4", "card-4", "card-5", "card-5", "card-6", "card-6", "card-7", "card-7", "card-8", "card-8"];
var clickedCard1 = null;
var clickedCard2 = null;
var gameid = 0;
var div = document.createElement("div");
var d = 4;

GameSet();

function CardsShuffle() {

    removeAllChildNodes(GameDiv);

    const divs = [];
    for (let i = 1; i <= d; i++) {
        const Carddiv = document.createElement('div');
        Carddiv.classList.add("card", classArray[i - 1]);

        const CardBack = document.createElement('div')
        CardBack.classList.add('cardback');



        Carddiv.appendChild(CardBack);
        divs.push(Carddiv);
    }

    for (let i = divs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [divs[i], divs[j]] = [divs[j], divs[i]]; // Swap divs
    }

    divs.forEach((Carddiv) => {
        GameDiv.appendChild(Carddiv);

    });

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function GameSet() {
    var Display = document.getElementById("modal");
    var startbtn = document.getElementById('startbtn');
    const radioButtons = document.querySelectorAll('input[name="difficulty"]');
    d = 4;

    Display.style.display = "flex";

    startbtn.addEventListener("click", function submitEditUser(event) {
        event.preventDefault();
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                d = radioButton.value;

                Display.style.display = "none";


                break;
            }
        }
        CardsShuffle();
        NewGame();


    });


    //window.onclick = function (e) {
    //    if (e.target === modal) {
    //        Display.style.display = "none";
    //
    //        editUserName.value = '';
    //        editUserLastName.value = '';
    //        editUserEmail.value = '';
    //        editUserPassword.value = '';
    //
    //        editSting.textContent = "";
    //        editSting.style.color = "black";
    //        editbtn.disabled = false;
    //
    //    }
    //};
    //


}


function NewGame() {


    const cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', GameCount);

    }

    function WinCheck() {

        const cards = document.querySelectorAll('.card');
        console.log("check");
        let allNotVisible = true;

        cards.forEach(card => {
            const cardStyle = getComputedStyle(card);
            if (cardStyle.getPropertyValue('visibility') === 'visible') {
                allNotVisible = false;
                console.log(cardStyle.getPropertyValue('visibility'));
                return;
            }
        });

        if (allNotVisible) {
            alert('You win!');
            console.log("win");


            removeAllChildNodes(GameDiv);

            GameSet();
        }
        else {
            console.log("not win");
        }
    }





    function GameCount(event) {

        console.log("click");




        const card = event.target.closest(".card");;



        card.childNodes[0].style.display = "none";

        if (card === clickedCard1) {
            // Ignore clicks on the same card
            return;
        }

        gameid++;

        if (gameid === 1) {
            clickedCard1 = card;
        } else if (gameid === 2) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].removeEventListener('click', GameCount);

            }

            clickedCard2 = card;
            if (clickedCard1.classList.toString() === clickedCard2.classList.toString()) {
                console.log("Classes matched: " + clickedCard1.classList.toString());
                clickedCard1.classList.add("right");
                clickedCard2.classList.add("right");



                setTimeout(() => {
                    clickedCard1.classList.remove("right");
                    clickedCard2.classList.remove("right");
                    clickedCard1.childNodes[0].style.display = "block";

                    clickedCard2.childNodes[0].style.display = "block";
                    //clickedCard1.remove();
                    //clickedCard2.remove();

                    clickedCard1.style.visibility = "hidden";
                    clickedCard2.style.visibility = "hidden";

                    for (var i = 0; i < cards.length; i++) {
                        cards[i].addEventListener('click', GameCount);

                    }

                    WinCheck();

                }, 500);

            }
            else {
                console.log(":P");

                clickedCard1.classList.add("wrong");
                clickedCard2.classList.add("wrong");
                setTimeout(() => {
                    clickedCard1.classList.remove("wrong");
                    clickedCard2.classList.remove("wrong");
                    clickedCard1.childNodes[0].style.display = "block";

                    clickedCard2.childNodes[0].style.display = "block";

                    for (var i = 0; i < cards.length; i++) {
                        cards[i].addEventListener('click', GameCount);

                    }

                    clickedCard1 = null;
                    clickedCard2 = null;
                }, 500);

            }
            gameid = 0;

        }
    }
}


