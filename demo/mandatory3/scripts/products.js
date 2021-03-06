function renderProduct(objProduct){
    //Create a new product content
    let $productContentHTML = `<img src="../images/${objProduct.productImageUrl}">
                               <p class="product_title"><a href="product_detail.html?id=${objProduct.productId}" class="product_link">${objProduct.productName}</a></p>
                               <p>${objProduct.productDescription}</p>
                               <p class="product_price">${objProduct.productPrice} kr</p>`;
    //Create a button
    let $productButton = $("<button>").text("Add to cart");
    $productButton.addClass("button button_buy");

    //Append button to HTML content
    let $productContent = $("<article>").html($productContentHTML);
    $productContent.addClass("product box box-dashed");
    $productContent.append($productButton);

    //Append to main container
    $("#dspProductList").append($productContent);

    //Passing this object as the argument to a onclick function
    $($productButton).click(function(){addToCart(objProduct,1);}); //add this product to cart with quantity is 1 item
}
function showProductList() {
    let i;
    for (i in arrProducts)
        renderProduct(arrProducts[i]);
}

//MAIN
$(document).ready(function(){
    showProductList();
    updateCartStatus();//Update icon shopping cart
});
