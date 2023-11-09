const closeMenuBtn = document.getElementById("close");
const modalMenu = document.getElementById("modal");
const burger = document.getElementById("burger");
const alert = document.getElementById("alert");
const menuLinks = document.querySelectorAll(".modal_menu_link");
const addToCartButtons = document.querySelectorAll(".product_btn");
const cartBtn = document.getElementById("cart");
const cartModal = document.getElementById("cart_modal");
const cartCloseBtn = document.getElementById("cart_close");
const clearCart = document.getElementById("delete_cart");
let cart = [];

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    modalMenu.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

closeMenuBtn.addEventListener("click", () => {
  modalMenu.style.display = "none";
  document.body.style.overflow = "auto";
});

burger.addEventListener("click", () => {
  modalMenu.style.display = "block";
  document.body.style.overflow = "hidden";
});

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    showAlert();
    const product = this.parentElement;
    const title = product.querySelector(".product_title").textContent;
    const price = product.querySelector(".product_price").textContent;
    const item = {
      id: product.id,
      title: title,
      price: price.substring(0, price.length - 1),
      amount: 1,
    };
    if (cart.some((item) => item.id == product.id)) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      );
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

function showAlert() {
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 5000);
}

function displayCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cart_ul = document.getElementById("cart_items");
  const newCart = cart.map(
    (item) =>
      `<li class="cart_Item">
      ${item.title} Amount: ${item.amount} Price ${item.price * item.amount} $
    </li>`
  );
  cart_ul.innerHTML = newCart.join("");
}

clearCart.addEventListener("click", () => {
  localStorage.removeItem("cart");
  displayCart();
});
cartBtn.addEventListener("click", () => {
  displayCart();
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
});
cartCloseBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
});
