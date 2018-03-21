$(document).ready(function(){
    //Get HTML elements
    let dspOrders = $("#dspOrders");

    //Functions
    function renderCustomerInfo(objOrder){
        return `<tr>
                    <td><a href="order_detail.html?id=${objOrder.Id}" class="item_link">${objOrder.FirstName + " " + objOrder.LastName}</a></td>
                    <td>${objOrder.StreetAddress + " " + objOrder.City}</td>
                    <td>${objOrder.Comment}</td>
                </tr>`;
    }

    //MAIN
    //Get all orders from API
    $.get(urlOrders)
        .done(function (data){
            //console.log("Get successfully!",data);
            //Check data before using
            if (Array.isArray(data) && data.length > 0){
                let tbOrders = $("<table>").attr({id:'tbOrders',class:'table-list'});
                let header = `<tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Comment</th>
                                </tr>`;

                tbOrders.append(header);
                for (let i in data)
                    tbOrders.append(renderCustomerInfo(data[i]));
                dspOrders.append(tbOrders);
            }else
                dspOrders.html("<h1>Data not found</h1>");
        })
        .fail(function (error) {console.log("Error found!",error)});
});


