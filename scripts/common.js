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
function addToCart(objProduct, quantity) {
    let arrCart = retrieveCart();
    let i = OwnObjectArray.findIndex(arrCart,'Id',objProduct.Id);

    if (arrCart.length > 0 && i > -1)
        arrCart[i].productQuantity += quantity;
    else{
        objProduct.productQuantity = quantity; //Assign new property to objProduct
        arrCart.push(objProduct);
    }

    storeCart(arrCart);
    alert(objProduct.Name + " added to cart!");
    updateCartStatus(); //Update icon shopping cart on products.html page
}
function renderItemInCart(objProduct) {
    //Create HTML content
    let $cartItemName = `<td><a href="product_detail.html?id=${objProduct.Id}" class="product_link">${objProduct.Name}</a></td>`;

    let $cartItemQuantityInput = $("<input>").attr({"type":"number", "min":"1", "max":"10","value":objProduct.productQuantity});
    let $cartItemQuantity = $("<td>").addClass("cartItemNumber").append($cartItemQuantityInput);

    let $cartItemPrice = `<td class="cartItemNumber">${objProduct.Price}</td>`;
    let $cartItemTotal = `<td class="cartItemNumber">${parseFloat(objProduct.Price * objProduct.productQuantity).toFixed(3)}</td>`;

    let $cartItemRemoveIcon = $("<img>").attr("src","../images/remove-from-cart.png").addClass("cartItemRemove");
    let $cartItemRemove = $("<td>").append($cartItemRemoveIcon);

    //Create HTML element
    let $cartItem = $("<tr>").append($cartItemName,$cartItemQuantity,$cartItemPrice,$cartItemTotal,$cartItemRemove);
    $cartItem.addClass("cartItem");

    //Create actions
    $cartItemQuantityInput.change(function () {updateCart(objProduct,parseInt($cartItemQuantityInput.val()));});
    $cartItemRemoveIcon.click(function () {deleteItemInCart(objProduct);});

    //Complete rendering
    $("#tbShoppingCart").append($cartItem);
}
function showCart() {
    let arrCart = retrieveCart();
    let sumCart = 0;
    let arShoppingCart = $("#arShoppingCart");

    //Clear all before render
    arShoppingCart.html("");

    //Render header
    let tbShoppingCart = `<table id="tbShoppingCart" class="table-list">
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price (kr)</th>
                            <th>Total</th>
                            <th>X</th>
                        </tr>
                    </table>`;
    arShoppingCart.append(tbShoppingCart);

    //Render all items in cart
    for (let j in arrCart){
        renderItemInCart(arrCart[j]);
        sumCart += arrCart[j].Price * arrCart[j].productQuantity;
    }

    //Render sum
    let sum = $("<p>").html("<span>SUM: " + parseFloat(sumCart).toFixed(3) + " kr</span>").addClass("cartSum");
    arShoppingCart.append(sum);
}
function clearCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");
    }
}
function updateCartStatus() {
    let arrCart = retrieveCart();
    let quantity = 0;

    for (let j in arrCart)
        quantity += arrCart[j].productQuantity;

    $("#dspShoppingCartStatus").text(quantity.toString());
}
function updateCart(objProduct, quantity) {
    let arrCart = retrieveCart();
    let i = OwnObjectArray.findIndex(arrCart,'Id',objProduct.Id);

    if (arrCart.length > 0 && i > -1)
        arrCart[i].productQuantity = quantity;

    storeCart(arrCart);
    showCart();
}
function deleteItemInCart(objProduct) {
    let arrCart = retrieveCart();
    let i = OwnObjectArray.findIndex(arrCart,'Id',objProduct.Id);

    if (arrCart.length > 0 && i > -1)
        arrCart.splice(i,1);

    storeCart(arrCart);
    showCart();
}