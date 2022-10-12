// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

export default Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
            amount: 0,
            countGoods: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            this.amount += find.price;
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.amount += prod.price;
                        }
                    })
            };
            this.countGoods++;

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            this.$parent.delJson(`/api/cart/${item.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                            this.amount -= item.price;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.amount -= item.price;
                        };
                        this.countGoods--;
                    }
                })
        },
    },
    template: `
        <div class="basket">
            <button class="basket_button" type="button" @click="showCart = !showCart">
                <i class="fa fa-light fa-cart-shopping basket__fa-cart-shopping" :class="{pink: showCart}"></i><span
                        class="basket_button_span" v-if="countGoods">{{ countGoods }}</span>
                </button>

                <div class="basket_box" v-show="showCart">
                    <cart-item v-for="item of cartItems"
                    :key="item.id_product"
                    :cart-item="item" @remove="remove">
                    </cart-item>

                    <div class="basket_box__total_price">
                        <p class="basket_box__total_price_text">TOTAL</p>
                        <p class="basket_box__total_price_text">$<span
                                class="basket_box__total_price_text_span">{{ amount.toFixed(2) }}</span></p>
                    </div>
                    <a href="chekout.html" class="basket_box__button">Checkout</a>
                    <a href="shopping_cart.html" class="basket_box__button">Go to cart</a>
                </div>            
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `   
    <div class="basket_box__item">
        <a href="#" class="basket_box__item_link">
            <img :src=cartItem.img alt="photo" class="basket_box__item_photo">
            <div class="basket_box__item_info">
                <p class="basket_box__item_info_name">{{ cartItem.product_name }}</p>
                <img src="img/basket_stars.png" alt="stars"
                    class="basket_box__item_info_stars">
                    <div class="basket_box__item_info_price_flex">
                    <p class="basket_box__item_info_price"><span
                class="basket_box__item_span_count">{{ cartItem.quantity }}</span> x $<span
                class="basket_box__item_span_price">{{ cartItem.price.toFixed(2) }}</span></p> <p class="basket_box__item_info_total_price">$<span
                class="basket_box__item_span_total_price">{{ (cartItem.quantity*cartItem.price).toFixed(2) }}</span></p>
                </div>                    
            </div>
        </a>
        <button class="basket_box__item_delete" @click="$emit('remove', cartItem)"><i
                class="fa-solid fa-circle-xmark"></i></button>
    </div>
    `
})