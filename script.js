const GameDiv = document.querySelector(".game");
const classArray = ["card-1", "card-1", "card-2", "card-2", "card-3", "card-3", "card-4", "card-4", "card-5", "card-5", "card-6", "card-6", "card-7", "card-7", "card-8", "card-8"];
var clickedCardfront1 = null;
var clickedCardfront2 = null;
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
        Carddiv.classList.add("card");

        const CardFront = document.createElement('div');
        CardFront.classList.add('cardfront', classArray[i - 1]);

        const CardBack = document.createElement('div');
        CardBack.classList.add('cardback');
        const bgimage = document.createElement('img');
        bgimage.setAttribute("src", "./Images/card-bg.jpg");
        bgimage.setAttribute("alt", " Card Background Image");
        bgimage.style.objectFit = "cover";
        bgimage.classList.add('bgImage');



        CardBack.appendChild(bgimage);
        Carddiv.appendChild(CardBack);
        Carddiv.appendChild(CardFront);
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
    d = 0;

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

        let allNotVisible = true;

        cards.forEach(card => {
            const cardStyle = getComputedStyle(card);
            if (cardStyle.getPropertyValue('opacity') === '1') {
                allNotVisible = false;
                // console.log(cardStyle.getPropertyValue('opacity'));
                return;
            }
        });

        if (allNotVisible) {
            alert('You win!');



            removeAllChildNodes(GameDiv);

            GameSet();
        }
        // else {
        //     console.log("not win");
        // }
    }





    function GameCount(event) {






        const card = event.target.closest(".card");;
        const cardfront = card.querySelector('.cardfront');
        card.classList.toggle('flipped');


        if (cardfront === clickedCardfront1) {
            card.classList.toggle('flipped');
            return;
        }

        gameid++;

        if (gameid === 1) {
            clickedCardfront1 = cardfront;
            clickedCard1 = card;
        } else if (gameid === 2) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].removeEventListener('click', GameCount);

            }

            clickedCardfront2 = cardfront;
            clickedCard2 = card;
            if (clickedCardfront1.classList.toString() === clickedCardfront2.classList.toString()) {

                clickedCardfront1.classList.add("right");
                clickedCardfront2.classList.add("right");


                setTimeout(() => {
                    clickedCard1.classList.toggle('dissapired');
                    clickedCard2.classList.toggle('dissapired');
                }, 300);


                setTimeout(() => {
                    clickedCardfront1.classList.remove("right");
                    clickedCardfront2.classList.remove("right");

                    //clickedCard1.classList.toggle('flipped');
                    //clickedCard2.classList.toggle('flipped');









                    for (var i = 0; i < cards.length; i++) {
                        cards[i].addEventListener('click', GameCount);

                    }

                    WinCheck();



                }, 700);

            }
            else {


                clickedCardfront1.classList.add("wrong");
                clickedCardfront2.classList.add("wrong");
                setTimeout(() => {
                    clickedCardfront1.classList.remove("wrong");
                    clickedCardfront2.classList.remove("wrong");


                    clickedCard1.classList.toggle('flipped');
                    clickedCard2.classList.toggle('flipped');

                    for (var i = 0; i < cards.length; i++) {
                        cards[i].addEventListener('click', GameCount);

                    }

                    clickedCard1 = null;
                    clickedCard2 = null;
                    clickedCardfront1 = null;
                    clickedCardfront2 = null;
                }, 700);

            }
            gameid = 0;

        }
    }
}


