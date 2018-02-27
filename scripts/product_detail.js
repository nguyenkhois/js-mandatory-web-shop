function buildProductDetail(objProduct){
    //Create a new product content
    let newProductContent = document.createElement("article");
    newProductContent.setAttribute("class","product box box-default");
    newProductContent.innerHTML = `<img src="../images/${objProduct.productImageUrl}">
                                   <p class="product_title">${objProduct.productName}</p>
                                   <p>${objProduct.productDescription}</p>
                                   <p class="product_price">${objProduct.productPrice} kr</p>`;

    //Create a new button within the product content
    let newProductButton = document.createElement("button");
    newProductButton.setAttribute("class","button button_buy");
    newProductButton.innerHTML = "Add to cart";
    newProductContent.appendChild(newProductButton);

    //Append all into parent element
    let parentElement = document.getElementById("dspProductDetail");
    parentElement.appendChild(newProductContent);

    //Passing this object as the argument to a onclick function
    newProductButton.addEventListener("click",function () {
        addToCart(objProduct);
    });
}

let queryProductID = parseInt(getParamFromUrl('id'));
let productIndex = OwnObjectArray.findIndex(arrProducts,'productId',queryProductID);
let objProduct;

productIndex >= 0 ? objProduct = arrProducts[productIndex] : objProduct = null;

if (objProduct !== null){
    buildProductDetail(objProduct);
    updateCartStatus();
}else
    document.getElementById("dspProductDetail").innerHTML = "<h1>Data not found</h1>";
