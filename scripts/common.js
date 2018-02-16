function addToShoppingCart(objProduct) {
    arrShoppingCart.push(objProduct);
    storeShoppingCart(arrShoppingCart);
    alert(objProduct.productName + " added to cart!");
}
function buildJSONStore(arrShoppingCart) {
    let sJSON;
    let i;
    let arrLength = arrShoppingCart.length;

    sJSON = "[";
    for (i = 0; i < arrLength; i++){
        sJSON += JSON.stringify(arrShoppingCart[i]);
        if (i < arrLength-1){
            sJSON += ",";
        }
    }
    sJSON += "]";
    return sJSON;
}
function storeShoppingCart(arrShoppingCart) {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart")){
            sessionStorage.removeItem("wsShoppingCart");
        }
        let jsonShoppingCart = buildJSONStore(arrShoppingCart);
        sessionStorage.setItem("wsShoppingCart",jsonShoppingCart);
    } else {
        // Sorry! No Web Storage support..
    }
}
function retrieveShoppingCart() {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart")){
            return sessionStorage.getItem("wsShoppingCart");
        }
        else
            return false;
    } else
        return false;
}
function clearShoppingCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart")){
            sessionStorage.removeItem("wsShoppingCart");
        }
    }else{
        document.body.innerHTML = "Sorry, your browser does not support Session Storage...";
    }
}
