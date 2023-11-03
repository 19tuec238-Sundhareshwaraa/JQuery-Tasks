$(document).ready(function(){

    var items=[
        {
            "name":"Samsung S22",
            "rate":"₹ 84999",
            "imgSrc":"assets/images/mobile-1.png"
        },
        {
            "name":"Sony TV",
            "rate":"₹ 59999",
            "imgSrc":"assets/images/tv.png"
        },
        {
            "name":"Dell Laptop",
            "rate":"₹ 63000",
            "imgSrc":"assets/images/laptop.png"
        },
        {
            "name":"T-Shirt",
            "rate":"₹ 900",
            "imgSrc":"assets/images/tshirt.png"
        },
        {
            "name":"Backpack",
            "rate":"₹ 1548",
            "imgSrc":"assets/images/bag.png"
        },
        {
            "name":"Black Shoes",
            "rate":"₹ 1247",
            "imgSrc":"assets/images/shoes.png"
        },
        {
            "name":"Smart Watch",
            "rate":"₹ 1545",
            "imgSrc":"assets/images/watch.png"
        },
        {
            "name":"Wallet",
            "rate":"₹ 243",
            "imgSrc":"assets/images/wallet.png"
        },
        {
            "name":"HandBag",
            "rate":"₹ 460",
            "imgSrc":"assets/images/bag2.png"
        },
    ];
    console.log(JSON.stringify(items))

    var itemBox=$(".cardBox");
    $.each(items,function(i,item){
        var itemDiv=$(`<div class="col-lg-4 cardEl mb-5"></div>`)
        var divBody=$(`<div class="card" style="width: 19rem;"></div>`)
        var itemImg=$(`<img src="${item.imgSrc}" class="img mx-auto pt-4">`);
        var itembody=$(` <div class="card-body">
        <div class="text-center">
          <h4 class="card-title">${item.name}</h4>
          <h6 style="color:green">${item.rate}</h6>
          <button class="cartBtn py-1 px-2">Add to Cart</button>
        </div>
    </div>`)
    divBody.append(itemImg,itembody)
    itemDiv.append(divBody);
    itemBox.append(itemDiv);
    })


    $(".searchBar").keyup(function(e){
        e.preventDefault();
        let searchItem=$(".searchBar").val().toLowerCase();
        let itemMatch=false;
        if(searchItem){
            $(".cardBox .cardEl").each(function(){
                let searchVal=$(this).find(".card-title").text().toLowerCase();
                console.log(this)
                if(searchVal.startsWith(searchItem)){
                    $(this).show();
                    itemMatch=true
                }
                else{
                    $(this).hide();
                }
            })
        }else{
            $(".cardBox .cardEl").show();
            itemMatch=true;
        }
        if(itemMatch){
            $(".no-items").hide();
        }else{
            $(".no-items").show();
        }  
    })

    // $(".searchBtn").click(function(e){

    //     e.preventDefault();
    //     let searchItem=$(".searchBar").val().toLowerCase();
    //     let itemMatch=false;
    //     if(searchItem){
    //         $(".cardBox .cardEl").each(function(){
    //             let searchVal=$(this).find(".card-title").text().toLowerCase();
    //             console.log(this)
    //             if(searchVal.startsWith(searchItem)){
    //                 $(this).show();
    //                 itemMatch=true
    //             }
    //             else{
    //                 $(this).hide();
    //             }
    //         })
    //     }else{
    //         $(".cardBox .cardEl").show();
    //         itemMatch=true;
    //     }
    //     if(itemMatch){
    //         $(".no-items").hide();
    //     }else{
    //         $(".no-items").show();
    //     }
    // })

    $(".navbar-brand").click(function(){
        $(".cardBox .cardEl").show();
        $(".searchBar").val("");
        $(".no-items").hide();
    })


    const totalItems = {};
    let amount=0;
    function addAmount(){
        amount=0;
        $(".cart-item").each(function(){
            let cartRate=$(this).find("h6").text();
            let cartQunty=$(this).find(".inputVal").val();
            let cartTotal=parseInt(cartRate.replace("₹",""));
             amount+=cartTotal*cartQunty;
        })
        if(amount===0){
            $(".total-amount").hide();
        }else{
            $(".total-amount").show();
            $(".total-amount").text(`Total Amount : ₹ ${amount}`);
        }
    }
    $(".cartBtn").click(function () {
        $(".box2 .img-fluid").hide();
        let item = $(this).parent();
        let itemImg = item.parent().siblings("img").attr("src");
        let itemName = item.find("h4").text();
        let price = item.find("h6").text();
        console.log(itemImg);
        if (totalItems[itemName]) {
            alert("Item is already added to the cart");
        } else {
            totalItems[itemName] = true;
            const cartItem = $(`<div class="cart-item text-center mt-1 ms-3">
                <img src="${itemImg}" class="cart_img mx-auto pt-4 d-none d-md-block">
                <h4 class="card-title mt-1 pt-4 pb-1">${itemName}</h4>
                <h6 class="text-primary mb-1 pb-2">${price}</h6>
                <div class="quantity mt-3">
                    <button class="minus"><span>-</span></button>
                    <input name="quantity" type="text" readonly class="inputVal" value="1">
                    <button class="plus"><span>+</span></button>
                    <span class="material-symbols-outlined ms-3 del">delete</span>
                </div>
                <hr>
            </div>`);
        
            $(".cart-container").append(cartItem);
            const minus = cartItem.find('.minus');
            const plus = cartItem.find('.plus');
            const input = cartItem.find('.inputVal');

            minus.click(function (e) {
                e.preventDefault();
                var value = parseInt(input.val());
                console.log(input.val())
                if (value > 1) {
                    value--;
                }
                input.val(value);
                addAmount();
            });

            plus.click(function (e) {
                e.preventDefault();
                var value = parseInt(input.val());
                value++;
                input.val(value);
                addAmount();
            });
            addAmount();
            cartItem.find(".del").click(function(){
                cartItem.remove();
                totalItems[itemName]=false;
                addAmount();
                if($(".cart-item").length===0){
                    $(".box2 .img-fluid").show();
                }
                addAmount();

        });
        }
    });



    
})


