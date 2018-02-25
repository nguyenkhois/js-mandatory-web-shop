function validationUserForm(){
    if (uFirstname.value === "" || uFirstname.value.length < 3){
        alert("First name must have and between 3-100 characters!");
        uFirstname.focus();
        return false;
    }else if (uLastname.value === "" || uLastname.value.length < 3){
        alert("Last name must have and between 3-100 characters!");
        uLastname.focus();
        return false;
    }else if (uEmail.value === "" || validationEmailAddress(uEmail.value) === false || uEmail.value.length < 5){
        alert("Email must have and between 5-50 characters! Example: example@domain.xyz");
        uEmail.focus();
        return false;
    }else if(uPhoneNumber.value !== "" && uPhoneNumber.value.length < 6){
        alert("Telephone number is optional and between 6-20 characters!");
        uPhoneNumber.focus();
        return false;
    }else if(uAddress.value === "" || uAddress.value.length < 5){
        alert("Street address must have and between 5-200 characters!");
        uAddress.focus();
        return false;
    }else if(uZipCode.value === "" || uZipCode.value.length < 2){
        alert("Zip code must have and between 2-10 characters!");
        uZipCode.focus();
        return false;
    }else if(uCity.value === "" || uCity.value.length < 2){
        alert("City must have and between 2-50");
        uCity.focus();
        return false;
    }else if(uComments.value.length >= 1 && uComments.value.length < 10){
        alert("Comments must have more than 10 characters");
        uComments.focus();
        return false;
    }else{
        alert("SUCCEED! Your order has been sent!");
        clearShoppingCart();
        return true;
    }
}

//MAIN
viewShoppingCart();

//Form
let uFirstname = document.getElementById("txtFirstname");
let uLastname = document.getElementById("txtLastname");
let uEmail = document.getElementById("txtEmail");
let uPhoneNumber = document.getElementById("txtPhoneNumber");
let uAddress = document.getElementById("txtAddress");
let uZipCode = document.getElementById("txtZipCode");
let uCity = document.getElementById("txtCity");
let uComments = document.getElementById("txtComments");
let btnCheckout = document.getElementById("btnCheckout");

//Limit input length by addEventListener
uFirstname.addEventListener("keypress",function () {limitInputLength("txtFirstname",100);});
uLastname.addEventListener("keypress",function () {limitInputLength("txtLastname",100);});
uEmail.addEventListener("keypress",function () {limitInputLength("txtEmail",50);});
uPhoneNumber.addEventListener("keydown",forceKeyPressNumber);
uPhoneNumber.addEventListener("keypress",function () {limitInputLength("txtPhoneNumber",20);});
uAddress.addEventListener("keypress",function () {limitInputLength("txtAddress",200);});
uZipCode.addEventListener("keydown",forceKeyPressNumber);
uZipCode.addEventListener("keypress",function () {limitInputLength("txtZipCode",10);});
uCity.addEventListener("keypress",function () {limitInputLength("txtCity",50);});
uComments.addEventListener("keypress",function () {limitInputLength("txtComments",1000);});

btnCheckout.addEventListener("click",validationUserForm);