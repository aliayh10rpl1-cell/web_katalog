
// ==================================
// DATA PRODUK SKINCARE
// ==================================

const products = [
    {
        id: 1,
        name: "Gentle Facial Wash",
        category: "Cleanser",
        price: 45000,
        image: "img/image1.png",
        description: "Pembersih wajah lembut untuk kulit bersih.",
        tag: "Best Seller"
    },
    {
        id: 2,
        name: "Hydrating Toner",
        category: "Toner",
        price: 55000,
        image: "img/image2.png",
        description: "Membantu menjaga kelembapan kulit.",
        tag: "Popular"
    },
    {
        id: 3,
        name: "Brightening Serum",
        category: "Serum",
        price: 75000,
        image: "img/image3.png",
        description: "Serum untuk perawatan kulit wajah.",
        tag: "New"
    },
    {
        id: 4,
        name: "Moisturizer Cream",
        category: "Moisturizer",
        price: 65000,
        image: "img/image4.png",
        description: "Krim pelembap untuk perawatan harian.",
        tag: "Favorite"
    },
    {
        id: 5,
        name: "Daily Sunscreen",
        category: "Sunscreen",
        price: 60000,
        image: "img/image5.png",
        description: "Perlindungan kulit dari paparan sinar UV.",
        tag: "Best Seller"
    },
    {
        id: 6,
        name: "Acne Care Serum",
        category: "Serum",
        price: 85000,
        image: "img/image6.png",
        description: "Serum perawatan untuk kulit berjerawat.",
        tag: "Popular"
    },
    {
        id: 7,
        name: "Cleansing Water",
        category: "Cleanser",
        price: 40000,
        image: "img/image7.png",
        description: "Membersihkan sisa makeup dan kotoran.",
        tag: "Favorite"
    },
    {
        id: 8,
        name: "Glow Moisturizer",
        category: "Moisturizer",
        price: 80000,
        image: "img/image8.png",
        description: "Membantu menjaga kulit tetap lembap.",
        tag: "New"
    },
    {
        id: 9,
        name: "UV Protection Sunscreen",
        category: "Sunscreen",
        price: 70000,
        image: "img/image9.png",
        description: "Sunscreen untuk perawatan sehari-hari.",
        tag: "Popular"
    }
];

let cart = [];
let currentCategory = "Semua";

// ==================================
// FORMAT HARGA
// ==================================

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// ==================================
// MENAMPILKAN PRODUK
// ==================================

function displayProducts(data) {
    const productGrid = document.getElementById("productGrid");
    const emptyMessage = document.getElementById("emptyMessage");

    productGrid.innerHTML = "";

    if (data.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    data.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/400x400/fff0f5/d86f98?text=Foto+Produk';"
                >
                <span class="product-tag">${product.tag}</span>
            </div>

            <div class="product-info">
                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-rating">
                    ★★★★★
                    <span>(5.0)</span>
                </div>

                <div class="product-bottom">
                    <span class="product-price">
                        ${formatRupiah(product.price)}
                    </span>

                    <button class="add-cart"
                        onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                        Tambah
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// ==================================
// FILTER KATEGORI
// ==================================

function filterCategory(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    applyFilters();
}

// ==================================
// PENCARIAN PRODUK
// ==================================

function searchProducts() {
    applyFilters();
}

function applyFilters() {
    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filtered = products.filter(product => {
        const matchCategory =
            currentCategory === "Semua" ||
            product.category === currentCategory;

        const matchKeyword =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return matchCategory && matchKeyword;
    });

    displayProducts(filtered);
}

document.getElementById("searchInput")
    .addEventListener("input", applyFilters);

// ==================================
// TAMBAH KE KERANJANG
// ==================================

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " berhasil ditambahkan ke keranjang!");
}

// ==================================
// UPDATE KERANJANG
// ==================================

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatRupiah(totalPrice);

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
                Yuk, pilih produk favoritmu!
            </p>
        `;
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}"
                onerror="this.src='https://placehold.co/100x100/fff0f5/d86f98?text=Produk'">

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatRupiah(item.price)}</p>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>

            <button class="remove-btn"
                onclick="removeItem(${item.id})"
                title="Hapus produk">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);
    });
}

// ==================================
// UBAH JUMLAH PRODUK
// ==================================

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// ==================================
// HAPUS PRODUK
// ==================================

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// ==================================
// BUKA DAN TUTUP KERANJANG
// ==================================

function openCart() {
    document.getElementById("cartSidebar")
        .classList.add("open");

    document.getElementById("overlay")
        .classList.add("show");
}

function closeCart() {
    document.getElementById("cartSidebar")
        .classList.remove("open");

    document.getElementById("overlay")
        .classList.remove("show");
}

// ==================================
// CHECKOUT
// ==================================

function openCheckout() {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
    }

    closeCart();

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    checkoutItems.innerHTML = "";

    cart.forEach(item => {
        const row = document.createElement("p");

        row.textContent =
            `${item.name} x ${item.quantity} — ` +
            formatRupiah(item.price * item.quantity);

        checkoutItems.appendChild(row);
    });

    checkoutTotal.textContent = formatRupiah(total);

    document.getElementById("checkoutModal")
        .classList.add("show");
}

function closeCheckout() {
    document.getElementById("checkoutModal")
        .classList.remove("show");
}

// ==================================
// PROSES PESANAN
// ==================================

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            closeCheckout();
            return;
        }

        const name = document.getElementById("customerName").value;
        const phone = document.getElementById("customerPhone").value;
        const address = document.getElementById("customerAddress").value;
        const payment = document.getElementById("paymentMethod").value;

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const orderNumber = "GB" + Date.now().toString().slice(-8);

        document.getElementById("successMessage").textContent =
            `Terima kasih ${name}! Pesanan ${orderNumber} ` +
            `dengan total ${formatRupiah(total)} berhasil dibuat. ` +
            `Metode pembayaran: ${payment}.`;

        // Data pesanan disimpan di browser
        const order = {
            orderNumber,
            name,
            phone,
            address,
            payment,
            products: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total,
            date: new Date().toLocaleString("id-ID")
        };

        const oldOrders = JSON.parse(
            localStorage.getItem("glowBeautyOrders") || "[]"
        );

        oldOrders.push(order);

        localStorage.setItem(
            "glowBeautyOrders",
            JSON.stringify(oldOrders)
        );

        closeCheckout();

        document.getElementById("successModal")
            .classList.add("show");

        cart = [];
        updateCart();

        document.getElementById("checkoutForm").reset();
    });

// ==================================
// SELESAI CHECKOUT
// ==================================

function finishOrder() {
    document.getElementById("successModal")
        .classList.remove("show");
}

// ==================================
// TAMPILKAN PRODUK SAAT WEBSITE DIBUKA
// ==================================

displayProducts(products);
updateCart();
