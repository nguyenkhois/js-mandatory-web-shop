function viewShoppingCart() {
    let jsonShoppingCart = retrieveShoppingCart();
    let objShoppingCart = JSON.parse(jsonShoppingCart);

    let arrShoppingCart = [];

    let i;
    for (i in objShoppingCart){
        arrShoppingCart.push(objShoppingCart[i]);
    }

    let j;
    let arrShoppingCartLength = arrShoppingCart.length;
    for (j = 0; j < arrShoppingCartLength; j++){
        showShoppingCart(arrShoppingCart[j]);
    }
}
function showShoppingCart(objProduct) {
    let spItem = document.createElement("tr");
    spItem.setAttribute("class","cartItem");
    spItem.innerHTML = "<td>"+objProduct.productName+"</td>"
        + "<td>1</td>"
        + "<td>"+objProduct.productPrice+"</td>"
        + "<td>X</td>";

    let parentElement = document.getElementById("tbShoppingCart");
    parentElement.appendChild(spItem);
}
function limitInputLength(elementID,length) {
    let userKeyPress = window.event ? event.which : event.keyCode;

    if (document.getElementById(elementID).value.length === length && userKeyPress !== 8){
        event.preventDefault();
        return false;
    }else{
        return true;
    }
}
function limitKeyPressNumber() {
    let userKeyPress = window.event ? event.which : event.keyCode;

    if (userKeyPress !== 8){
        if (userKeyPress < 48 || userKeyPress > 57){
            event.preventDefault(); //stop the key press
            return false;
        }
    }else{
        return true;
    }
}
function validationUserForm(){
    if (uFirstname.value === "" || uFirstname.value.length < 3){
        alert("First name must have and between 3-100 characters!");
        uFirstname.focus();
        return false;
    }else if (uLastname.value === "" || uLastname.value.length < 3){
        alert("Last name must have and between 3-100 characters!");
        uLastname.focus();
        return false;
    }else if (uEmail.value === "" || uEmail.value.length < 5){
        alert("Email must have and between 5-50 characters!");
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
    }else{
        alert("SUCCEED! Your order has been sent!");
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
let uCommnets = document.getElementById("txtComments");
let btnCheckout = document.getElementById("btnCheckout");

//Limit input length
uFirstname.addEventListener("keypress",function () {limitInputLength("txtFirstname",100);});
uLastname.addEventListener("keypress",function () {limitInputLength("txtLastname",100);});
uEmail.addEventListener("keypress",function () {limitInputLength("txtEmail",50);});

uPhoneNumber.addEventListener("keypress",limitKeyPressNumber);
uPhoneNumber.addEventListener("keydown",function () {limitInputLength("txtPhoneNumber",20);});

uAddress.addEventListener("keypress",function () {limitInputLength("txtAddress",200);});
uZipCode.addEventListener("keypress",function () {limitInputLength("txtZipCode",10);});
uCity.addEventListener("keypress",function () {limitInputLength("txtCity",50);});
uCommnets.addEventListener("keypress",function () {limitInputLength("txtComments",1000);});

btnCheckout.addEventListener("click",validationUserForm);