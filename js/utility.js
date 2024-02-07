
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