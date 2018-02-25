function storeShoppingCart(arrShoppingCart) {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");

        let jsonShoppingCart = OwnObjectArray.toJSONString(arrShoppingCart);
        sessionStorage.setItem("wsShoppingCart",jsonShoppingCart);
    }
}
function addToShoppingCart(objProduct) {
    let arrShoppingCart = retrieveShoppingCart();
    let arrShoppingCartLength = arrShoppingCart.length;
    let i = OwnObjectArray.findIndex(arrShoppingCart,'productId',objProduct.productId);

    if (arrShoppingCartLength > 0 && i > -1)
        arrShoppingCart[i].productQuantity++;
    else{
        objProduct.productQuantity = 1; //Assign new property to objProduct
        arrShoppingCart.push(objProduct);
    }

    storeShoppingCart(arrShoppingCart);
    alert(objProduct.productName + " added to cart!");
    showShoppingCartStatus(); //Update icon shopping cart on products.html page
}
function retrieveShoppingCart() {
    let arrShoppingCart = [];
    if (typeof(Storage) !== "undefined" && sessionStorage.getItem("wsShoppingCart")) {
        let sJSONShoppingCart = sessionStorage.getItem("wsShoppingCart");
        arrShoppingCart = OwnObjectArray.toObjectArray(sJSONShoppingCart);
    }

    return arrShoppingCart;
}
function clearShoppingCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");
    }
}
function showShoppingCart(objProduct) {
    let spItem = document.createElement("tr");
    spItem.setAttribute("class","cartItem");
    spItem.innerHTML = `<td>${objProduct.productName}</td>
                        <td class="cartItemNumber"><input type="number" value="${objProduct.productQuantity}"></td>
                        <td class="cartItemNumber">${objProduct.productPrice}</td>
                        <td><img class="cartItemRemove" src="../images/remove-from-cart.png" alt="Remove from cart"></td>`;

    let parentElement = document.getElementById("tbShoppingCart");
    parentElement.appendChild(spItem);
}
function viewShoppingCart() {
    let arrShoppingCart = retrieveShoppingCart();
    let j;

    for (j in arrShoppingCart)
        showShoppingCart(arrShoppingCart[j]);
}