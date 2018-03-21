$(document).ready(function(){
    //Get HTML elements
    let uFirstname = $("#txtFirstname");
    let uLastname = $("#txtLastname");
    let uEmail = $("#txtEmail");
    let uPhoneNumber = $("#txtPhoneNumber");
    let uAddress = $("#txtAddress");
    let uZipCode = $("#txtZipCode");
    let uCity = $("#txtCity");
    let uComments = $("#txtComments");
    let btnCheckout = $("#btnCheckout");

    //FUNCTIONS
    function validationUserForm(){
        if (uFirstname.val() === "" || uFirstname.val().length < 3){
            alert("First name must have and between 3-100 characters!");
            uFirstname.focus();
            return false;
        }else if (uLastname.val() === "" || uLastname.val().length < 3){
            alert("Last name must have and between 3-100 characters!");
            uLastname.focus();
            return false;
        }else if (uEmail.val() === "" || validationEmailAddress(uEmail.val()) === false || uEmail.val().length < 5){
            alert("Email must have and between 5-50 characters! Example: example@domain.xyz");
            uEmail.focus();
            return false;
        }else if(uPhoneNumber.val() !== "" && uPhoneNumber.val().length < 6){
            alert("Telephone number is optional and between 6-20 characters!");
            uPhoneNumber.focus();
            return false;
        }else if(uAddress.val() === "" || uAddress.val().length < 5){
            alert("Street address must have and between 5-200 characters!");
            uAddress.focus();
            return false;
        }else if(uZipCode.val() === "" || uZipCode.val().length < 2){
            alert("Zip code must have and between 2-10 characters!");
            uZipCode.focus();
            return false;
        }else if(uCity.val() === "" || uCity.val().length < 2){
            alert("City must have and between 2-50");
            uCity.focus();
            return false;
        }else if(uComments.val().length >= 1 && uComments.val().length < 10){
            alert("Comments must have more than 10 characters");
            uComments.focus();
            return false;
        }else{
            alert("SUCCEED! Your order has been sent!");
            return true;
        }
    }
    function clearOrderForm(){
        $("input").val("");
        $("textarea").val("");
    }

    //Limit input length by addEventListener
    uFirstname.keypress(function(){limitInputLength("txtFirstname",100);});
    uLastname.keypress(function(){limitInputLength("txtLastname",100);});
    uEmail.keypress(function(){limitInputLength("txtEmail",50);});
    uPhoneNumber.keydown(forceKeyPressNumber);
    uPhoneNumber.keypress(function(){limitInputLength("txtPhoneNumber",20);});
    uAddress.keypress(function(){limitInputLength("txtAddress",200);});
    uZipCode.keydown(forceKeyPressNumber);
    uZipCode.keypress(function(){limitInputLength("txtZipCode",10);});
    uCity.keypress(function(){limitInputLength("txtCity",50);});
    uComments.keypress(function(){limitInputLength("txtComments",1000);});

    btnCheckout.click(function () {
        if (validationUserForm()){
            //Send data to API
            let cart = retrieveCart();
            if (cart.length > 0){
                //Id will be set automatically when posting a new data to the server
                let order = {
                    Id: '',
                    FirstName: uFirstname.val().toText(),
                    LastName: uLastname.val().toText(),
                    Email: uEmail.val().toText(),
                    Phone: uPhoneNumber.val().toText(),
                    StreetAddress: uAddress.val().toText(),
                    ZipCode: uZipCode.val().toText(),
                    City: uCity.val().toText(),
                    Comment: uComments.val().toText(),
                    OrderItems: cart
                };

                $.post(urlOrders,order)
                    .done(function (data) {console.log("Your data have been sent successfully!",data);})
                    .fail(function (error) {console.log("Error found!",error)});

                clearCart();
                clearOrderForm();
            }
        }
    });

    //MAIN
    showCart();
});



