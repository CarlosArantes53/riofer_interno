let btnNext = document.querySelector('.next');
let btnBack = document.querySelector('.back');

let container = document.querySelector('.container');
let list = document.querySelector('.container .list');
let thumb = document.querySelector('.container .thumb');

btnNext.addEventListener('click', () => moveItemsOnClick('next'));
btnBack.addEventListener('click', () => moveItemsOnClick('back'));

function moveItemsOnClick(type){
    console.log(type);
    let listItems = document.querySelectorAll('.list .list-item');
    let thumbItems = document.querySelectorAll('.thumb .thumb-item');

    console.log(listItems);
    console.log(thumbItems);

    if(type === 'next'){
        list.appendChild(listItems[0]);
        thumb.appendChild(thumbItems[0]);
        container.classList.add('next')
    } else if(type === 'back'){
        list.insertBefore(listItems[listItems.length - 1], listItems[0]);
        thumb.insertBefore(thumbItems[thumbItems.length - 1], thumbItems[0]);
        container.classList.add('back')
    }

 setTimeout(() => {
    container.classList.remove('next')
    container.classList.remove('back')
 }, 3000);

}

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');

    } else{
        menuMobile.classList.add('open');
    }
}

