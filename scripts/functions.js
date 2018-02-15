function showProductList(objProduct){
    //Create a new product content
    let newProductContent = document.createElement("article");
    newProductContent.setAttribute("class","product box box-dashed");
    newProductContent.innerHTML = "<img src=\"../images/"+ objProduct.productImageUrl +"\">"
                                    + "<p class='product_title'>" + objProduct.productName + "</p>"
                                    + "<p>" + objProduct.productDescription + "</p>"
                                    + "<p class='product_price'>" + objProduct.productPrice + "</p>";

    //Create a new button within the product content
    let newProductButton = document.createElement("button");
    newProductButton.setAttribute("class","button button_buy");
    newProductButton.innerHTML = "Add to cart";
    newProductContent.appendChild(newProductButton);

    //Append all into parent element
    let elementParent = document.getElementById("dspProductList");
    elementParent.appendChild(newProductContent);

    //Passing this object as the argument to a onclick function
    newProductButton.addEventListener("click",function () {
        addToShoppingCart(objProduct);
    });
}
function viewProductList() {
    let i;
    let arrProductsLength = arrProducts.length;
    for (i = 0; i < arrProductsLength; i++){
        showProductList(arrProducts[i]);
    }
}
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
function viewShoppingCart() {
    let jsonShoppingCart = retrieveShoppingCart();
    let objShoppingCart = JSON.parse(jsonShoppingCart);

    let arrShoppingCart = [];

    let i;
    for (i in objShoppingCart){
        arrShoppingCart.push(objShoppingCart[i]);
    }

    let j;
    let arrShoppingCartLength = arrShoppingCart.length;
    for (j = 0; j < arrShoppingCartLength; j++){
        showShoppingCart(arrShoppingCart[j]);
    }
}
function showShoppingCart(objProduct) {
    alert(objProduct.productName);
}