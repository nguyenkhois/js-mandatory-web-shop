function buildJSONStore(arrShoppingCart) {
    let sJSON;
    let i;
    let arrLength = arrShoppingCart.length;

    sJSON = "[";
    for (i = 0; i < arrLength; i++){
        sJSON += JSON.stringify(arrShoppingCart[i]);
        if (i < arrLength-1)
            sJSON += ",";
    }
    sJSON += "]";
    return sJSON;
}
function storeShoppingCart(arrShoppingCart) {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");

        let jsonShoppingCart = buildJSONStore(arrShoppingCart);
        sessionStorage.setItem("wsShoppingCart",jsonShoppingCart);
    } else {
        // Sorry! No Web Storage support..
    }
}
function addToShoppingCart(objProduct) {
    arrShoppingCart.push(objProduct);
    storeShoppingCart(arrShoppingCart);
    alert(objProduct.productName + " added to cart!");
}
function retrieveShoppingCart() {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart"))
            return sessionStorage.getItem("wsShoppingCart");
        else
            return false;
    } else
        return false;
}
function clearShoppingCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");
    }else
        document.body.innerHTML = "Sorry, your browser does not support Session Storage...";
}
function showShoppingCart(objProduct) {
    let spItem = document.createElement("tr");
    spItem.setAttribute("class","cartItem");
    spItem.innerHTML = "<td>"+objProduct.productName+"</td>"
        + "<td class='cartItemNumber'><input type='number' value='1'></td>"
        + "<td class='cartItemNumber'>"+objProduct.productPrice+"</td>"
        + "<td><img class='cartItemRemove' src='../images/remove-from-cart.png' alt='Remove from cart' title='Remove from cart'></td>";

    let parentElement = document.getElementById("tbShoppingCart");
    parentElement.appendChild(spItem);
}
function viewShoppingCart() {
    let sJSONShoppingCart = retrieveShoppingCart();
    let objShoppingCart = JSON.parse(sJSONShoppingCart);
    let arrShoppingCart = [];

    let i;
    for (i in objShoppingCart)
        arrShoppingCart.push(objShoppingCart[i]);

    let j;
    let arrShoppingCartLength = arrShoppingCart.length;
    for (j = 0; j < arrShoppingCartLength; j++)
        showShoppingCart(arrShoppingCart[j]);
}