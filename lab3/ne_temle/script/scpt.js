let allProducts = [];

fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    render_products(products);
  })
  .catch(err => console.error('Ошибка загрузки товаров:', err));


function render_products(products) {
  const container = document.getElementById("content");
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>Нет совпадений</p>';
    return;
  }

  
  update_product_count(products.length);

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "bord";
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="left">
        <h3 class="name">${product.title}</h3>
        <p class="price">${product.price} $</p>
      </div>
      <button class="right">🡽</button>
    `;


    card.addEventListener('click', () => {
      show_product_details(product.id);
    });

    container.appendChild(card);
  });
}


function update_product_count(count) {
  const countElement = document.getElementById("count");
  countElement.textContent = `Товаров - ${count}`;
}


function show_product_details(productId) {
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    console.error('Товар не найден:', productId);
    return;
  }

  const container = document.getElementById("content");
  container.innerHTML = `
    <div class="prav">
      <div class="single-product">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>${product.price} $</p>
      </div>
    </div>
  `;

  history.pushState(null, '', `/product/${productId}`);
}


function poisk() {
  const query = document.getElementById("search").value.toLowerCase();
  if (!query) return;

  const results = allProducts.filter(p => p.title.toLowerCase().includes(query));
  render_products(results);
  history.pushState(null, '', `/search?query=${encodeURIComponent(query)}`);
}