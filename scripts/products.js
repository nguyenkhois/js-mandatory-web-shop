$(document).ready(function(){
    //Get HTML elements
    let dspProductList = ("#dspProductList");

    //Functions
    function renderProduct(objProduct){
        //Create a new product content
        let description = objProduct.Description;
        description = description.limitWords(20);

        let $productContentHTML = `<img class="product_image" src="${objProduct.Image}">
                               <p class="product_title"><a href="product_detail.html?id=${objProduct.Id}" class="item_link">${objProduct.Name}</a></p>
                               <p>${description}...</p>
                               <p class="product_price">${objProduct.Price} kr</p>`;
        //Create a button
        let $productButton = $("<button>").text("Add to cart");
        $productButton.addClass("button button_buy");

        //Append button to HTML content
        let $productContent = $("<article>").html($productContentHTML);
        $productContent.addClass("product box box-dashed");
        $productContent.append($productButton);

        //Append to main container
        dspProductList.append($productContent);

        //Passing this object as the argument to a onclick function
        $($productButton).click(function(){addToCart(objProduct,1);}); //add this product to cart with quantity is 1 item
    }
    function showProductList() {
        $.get(urlProducts)
            .done(function (arrProducts) {
                if (Array.isArray(arrProducts) && arrProducts.length > 0){ //Check input data before using
                    for (let i in arrProducts)
                        renderProduct(arrProducts[i]);
                }else
                    dspProductList.html("<h1>Data not found</h1>");
            })
            .fail(function (error) {console.log(error)});
    }

    //MAIN
    showProductList();
    updateCartStatus();//Update icon shopping cart
});
