let allCards = document.querySelectorAll('.card-all');
let pizzaCards = document.querySelectorAll('.card-pizza');
let burgerCards = document.querySelectorAll('.card-burger');
let friesCards = document.querySelectorAll('.card-fries');
let pastaCards = document.querySelectorAll('.card-pasta');

let btnAll=document.getElementById('All');
let btnBurger=document.getElementById('Burger');
let btnPizza=document.getElementById('Pizza');
let btnPasta=document.getElementById('Pasta');
let btnFries=document.getElementById('Fries');

let arrButtons = [btnAll,btnBurger,btnPizza,btnPasta,btnFries];


function removeActiveClass(array) {
    array.forEach(btn => {
        btn.classList.remove('active');
    });
}

function filterItems(btn){
    allCards.forEach(card => {
        card.classList.remove('activeCard');
        card.classList.add('hideCard');
    });
    removeActiveClass(arrButtons);
    switch (btn) {
        case 'Burger':
            btnBurger.classList.add('active');
            burgerCards.forEach(card => {
                card.classList.remove('hideCard');
                void card.offsetWidth;
                card.classList.add('activeCard');
            });
            break;
    
        case 'Pizza':
            btnPizza.classList.add('active');            
            pizzaCards.forEach(card => {
                card.classList.remove('hideCard');
                void card.offsetWidth;
                card.classList.add('activeCard');
            });
            break;
    
        case 'Pasta':
            btnPasta.classList.add('active');
            pastaCards.forEach(card => {
                card.classList.remove('hideCard');
                void card.offsetWidth;
                card.classList.add('activeCard');
            });
            break;

        case 'Fries':
            btnFries.classList.add('active');            
            friesCards.forEach(card => {
                card.classList.remove('hideCard');
                void card.offsetWidth;
                card.classList.add('activeCard');
            });
            break;
    
        default:
            removeActiveClass(arrButtons);
            btnAll.classList.add('active');
            allCards.forEach(card => {
                card.classList.remove('hideCard');
                void card.offsetWidth;
                card.classList.add('activeCard');
            });
            break;
    }
}

