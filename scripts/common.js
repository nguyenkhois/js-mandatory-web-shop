function storeCart(arrCart) {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");

        let sJSONCart = OwnObjectArray.toJSONString(arrCart);
        sessionStorage.setItem("wsShoppingCart",sJSONCart);
    }
}
function retrieveCart() {
    let arrCart = [];
    if (typeof(Storage) !== "undefined" && sessionStorage.getItem("wsShoppingCart")) {
        let sJSONCart = sessionStorage.getItem("wsShoppingCart");
        arrCart = OwnObjectArray.toObjectArray(sJSONCart);
    }
    return arrCart;
}
function addToCart(objProduct) {
    let arrCart = retrieveCart();
    let i = OwnObjectArray.findIndex(arrCart,'productId',objProduct.productId);

    if (arrCart.length > 0 && i > -1)
        arrCart[i].productQuantity++;
    else{
        objProduct.productQuantity = 1; //Assign new property to objProduct
        arrCart.push(objProduct);
    }

    storeCart(arrCart);
    alert(objProduct.productName + " added to cart!");
    updateCartStatus(); //Update icon shopping cart on products.html page
}
function buildAnItemInCart(objProduct) {
    //Create HTML content
    let $cartItemContent =`<td><a href="product_detail.html?id=${objProduct.productId}" class="product_link">${objProduct.productName}</a></td>
                            <td class="cartItemNumber"><input type="number" value="${objProduct.productQuantity}"></td>
                            <td class="cartItemNumber">${objProduct.productPrice}</td>
                            <td><img class="cartItemRemove" src="../images/remove-from-cart.png" alt="Remove from cart"></td>`;
    //Create HTML element
    let $cartItem = $("<tr>").html($cartItemContent);
    $cartItem.addClass("cartItem");

    $("#tbShoppingCart").append($cartItem);
}
function showCart() {
    let arrCart = retrieveCart();
    let j;

    for (j in arrCart)
        buildAnItemInCart(arrCart[j]);
}
function clearCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");
    }
}
function updateCartStatus() {
    let arrCart = retrieveCart();
    let j;
    let quantity = 0;

    for (j in arrCart)
        quantity += arrCart[j].productQuantity;

    $("#dspShoppingCartStatus").text(quantity.toString());
}