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
function validationUserForm(){
    let uFirstname = document.getElementById("txtFirstname");
    let uLastname = document.getElementById("txtLastname");
    let uEmail = document.getElementById("txtEmail");
    let uPhoneNumber = document.getElementById("txtPhoneNumber");
    let uAddress = document.getElementById("txtAddress");
    let uZipCode = document.getElementById("txtZipCode");
    let uCity = document.getElementById("txtCity");
    let uCommnets = document.getElementById("txtComments");
    let btnCheckout = document.getElementById("btnCheckout");

    if (uFirstname.value === "" || uFirstname.value.length < 3 || uFirstname.value.length > 100 ){
        alert("First name must be have and between 3-100 characters!");
        uFirstname.focus();
        return false;
    }else if (uLastname.value === "" || uLastname.value.length < 3 || uLastname.value.length >100){
        alert("Last name must be have and between 3-100 characters!");
        uLastname.focus();
        return false;
    }
}

viewShoppingCart();
document.getElementById("btnCheckout").addEventListener("click",validationUserForm);
document.getElementById("txtPhoneNumber").addEventListener("keypress",function (event) {
    validateNumber(event);
});

function validationKeyPress(event) {
    let userKeyPress = window.event ? event.which : event.keyCode;
    if (userKeyPress < 48 || userKeyPress > 57){
        alert("no");
        return false;
    }else{
        return true;
    }
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
};