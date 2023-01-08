const addProductForm = document.querySelector('.form-add-product');
const nameInput = document.querySelector('[name="product-name"]');
const priceInput = document.querySelector('[name="product-price"]');
const productsUl = document.querySelector(`.products-list`);

const saveProductToLocalStorage = (name, price) => {
    const productList = JSON.parse(localStorage.getItem('shop-products')) ?? [];
    productList.push({name, price});
    localStorage.setItem('shop-products', JSON.stringify(productList));
};

const loadProductFromLocalStorage = (name, price) => {
    const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

    for (const {name, price} of productsList) {
        addProductToShop(name, price);
    }
}

//dodawanie produktu do listy produktów
const addProductToShop = (name, price) => {


    //tworzenie nowej listy
    const newLi = document.createElement('li');
    //tworzenie <strong> w nazwie produktu
    const newStrong = document.createElement('strong');
    newStrong.innerText = name;
    
    //dodawanie ceny do produktu w liście
    const newPriceText = document.createTextNode(` - ${price.toFixed(2)}`);
    //tworzenie przycisku kup
    const newBtn = document.createElement('button');
    //dodawanie do przycisku klasy
    newBtn.classList.add('btn-buy-product');
    //dodawanie do przycisku atrybutów data name i price
    newBtn.dataset.name = name;
    newBtn.dataset.price = String(price);
    //nadanie nazwy przyciskowi
    newBtn.innerText='Kup!';
    // dodawanie reakcji na wciśnięcie przycisku
    newBtn.addEventListener('click', addProductToBasket);

    //stworzenie nowych li
    newLi.appendChild(newStrong);
    newLi.appendChild(newPriceText);
    newLi.appendChild(newBtn);

    //dodanie produktu do listy
    productsUl.appendChild(newLi);
   
}

const handleAddProductFormSubmit = event => {
    event.preventDefault();

    const nameFromInput = nameInput.value;
    const priceFromInput = Number(priceInput.value);
    
    addProductToShop(nameFromInput, priceFromInput);
     //dodanie nowego produktu do local storage
     saveProductToLocalStorage(nameFromInput, priceFromInput);
    
};

addProductForm.addEventListener('submit', handleAddProductFormSubmit);
    
loadProductFromLocalStorage();
    

 