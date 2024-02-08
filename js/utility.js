
function getDeliveryDate() {
    var randomNumber = Math.random();
    var scaledNumber = randomNumber * (15 - 7 + 1) + 7;
    var randomInteger = Math.floor(scaledNumber);
    return randomInteger;
}
function getItemStock() {
    var randomNumber = Math.random();
    var scaledNumber = randomNumber * 10;
    var randomNumberInRange = Math.ceil(scaledNumber);
    return randomNumberInRange;
}

function showExistingCheckout() {
    var products = JSON.parse(localStorage.getItem('cart'))
    let price = 0;
    if (products != null) {
        for (let obj of products) {
            price = price + obj.dis_price;
        }
        if (price > 0) {
            checkoutItem = products.length;
            $("#subTotal").css('display', "");
            $("#subTotal").html("<b>$" + price + "</b>")
            $("#checkout").html("<b>Checkout (" + products.length + ")</b>")
        }
    }
}

function showCartAmounts() {
    if (window.localStorage.getItem("cart")) {
        let data = JSON.parse(window.localStorage.getItem("cart"));
        let itemAmounts = 0;
        for (let item of data) {
            console.log(parseInt(item.qty_selected));
            itemAmounts+= parseInt(item.qty_selected);
        }
        if (itemAmounts === 0) {
            $("#item-amounts").css("display", "none");
        } else {
            $("#item-amounts").css("display", "block");
            $("#item-amounts").text(itemAmounts);
        }
    } else {
        $("#item-amounts").css("display", "none");
    }
}