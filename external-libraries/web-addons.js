//This library can reuse in other project
let OwnObjectArray = {
    toJSONString(objectArray) {
        try{
            if (Array.isArray(objectArray) && objectArray.length > 0)
                return JSON.stringify(objectArray);
            else
                return null
        }catch(e){return false}
    },
    toObjectArray(sJSON){
        try{
            let objJSON = JSON.parse(sJSON) || [];
            if (Array.isArray(objJSON))
                return objJSON;
            else
                return []
        }catch(e){return false}
    },
    findIndex(objectArray,sPropertyName,sPropertyValue) {
        try{
            if (Array.isArray(objectArray))
                return objectArray.findIndex(objItem => objItem[sPropertyName] === sPropertyValue);
            else
                return -1;
        }catch(e){return false}
    },
    sortByAlphabet(objectArray,sPropertyName,order){
        try{
            objectArray.sort(function(a, b){
                let x = a[sPropertyName];
                let y = b[sPropertyName];
                if (order === 1){ //1 is mean descending
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}
                }else{ //0 or other is mean ascending
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                }
                return 0;
            });
            return objectArray;
        }catch(e){return false}
    },
    sortByNumeric(objectArray, sPropertyName,order){
        try{
            objectArray.sort(function (a, b){
                if (order === 1) //1 is mean descending
                    return b[sPropertyName] - a[sPropertyName];
                else //0 and other is mean ascending
                    return a[sPropertyName] - b[sPropertyName];
            });
            return objectArray;
        }catch(e){return false}
    },
    filterByProperty(objectArray,sPropertyName,sSeekingValue){
        try{
            if (Array.isArray(objectArray)){
                if (objectArray.length > 0)
                    return objectArray.filter(objItem => objItem[sPropertyName] === sSeekingValue);
                else
                    return null
            }else
                return false
        }catch(e){return false}
    },
    getMax(objectArray,sPropertyName){
        try{
            if (Array.isArray(objectArray)){
                if (objectArray.length > 0){
                    let i;
                    let arrValues = [];
                    for (i in objectArray)
                        arrValues.push(objectArray[i][sPropertyName]);
                    return Math.max(...arrValues);
                }else
                    return null
            }else
                return false
        }catch(e){return false}
    }
};

String.prototype.toText = function(){
    return this.replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/\//g,"&frasl;")
               .replace(/\'/g,"&apos;")
               .replace(/\"/g, "&quot;");
};
String.prototype.limitWords = function(limitNumber){
    try{
        limitNumber = parseInt(limitNumber) || 0;
        if (limitNumber > 0 && this.length > 0)
            return this.split(" ").slice(0,limitNumber).join(" ");
    }catch(e){}
};

function getParamFromUrl(param){
    try{
        let sQueryString = document.URL.split("?")[1];
        let searchParams = new URLSearchParams(sQueryString);

        if (searchParams.has(param))
            return searchParams.get(param);
        else
            return false
    }catch(e){return false}
}
function forceKeyPressNumber() {
    let userKeyPress = window.event ? event.which : event.keyCode;
    if (userKeyPress !== 8){
        if (userKeyPress < 48 || userKeyPress > 57){
            event.preventDefault(); //stop the key press
            return false;
        }
    }else
        return true;
}
function limitInputLength(elementID,length) {
    let userKeyPress = window.event ? event.which : event.keyCode;

    if (document.getElementById(elementID).value.length === length && userKeyPress !== 8){
        event.preventDefault();
        return false;
    }else
        return true;
}
function validationEmailAddress(sEmail) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(sEmail);
}