$(document).ready(function(){
    //Get HTML elements
    let dspOrders = $("#dspOrders");

    //Functions
    function renderCustomerInfo(objOrder){
        //Get the user info
        return `<tr>
                    <td>${objOrder.FirstName + " " + objOrder.LastName}</td>
                    <td>${objOrder.StreetAddress + " " + objOrder.City}</td>
                    <td>${objOrder.Comment}</td>
                </tr>`;
    }

    //MAIN
    //Get all orders from API
    $.get(urlOrders)
        .done(function (data){
            console.log("Get successfully!",data);

            //Check data before using
            if (Array.isArray(data) && data.length > 0){
                //Create the table with its attributes
                let tbOrders = $("<table>").attr({id:'tbOrders',class:'table-list'});
                let header = `<tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Comment</th>
                                </tr>`;

                //Add the header into the table
                tbOrders.append(header);

                //Using data which got from API
                for (let i in data)
                    tbOrders.append(renderCustomerInfo(data[i]));

                //Render whole the table with its content
                dspOrders.append(tbOrders);
            }
            else
                dspOrders.html("<h1>Data not found</h1>");
        })
        .fail(function (error) {console.log("Error found!",error)});
});


