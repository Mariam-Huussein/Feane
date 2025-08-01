//Declare Cards
let allCards = document.querySelectorAll('.card-all');
let pizzaCards = document.querySelectorAll('.card-pizza');
let burgerCards = document.querySelectorAll('.card-burger');
let friesCards = document.querySelectorAll('.card-fries');
let pastaCards = document.querySelectorAll('.card-pasta');

//Declare buttons
let btnAll=document.getElementById('All');
let btnBurger=document.getElementById('Burger');
let btnPizza=document.getElementById('Pizza');
let btnPasta=document.getElementById('Pasta');
let btnFries=document.getElementById('Fries');

let arrButtons = [btnAll,btnBurger,btnPizza,btnPasta,btnFries];

//remove active class from button
function removeActiveClass(array) {
    array.forEach(btn => {
        btn.classList.remove('active');
    });
}

// Filter Menu Items Function
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

let shoppingCartEl = document.getElementById('shoppingCart');
const cartBody = shoppingCartEl.querySelector('.offcanvas-body');
let totalReset = document.querySelector('#total-reset');
let totalResetNumber =0;
let cartArray = [];

getItemsFromStorage();
updateCartDisplay();


//Change Toggler State when click on it
function changeTogglerState(){
    let toggler = document.querySelector('.navbar-toggler');
    let hero = document.querySelector('.hero-section');
    let menuNoftication = document.querySelector('.dot-notfication-toggler');
    hero.classList.toggle('open');
    toggler.classList.toggle('open');
    if(menuNoftication.classList.contains('active') || toggler.classList.contains('open')){
        menuNoftication.classList.remove('active');
    }
    else if(!menuNoftication.classList.contains('active') && cartArray.length !== 0 && !toggler.classList.contains('open')){
        menuNoftication.classList.add('active');
    }
}

//Set Cart Shooping Body State
function updateCartDisplay() {
    if (cartArray.length === 0) {
        cartBody.innerHTML = `<h6 class="empty-card">Your Cart is empty!</h6>`;
    }
    else{
        addToCartContainer(cartArray);
    }
    checkNotification();
}

//Check is there any item in cart to Show Notfication
function checkNotification() {
    let toggler = document.querySelector('.navbar-toggler');
    let menuNoftication = document.querySelector('.dot-notfication-toggler');
    let cartNoftication = document.querySelector('.dot-notfication');
    if (cartArray.length === 0) {
        menuNoftication.classList.remove('active');
        cartNoftication.classList.remove('active');
    } else if(cartArray.length >0 ) {
        cartNoftication.classList.add('active');
    }
    if (toggler.classList.contains('open')) {
        menuNoftication.classList.remove('active');
    }
    if (!toggler.classList.contains('open') && cartArray.length !== 0) {
        menuNoftication.classList.add('active');
    }
}

//Update Total Reset
function updateTotalReset() {
    let temp=0;
    cartArray.forEach(item => {
        temp += item.price * item.repeated;
    });
    totalReset.innerText=temp;
    totalResetNumber=temp;
    checkNotification();
}

//Save Items in Local Storage
function addItemsToStorage(cartArray){
    localStorage.setItem('items',JSON.stringify(cartArray))
}

//initialize item to add in cart and Local Storage
function addToCart(btnCard) {
    const card = btnCard.closest('.card-all');
    const cardId = card.getAttribute('data-id');
    const cardImageSrc = card.querySelector('.card-items-img').getAttribute('src');
    const cardImageBox = card.querySelector('.container-card-items-img');
    const cardTitle = card.querySelector('.card-items-title').innerText;
    const cardPrice = card.querySelector('span').innerText;
    const item ={
        id: Date.now(),
        repeated: 0,
        cardId: cardId,
        imgSrc: cardImageSrc,
        title: cardTitle,
        price: parseFloat(cardPrice.replace("$", '')),
    };
    const existingItem = cartArray.find(item => item.cardId === cardId);
    if(existingItem){
        existingItem.repeated+=1;
    }
    else{
        item.repeated=1;
        cartArray.push(item);
    }
    addToCartContainer(cartArray);
    addItemsToStorage(cartArray);
    addStyleToCard(cardImageBox);
}

//Add Styles when the item added to cart
function addStyleToCard(imgBox) {
    imgBox.classList.add('added');
    setTimeout(()=>{
        imgBox.classList.remove('added');
    },600);
}

//Add Item to Shopping Cart
function addToCartContainer(cartArray) {
    cartBody.innerHTML='';
    cartArray.forEach(card => {
        cartBody.innerHTML +=`
            <div class="item-cart-container">
                <div class="item-cart-image">
                    <img src="${card.imgSrc}">
                </div>
                <div class="item-cart-details">
                    <h6 class="item-cart-name">${card.title}</h6>
                    <p class="item-cart-price">Price: ${card.price}</p>
                    <p class="item-cart-price">Pieces: ${card.repeated}</p>
                    <p class="item-cart-price">Total Price: $${(card.repeated * card.price)}</p>
                    <div class="btns-cart-container">
                        <button type="button" data-id="${card.id}" onclick="removeItemFromCart(this.getAttribute('data-id'))" class="btn btn-cart">
                            <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                        </button>
                        <div>
                            <button type="button" data-id="${card.id}" onclick="increaseItem(this.getAttribute('data-id'))" class="btn btn-cart">
                                <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
                            </button>
                            <button type="button" data-id="${card.id}" onclick="decreaseItem(this.getAttribute('data-id'))" class="btn btn-cart">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    updateTotalReset();
    checkNotification();
}

//Remove Item to Shopping Cart
function removeItemFromCart(idItem) {
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i].id == idItem){
            cartArray.splice(i, 1);
            addToCartContainer(cartArray);
            addItemsToStorage(cartArray);
            break;
        }
    }
    updateCartDisplay();
}

//get the saved items from local storage if exist
function getItemsFromStorage() {
    let data = localStorage.getItem('items');
    if(data){
        cartArray =JSON.parse(data);
        addToCartContainer(cartArray);
    }
}

//Increase the number of an specific item by its id
function increaseItem(idItem) {
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i].id == idItem){
            cartArray[i].repeated+=1;
            addToCartContainer(cartArray);
            addItemsToStorage(cartArray);
            break;
        }
    }
}

//Decrease the number of an specific item by its id
function decreaseItem(idItem) {
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i].id == idItem){
            if (cartArray[i].repeated > 1) {                
                cartArray[i].repeated-=1;
                addToCartContainer(cartArray);
                addItemsToStorage(cartArray);
                break;
            }
            else{
                cartArray.splice(i, 1);
                addToCartContainer(cartArray);
                addItemsToStorage(cartArray);
                break;
            }
        }
    }
    updateCartDisplay();
}

//Popuo For Submit Order and clear cartArray and Local Storage
function submitOrder() {
    const cartOffcanvas = bootstrap.Offcanvas.getInstance(shoppingCartEl);
    if (cartOffcanvas) cartOffcanvas.hide();

    const alertOverlay = document.getElementById('custom-alert-overlay');
    const alertMessage = document.getElementById('custom-alert-message');
    document.body.style.overflowY = 'hidden';

    if (totalResetNumber === 0) {
        let target= document.querySelector('#menu');
        alertMessage.innerHTML = `<span class="order-recived-success"><i class="fa-solid fa-circle-exclamation"></i></span><p>Your cart is empty!<br> Add some items before ordering.</p>`;
        alertOverlay.style.display = 'flex';
        target.scrollIntoView({ behavior: 'smooth' });
    }

    else{
        alertMessage.innerHTML = `<span class="order-recived-success"><i class="fa-solid fa-check"></span></i><p>Orderd Recieved successully</p>`;
        alertOverlay.style.display = 'flex';
        cartArray = [];
        addItemsToStorage(cartArray);
        addToCartContainer(cartArray);
        updateCartDisplay();
    }
    
    setTimeout(() => {
        closePopup()
    }, 3000);
    return; 
}

//Close Popup of submitiing Order
function closePopup() {
    let body = document.body;
    body.style.overflowY='unset'
    document.getElementById('custom-alert-overlay').style.display = 'none';
}