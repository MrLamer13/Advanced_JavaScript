export default Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="item_box__content">
                <product v-for="item of filtered" 
                :key="item.id_product"
                :product="item"                
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});/*  */
Vue.component('product', {
    props: ['product'],
    template: `
            <div class="item">
                <a class="item_link" href="#">
                    <img class="item_img" :src=product.img alt="photo">
                    <p class="item_text">{{ product.product_name }}</p>
                    <p class="item_text_price">$<span class="item_text_price_value">{{ product.price.toFixed(2) }}</span></p>
                </a>
                <div class="item_add_box item_add_box_flex">
                    <div class="item_add_box_"><button class="item_add" @click="$emit('add-product', product)">
                            <i class="fa fa-light fa-cart-shopping item_add_box__fa-cart-shopping"></i>
                            <p class="item_add_text">Add to Cart</p>
                        </button>
                    </div>

                    <div class="item_add_box_mini_flex">
                        <div class="item_add_box_mini"><a href="#" class="item_add item_add_mini">
                                <i class="fa-solid fa-repeat"></i>
                            </a></div>
                        <div class="item_add_box_mini"><a href="#" class="item_add item_add_mini">
                                <i class="fa fa-thin fa-heart"></i>
                            </a></div>
                    </div>

                </div>
            </div>
    `
});

