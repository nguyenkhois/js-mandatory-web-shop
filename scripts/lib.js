//This library can reuse in other project
OwnObjectArray = {
    toJSONString(objectArray) {
        try{
            let i;
            let sJSON;
            let arrLength = 0;

            Array.isArray(objectArray) ? arrLength = objectArray.length : sJSON = '';
            if (arrLength > 0){
                sJSON = "[";
                for (i in objectArray){
                    sJSON += JSON.stringify(objectArray[i]);
                    if (i < arrLength-1)
                        sJSON += ",";
                }
                sJSON += "]";
            }
            return sJSON;
        }catch(e){
            return false;
        }
    },
    toObjectArray(stringJSON){
        try{
            let arrNew = [];
            let objJSON = JSON.parse(stringJSON) || {}; //convert from JSON string to JSON object
            let i;

            if (objJSON)
                for (i in objJSON)
                    arrNew.push(objJSON[i]); // add an object into an array

            return arrNew;
        }catch(e){
            return false;
        }
    },
    findIndex(objectArray,objPropertyName,objPropertyValue) {
        try{
            if (Array.isArray(objectArray))
                return objectArray.findIndex(objIndex => objIndex[objPropertyName] === objPropertyValue);
            else
                return -1;
        }catch(e){
            return false;
        }
    },
    sortByAlphabet(objectArray,objPropertyName,order){
        let objPropertyNameLowerCase = objPropertyName.toLowerCase();
        objectArray.sort(function(a, b){
            let x = a[objPropertyNameLowerCase];
            let y = b[objPropertyNameLowerCase];
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
    },
    sortByNumeric(objectArray,objPropertyName,order){
        objectArray.sort(function (a, b){
            if (order === 1) //1 is mean descending
                return b[objPropertyName] - a[objPropertyName];
            else //0 and other is mean ascending
                return a[objPropertyName] - b[objPropertyName];
        });
        return objectArray;
    }
};

function getParameterValue(param){
    try{
        let sQueryString = document.URL.split("?")[1];
        let searchParams = new URLSearchParams(sQueryString);

        if (searchParams.has(param))
            return searchParams.get(param);
        else
            return false;
    }catch(e){
        return false;
    }
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