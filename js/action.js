const btns = document.querySelectorAll('.filter-btn');
const storeItems = document.querySelectorAll('.store-item');
const images = document.querySelectorAll('.store-img');
const lBBtn = document.querySelectorAll('.lightbox-control');
const cartBtn = document.querySelectorAll('.store-item-icon');
const lBCon = document.querySelector('.lightbox-container');
const lBItem = document.querySelector('.lightbox-item');
const lBClose = document.querySelector('.lightbox-close');
const topTotal = document.querySelector('.item-total');
const searchBox = document.getElementById('search-item');
const cartDiv = document.getElementById('cart-info');
const cart = document.getElementById('cart');
const priceTotal = document.getElementById('cart-total');
const itemCount = document.getElementById('item-count');


let imageList = [];
let imgCount = 0;

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const filter = e.target.dataset.filter;
        storeItems.forEach(item => {
            if(filter === 'all'){
                item.style.display = 'block';
            }else{
                if(item.classList.contains(filter)){
                    item.style.display = 'block';
                }else{
                    item.style.display = 'none';
                }
            }
        })
    })
});

searchBox.addEventListener('keyup', e => {
    const search = e.target.value.toLowerCase().trim();
    storeItems.forEach(item => {
        if(item.textContent.includes(search)){
            item.style.display = 'block'
        }else{
            item.style.display = 'none'
        }
    })
});

images.forEach(image => {
    imageList.push(image.src);
});

storeItems.forEach(item => {
    item.addEventListener('click', e => {
        if(cartBtn){
            lBCon.classList.remove('show');
        }else{     
        let image = e.target.src;
        lBItem.style.backgroundImage = `url(${image})`;
        lBCon.classList.add('show');
        imgCount = imageList.indexOf(image);
        }
    });
});

lBBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.classList.contains('btnLeft')){
            imgCount--;
            if(imgCount < 0){
                imgCount = imageList.length - 1;
            }
        }
        if(btn.classList.contains('btnRight')){
            imgCount++;
            if(imgCount >= imageList.length){
                imgCount = 0;
            }
        }
        lBItem.style.backgroundImage = `url(${imageList[imgCount]})`;
    });
});

lBClose.addEventListener('click', () => {
    lBCon.classList.remove('show');
});

cartDiv.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
});

cartBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        if(e.target.parentElement.classList.contains('img-container')){
            let imgPath = e.target.previousElementSibling.src;
            let pos = imgPath.indexOf('img') + 3;
            let newPath = imgPath.slice(pos);
            const item = {};
            item.img = `img-cart${newPath}`;
            item.name = e.target.parentElement.parentElement.children[1].children[0].children[0].textContent;
            item.price = e.target.parentElement.parentElement.children[1].children[0].children[1].children[0].textContent;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'd-flix', 'justify-content-between', 'text-capitalize', 'my-3');
            cartItem.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3"><img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p><span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span></div><a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a></div>`;            
            cart.insertAdjacentHTML('afterBegin', cartItem.innerHTML, priceTotal);
            alert('item added to cart');
            showTotals();
        }
    });
});

const showTotals = () => {
    const total = [];    
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
        total.push(parseFloat(item.textContent));
    });

    totalPrice = total.reduce((total, item) => {
        total += item;
        return total;
    }, 0);

    finalPrice = totalPrice.toFixed(2);
    priceTotal.textContent = finalPrice;
    topTotal.textContent = finalPrice;
    itemCount.textContent = total.length;
}
