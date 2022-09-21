const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/image_01.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/image_02.jpg' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/image_03.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/image_04.jpg' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = item => {
    return `<div class="product-item">
                <img src="${item.img}" alt="photo" class="product-img">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    //innerHTML ожидает получить строку, а productsList - массив, поэтому
    //происходит неявное преобразование массива в строку методом 
    //перечисления элементов массива через запятую. Чтобы убрать запятую
    //нужно использовать явное преобразование массива в строку при помощи
    // метода join с указанием пустой строки в качестве разделителя.
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);