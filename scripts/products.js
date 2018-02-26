function buildAProduct(objProduct){
    //Create a new product content
    let newProductContent = document.createElement("article");
    newProductContent.setAttribute("class","product box box-dashed");
    newProductContent.innerHTML = `<img src="../images/${objProduct.productImageUrl}">
                                   <p class="product_title"><a href="product_detail.html?id=${objProduct.productId}" class="product_link">${objProduct.productName}</a></p>
                                   <p>${objProduct.productDescription}</p>
                                   <p class="product_price">${objProduct.productPrice} kr</p>`;

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
        addToCart(objProduct);
    });
}
function showProductList() {
    let i;
    for (i in arrProducts)
        buildAProduct(arrProducts[i]);
}

//MAIN
showProductList();
updateCartStatus();//Update icon shopping cart