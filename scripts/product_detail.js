//Get HTML elements
let customerName = $("#customerName");
let customerComment = $("#customerComment");
let dspReviews = $("#dspReviews");
let dspProductDetail = $("#dspProductDetail");
let btnSendReview = $("#btnSendReview");

//FUNCTIONS
function renderProductDetail(objProduct){
    //Create a new product content
    let $productContentHTML = `<img src="${objProduct.Image}">
                               <p class="product_title">${objProduct.Name}</p>
                               <p>${objProduct.Description}</p>
                               <p class="product_price">${objProduct.Price} kr</p>`;
    //Create a button
    let $productButton = $("<button>").text("Add to cart");
    $productButton.addClass("button button_buy");

    //Append button to HTML content
    let $productContent = $("<article>").html($productContentHTML);
    $productContent.addClass("product_detail box box-dashed");
    $productContent.append($productButton);

    //Append to main container
    dspProductDetail.append($productContent);

    //Passing this object as the argument to a onclick function
    $($productButton).click(function(){addToCart(objProduct,1);});
}
function retrieveReviews() {
    if (typeof(Storage) !== "undefined")
        if (localStorage.wsReviews)
            return OwnObjectArray.toObjectArray(localStorage.wsReviews);
        else
            return null;
    else
        return false
}
function storeReviews(objProductReviews) {
    if (typeof(Storage) !== "undefined"){
        if (localStorage.wsReviews)
            localStorage.removeItem("wsReviews");

        localStorage.wsReviews = OwnObjectArray.toJSONString(objProductReviews);
    }else
        return false
}
function renderProductReview(objReview) {
    //Get starts
    let startImage;
    switch (parseInt(objReview.Rating)){
        case 1:
            startImage = star1;
            break;
        case 2:
            startImage = star2;
            break;
        case 3:
            startImage = star3;
            break;
        case 4:
            startImage = star4;
            break;
        case 5:
            startImage = star5;
            break;
        default:
            break
    }

    let reviewBox = $("<article>").addClass("box box-default review-box");
    let reviewContent = `<p class="review-customer-name">${objReview.name}</p>
                        <p><img src="${startImage}" alt="Rating" class="review-stars"></p>
                        <p>${objReview.comment}</p>
                        `;
    reviewBox.html(reviewContent);
    dspReviews.append(reviewBox);
}
function getProductReviews(productId) {
    let allProductsReviews = retrieveReviews(); //returns an object array with all reviews for all products
    let productReviews = OwnObjectArray.filterByProperty(allProductsReviews,'Id',productId); //returns only this product reviews

    dspReviews.html(""); //clear all older reviews before render newest reviews
    let i;
    for (i in productReviews)
        renderProductReview(productReviews[i]);
}
function clearReviewForm() {
    customerName.val("").focus();
    customerComment.val("");
}
function checkReviewForm() {
    if (customerName.val().length === 0 || customerName.val().length > 20){
        alert("Your name must have 1-20 character");
        customerName.focus();
        return false
    }else if (!namePattern.test(customerName.val())){
        alert("Your name does not look good");
        customerName.focus();
        return false
    }else if (customerComment.val().length === 0 || customerComment.val().length > 200){
        alert("Your comment must have 1-200 character");
        customerComment.focus();
        return false
    }else
        return true
}

//MAIN
let queryProductID = parseInt(getParamFromUrl('id'));
let productIndex = OwnObjectArray.findIndex(arrProducts,'Id',queryProductID);
let objProduct;

productIndex >= 0 ? objProduct = arrProducts[productIndex] : objProduct = null;
if (objProduct !== null && objProduct.Id === queryProductID){
    renderProductDetail(objProduct);
    updateCartStatus(); //get current cart state
    getProductReviews(objProduct.Id); //get all reviews for this product

    //Button send preview
    btnSendReview.click(function (event) {
        event.preventDefault();
        if (checkReviewForm()){
            //Get current review
            let customerRating = $("input[name=customerRating]:checked").val();
            let allProductsReviews = retrieveReviews(); //returns an object array or false
            if (!allProductsReviews) //If it's not found any reviews in system
                allProductsReviews = [];//Set the array is null

            //Get max review ID
            let maxReviewId = 1;
            if (allProductsReviews.length > 0)
                maxReviewId += OwnObjectArray.getMax(allProductsReviews,'reviewId');

            let objReview = {
                reviewId: maxReviewId,
                Id: objProduct.Id,
                name: customerName.val().toText(),
                comment: customerComment.val().toText(),
                rating: customerRating
            };

            allProductsReviews.unshift(objReview);
            storeReviews(allProductsReviews);
            clearReviewForm();
            getProductReviews(objProduct.Id);
        }
    });
}else
    dspProductDetail.html("<h1>Data not found</h1>");
