const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });

    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.cartItems = {};
        this._getCartItems()
            .then(data => {
                this.cartItems = data;
                this.render()
            });
    }

    _getCartItems() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    _getTotalPrice() {
        let totalPrice = 0;
        for (let product of this.cartItems.contents) {
            totalPrice += product.quantity * product.price;
        }
        return totalPrice;
    }

    addCartItem(id) {
        for (let produt of this.cartItems.contents) {
            if (produt.id_product == id) {
                produt.quantity++;
            }
        }
        this.render();
    }

    deleteCartItem(id) {
        for (let produt of this.cartItems.contents) {
            if (produt.id_product == id) {
                produt.quantity--;
            }
        }
        this.render();
    }

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        for (let product of this.cartItems.contents) {
            const cartItemObj = new CartItem(product);
            if (cartItemObj.quantity) {
                block.insertAdjacentHTML('beforeend', cartItemObj.render());
            }
        }
        const total = `
        <div class="cart-total">
                <p>TOTAL</p>
                <p>$<span>${this._getTotalPrice()}</span></p>
            </div>
        `;
        block.insertAdjacentHTML('beforeend', total);
    }
}

class CartItem {
    constructor(product, img = 'https://via.placeholder.com/50x100') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }

    render() {
        return `
        <div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="photo">
                <div class="cart-item-flex">
                    <div class="info">
                        <h3>${this.title}</h3>
                        <p>Количество: <span class="quantity">${this.quantity}</span><p>
                        <p>Цена: $<span class="price">${this.price}</span></p>
                    </div>   
                    <div class="price_flex">
                        <p>$<span class="total-price">${this.price * this.quantity}</span></p>
                        <button class="delete-btn" type="button">X</button>
                    </div>
                </div>
                
        </div>
        `
    }

}

let list = new ProductsList();
console.log(list.allProducts);

let cart = new Cart();

document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart').classList.toggle('hidden');
})

document.querySelector('.products').addEventListener('click', event => {
    if (event.target.matches('button')) {
        let id = event.path[2].dataset.id;
        cart.addCartItem(id);
    }
});

document.querySelector('.cart').addEventListener('click', event => {
    if (event.target.matches('button')) {
        let id = event.path[3].dataset.id;
        cart.deleteCartItem(id);
    }
});