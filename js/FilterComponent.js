Vue.component('filtering', {
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="$root.userSearch">
        <button class="btn-search" type="submit" @click="$emit('use-filter')">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
});

