$(document).ready(function(){
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
        let reviewContent = `<p class="review-customer-name">${objReview.Name}</p>
                        <p><img src="${startImage}" alt="Rating" class="review-stars"></p>
                        <p>${objReview.Comment}</p>
                        `;
        reviewBox.html(reviewContent);
        dspReviews.append(reviewBox);
    }
    function getProductReviews(arrReviews) {
        dspReviews.html(""); //clear all older reviews before render newest reviews
        if (Array.isArray(arrReviews) && arrReviews.length > 0){
            for (let i in arrReviews)
                renderProductReview(arrReviews[i]);
        }
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
    if (queryProductID > 0){
        $.get(urlProductDetail+queryProductID)
            .done(function (objProduct) {
                renderProductDetail(objProduct);
                getProductReviews(objProduct.Reviews); //get all reviews for this product

                updateCartStatus(); //get current cart state

                //Button send preview
                btnSendReview.click(function (event) {
                    event.preventDefault();
                    if (checkReviewForm()){
                        //Get current review
                        let customerRating = $("input[name=customerRating]:checked").val();

                        //Id will be set automatically when posting a new data to the server
                        let objReview = {
                            Id: '',
                            ProductID: objProduct.Id,
                            Name: customerName.val().toText(),
                            Comment: customerComment.val().toText(),
                            Rating: customerRating
                        };

                        $.post(urlReviews,objReview)
                            .done(function (data) {console.log("Your data have been sent successfully!",data);})
                            .fail(function (error) {console.log("Error found!",error)});

                        clearReviewForm();
                    }
                });
            })
            .fail(function (error) {console.log(error)});
    }else
        dspProductDetail.html("<h1>Data not found</h1>");
});

