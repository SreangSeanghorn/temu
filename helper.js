function getCartSummary(cart) {
    let numOfItems = 0;
    let totalPrice = 0;
    let discountPrice = 0;
    cart.forEach(function (item) {
        numOfItems += parseInt(item.qty_selected);
        totalPrice += parseFloat(item.price) * parseInt(item.qty_selected);
        discountPrice += parseFloat(item.dis_price) * parseInt(item.qty_selected);
    });
    result = {
        numOfItems: numOfItems,
        totalPrice: totalPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        discountPart: (totalPrice - discountPrice).toFixed(2),
        taxPrice: (discountPrice / 100 * 10).toFixed(2),
    }
    return {
        ...result,
        orderTotal: (parseFloat(result.discountPrice) + parseFloat(result.taxPrice)).toFixed(2)
    }
}

const countryData = [
    {
        name: 'United States',
        value: 'us'
    },
    {
        name: 'England',
        value: 'uk'
    },
    {
        name: 'Australia',
        value: 'au'
    }
]

const paymentMethodData = [
    {
        name: 'Master Card',
        value: 'master'
    },
    {
        name: 'Paypal',
        value: 'paypal'
    },
    {
        name: 'Visa',
        value: 'visa'
    },
    {
        name: 'Klarna',
        value: 'klarna'
    },
    {
        name: 'Venmo',
        value: 'venmo'
    }
]

module.exports = { getCartSummary, countryData, paymentMethodData };