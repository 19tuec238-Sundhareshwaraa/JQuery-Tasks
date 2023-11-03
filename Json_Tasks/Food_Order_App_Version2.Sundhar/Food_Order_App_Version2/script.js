
 let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

// function saveCartItemsToStorage() {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
// }
function addToCart(itemName, itemPrice) {
    if (!cartItems[itemName]) {
        cartItems[itemName] = {
            quantity: 1,
            price: itemPrice
        };
    } else {
        cartItems[itemName].quantity++;
    }
    // saveCartItemsToStorage();
    updateCardQuantity(itemName);
    updateCartAndCard(itemName);
}
function decreaseQuantity(itemName) {
    if (cartItems[itemName] && cartItems[itemName].quantity > 1) {
        cartItems[itemName].quantity--;
    } else {
        delete cartItems[itemName];
    }
    updateCartAndCard(itemName);
}
function increaseQuantity(itemName) {
    if (cartItems[itemName]) {
        cartItems[itemName].quantity++;
    }
    updateCartAndCard(itemName);
}
function applyDiscount() {
    const discountInput = parseFloat($('#discountInput').val()) || 0;
    const totalAmountElement = $('#totalAmount');
    let totalAmount = parseFloat(totalAmountElement.text()) || 0;  
    totalAmount -= discountInput;
    totalAmountElement.text(totalAmount.toFixed(2));
}

function updateCardQuantity(itemName) {
    const cardId = '#cardItem' + itemName.replace(''); 
    const cardQuantityElement = $(cardId + ' .quantity-controls span'); 

    const cartItem = cartItems[itemName];
    if (cardQuantityElement.length && cartItem) {
        cardQuantityElement.text(cartItem.quantity);
    }
}

function updateCartAndCard(itemName) {
    updateCart(); 
    updateCardQuantity(itemName);
}

function updateCart() {
    const cartList = $('#cartList');
    const totalAmountElement = $('#totalAmount');
    cartList.empty();
    let totalAmount = 0;
    for (const itemName in cartItems) {
        if (cartItems.hasOwnProperty(itemName)) {
            const item = cartItems[itemName];
            const listItem = $('<li>').text(`${itemName} x ${item.quantity} - Rs.${(item.quantity * item.price).toFixed(2)}`);
            cartList.append(listItem);    
            totalAmount += item.quantity * item.price;
        }
    }
    totalAmountElement.text(totalAmount.toFixed(2));
}
$(document).ready(function() {
    
    $('#applyDiscountBtn').on('click', function() {
        applyDiscount();
    });
    updateCart();
});

const itemsData = {
    "ItalianCombo":
     { title: "Italian combo",
       description: "Fantasy for sweets, pure organic ingredients",
       price: "300", 
       image: "./assests/image_1.jpg" 
    },
    "Burger": 
    { title: "Burger", 
      description: "Burger king offers double cheese chicken burger", 
      price: "199",
      image: "./assests/image_2.jpg" 
    },
    "Somos": 
    { title: "Somos",
      description: "Without trying this dish, don't quit your life",
      price: "100",
      image: "./assests/image_3.png" 
    },
    "ParottaManjurianCombo":
    { title: "Parotta and Manjurian combo",
       description: "Spicy and delicious product",
       price: "500",
       image: "./assests/image_4.jpg" 
    },
    "Desserts":
    { title: "Desserts",
      description: "Creamy and sweety dessert to relax your life",
      price: "99",
      image: "./assests/image_5.jpg"
    },
    "IndianThali":
    { title: "Indian Thali",
      description: "Most affordable and unlimited lunch is ready",
      price: "250", 
      image: "./assests/image_1.jpg" 
    },
    "Starters":
    { title: "Starters",
      description: "Starters for life, enjoy every party with starters life is gonna happy with starters",
      price: "150", 
      image: "./assests/image_7.jpeg" 
    },
    "ChickenNoodles":
    { title: "Chicken Noodles",
      description: "China Special Chicken noodles now available in Coimbatore yummy and tasty",
      price: "300", 
      image: "./assests/image_8.jpg" 
    },
    "RajaBhogamKariVirunthu":
    { title: "RajaBhogam Kari Virunthu",
      description: "Tamilnadu special non-veg meals yummy and tasty",
      price: "100", 
      image: "./assests/image_9.jpg" 
    },
};
function generateCard(itemName, itemData) {
    const card = $('<div>', { class:' col-lg-4 mb-3', id: `cardItem${itemName}` });
    const cardInner = $('<div>', { class: 'card' });

    cardInner.append(
        $('<img>', { src: itemData.image, class: 'card-img-top' }),
        $('<div>', { class: 'card-body p-3' }).append(
            $('<h5>', { class: 'card-title mb-2', text: itemData.title }),
            $('<div>', { class: 'card-text mb-2', text: itemData.description }),
            $('<div>', { class: 'quantity-controls d-flex align-items-center' }).append(
                $('<button>', { class: 'btn btn-sm btn-secondary', text: '+', click: function () { increaseQuantity(itemName); } }),
                $('<span>', { class: 'card-quantity ', id: `quantity${itemName}`, text: 'Add' }),
                $('<button>', { class: 'btn btn-sm btn-secondary  ', text: '-', click: function () { decreaseQuantity(itemName); } }),
                $('<span>', { class: 'card-quantity m-1 ', id: `quantity${itemName}`, text: 'Remove' }),
                
            ),
            $('<button>', { class: 'btn btn-primary btn-sm mt-3', text: 'Add to Cart', click: function () { addToCart(itemName, itemData.price); } })
        )
    );
    card.append(cardInner);
    return card;
}
$(document).ready(function(){
    const cardContainer = $('#cardContainer');
    cardContainer.addClass('row');
    for (const itemName in itemsData) {
        if (itemsData.hasOwnProperty(itemName)) {
            const itemData = itemsData[itemName];
            cardContainer.append(generateCard(itemName, itemData));
        }
    }   
});
