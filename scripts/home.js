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
    let parentElement = document.getElementById("dspProductList");
    parentElement.appendChild(newProductContent);

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

viewProductList();
