$(document).ready(function () {
    // in json format

    var food = [{
    offer:"10%   OFF",
    src:"./assets/burger_images.jpg",
    title:"Burger Singh-Big Punjabi Burgers",
    subtitle:"Burger,sweet corn",
    price:"Rs:300 for one"
    },
    {
    offer:"40% OFF",
    src:"./assets/cake_images.jpg",
    title:"Cake & More",
    subtitle:"Cakes & snacks",
    price:"Rs:400 for one"
    },
    {
    offer:"50% OFF",
    src:"./assets/biriyani_image.jpg",
    title:"Dilip Hotel Veg & Non veg",
    subtitle:"North Indian,Biriyani",
    price:"Rs:200 for one"
    },
    {
    offer:"20% OFF",
    src:"./assets/kfc_image.png",
    title:"KFC",
    subtitle:"chicken,fast food",
    price:"Rs:700 for one"
    },
    {
    offer:"50% OFF",
    src:"./assets/pizza_image.jpg",
    title:"Pizza Hut",
    subtitle:"pizza,Desserts",
    price:"Rs:400 for one"
    },
    {
    offer:"60% OFF",
    src:"./assets/dosa_image.jpg",
    title:"Curry Patta",
    subtitle:"dosa,south Indian",
    price:"Rs:200 for one"
    }];
    food.forEach((data, index) => {
        // console.log(data)

        $("#Carddata").prepend(`<div class="col-md-4 mb-4 searchbase">
        <div class="card">
           <img src="${data.src}" class="card-img-top img-fluid" alt="Dish 1">
           <div class="card-body">
              <p class="card-offer">${data.offer}</p>
              <h5 class="card-title">${data.title}</h5>
              <div class="card-combine">
                 <p class="card-text">${data.subtitle}</p>
                 <p class="card-rupees">${data.price}</p>
              </div>
              <!-- <div class="quantity-control">
                 <button class="btn btn-secondary decrement px-0.55rem py-0">-</button>
                 <span class="quantity px-1">1</span>
                 <button class="btn btn-secondary increment  px-0.55rem py-0">+</button>
                 </div> -->
              <button class="btn btn-outline-success  add-to-cart">Add to Cart</button>
           </div>
        </div>
     </div>`)

        // console.log(number);
        // console.log(index);
    });
    

   // searchbar filtering
    $("#search_bar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".searchbase").filter(function() {
         var cardText = $(this).find(".card-title").text().toLowerCase();
            $(this).toggle(cardText.indexOf(value) > -1);
        });
    });
              
    // $("#search_bar").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     // Iterate over each .col-md-4 (to make other as display none this occur at first place)
    //     $(".col-md-4").each(function() {
    //         var cardTitle = $(this).find(".card-title").text().toLowerCase();
    //         // Show or hide the card based on the filter value
    //         $(this).toggle(cardTitle.indexOf(value) > -1);
    //     });
    // });
    const cartItems = [];

    // Function to update the cart UI
    function updateCartUI() {
        const cartList = $('#cart-items');
        cartList.empty(); 

        let totalAmount = 0;

        for (let itemIndex = 0; itemIndex < cartItems.length; itemIndex++) {
            const item = cartItems[itemIndex];
          //  console.log(item)
           
            const listItem = $('<li class="list-group-item"></li>');
            const itemDetails = $('<div class="item-details"></div>');
            // itemDetails.append($('<img src="' + item.image + '" class="item-image">'));
            itemDetails.append($('<span class="item-title">' + item.title + '</span>'));

            // Create a div for quantity control (increment, decrement, and delete buttons)
            const quantityControl = $('<div class="quantity-control"></div>');
            quantityControl.append($('<button class="btn btn-secondary decrement-item  px-0.55rem py-0">-</button>'));
            quantityControl.append($('<span class="quantity-item px-1">' + item.quantity + '</span>'));
            quantityControl.append($('<button class="btn btn-secondary increment-item  px-0.55rem py-0">+</button>'));

            // quantityControl.append($('<button class="btn btn-danger ms-2 delete-item">Delete</button>'));
            quantityControl.append($('<i class="fa fa-trash delete-item btn btn-lg" aria-hidden="true"></i>'));

            // Add a data attribute to the delete button for referencing the item
            $('.delete-item', quantityControl).data('item-index', itemIndex);

            // Create a div for displaying the total price of the item
            const itemPrice = $('<div class="item-price">Rs:' + item.totalPrice + '</div>');

            // Add item details, quantity control, and price to the list item
            listItem.append(itemDetails);
            listItem.append(quantityControl);
            listItem.append(itemPrice);

            cartList.append(listItem);

            totalAmount += item.totalPrice;
        }

        let deliveryCharge = totalAmount >= 1000 ? 0 : 90;
        totalAmount += deliveryCharge; // Add delivery charge to total amount

        // Display delivery charge
        const deliveryChargeElement = $('<li class="list-group-item">Delivery Charge: Rs:' + deliveryCharge + '</li>');
        cartList.append(deliveryChargeElement);

        // Display total amount in the cart
        const totalAmountElement = $('<li class="list-group-item active">Total Amount: Rs:' + totalAmount + '</li>');
        cartList.append(totalAmountElement);
    }


    $('.col-md-9').on('click', '.add-to-cart', function () {
        const card = $(this).closest('.card');
        const title = card.find('.card-title').text();
        const quantity = 1;
        // const quantity = parseInt(card.find('.quantity').text());
        const price = parseInt(card.find('.card-rupees').text().split(':').pop());
        console.log(price);
        // const image = card.find('img').attr('src');

        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.quantity * price;
        } else {
            const newItem = {
                title: title,
                quantity: quantity,
                totalPrice: quantity * price,
                // image: image,
            };
            cartItems.push(newItem);
        }

        // Update the cart UI
        updateCartUI();
    });

    $('#cart-items').on('click', '.decrement-item', function () {
        const itemIndex = $(this).closest('li').index();
        console.log(itemIndex);
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity--;
            cartItems[itemIndex].totalPrice = cartItems[itemIndex].quantity * (cartItems[itemIndex].totalPrice / (cartItems[itemIndex].quantity + 1));
            updateCartUI();
        }
    });

    $('#cart-items').on('click', '.increment-item', function () {
        const itemIndex = $(this).closest('li').index();
        cartItems[itemIndex].quantity++;
        cartItems[itemIndex].totalPrice = cartItems[itemIndex].quantity * (cartItems[itemIndex].totalPrice / (cartItems[itemIndex].quantity - 1));
        updateCartUI();
    });

$('#cart-items').on('click', '.delete-item', function () {
            const itemIndex = $(this).data('item-index');
            cartItems.splice(itemIndex, 1); 
            updateCartUI();
        });

     });

    





