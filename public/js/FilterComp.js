export default Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
            
            <form action="#" class="header__top_form" @submit.prevent="$parent.$refs.products.filter(userSearch)">

                <div class="header__top_browse_button">

                    <details class="browse_button">
                        <summary class="browse_button_summary">Browse</summary>
                        <div class="header_box">
                            <div class="header_item">
                                <h3 class="header_item__heading">Women</h3>
                                <a class="header_item__link" href="#">Dresses</a>
                                <a class="header_item__link" href="#">Tops</a>
                                <a class="header_item__link" href="#">Sweaters/Knits</a>
                                <a class="header_item__link" href="#">Jackets/Coats</a>
                                <a class="header_item__link" href="#">Blazers</a>
                                <a class="header_item__link" href="#">Denim</a>
                                <a class="header_item__link" href="#">Leggings/Pants</a>
                                <a class="header_item__link" href="#">Skirts/Shorts</a>
                                <a class="header_item__link" href="#">Accessories</a>
                            </div>
                            <div class="header_item">
                                <h3 class="header_item__heading">Man</h3>
                                <a class="header_item__link" href="#">Dresses</a>
                                <a class="header_item__link" href="#">Tops</a>
                                <a class="header_item__link" href="#">Sweaters/Knits</a>
                            </div>
                        </div>
                    </details>

                </div>

                <input class="input_search" type="search" placeholder="Search for Item..." v-model="userSearch">
                <button class="button_search" type="submit"><i
                        class="fa-solid fa-magnifying-glass"></i></button>
            </form>

            `
})