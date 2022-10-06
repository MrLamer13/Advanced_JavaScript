Vue.component('error', {
    props: ['error'],
    template: `    
        <h2 v-show="error">Произошла ошибка загрузки.</h2> 
    `
});



