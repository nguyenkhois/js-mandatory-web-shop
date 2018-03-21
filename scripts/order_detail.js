$(document).ready(function(){
    //Get HTML elements
    let dspOrderDetail = $("#dspOrderDetail");

    //Functions
    function renderAnItem(objProduct) {
        return `<tr>
                    <td><a href="product_detail.html?id=${objProduct.Id}" class="item_link">${objProduct.Name}</a></td>
                    <td>${objProduct.Price}</td>
                    <td>1</td>
                </tr>`;
    }

    //MAIN
    let orderId = getParamFromUrl("id");
    let orderUrl = urlOrders + orderId;
    $.get(orderUrl)
        .done(function (data){
            //console.log("Get successfully!",typeof data,data);
            if (typeof data === "object" && data !== null){
                //Create customer info
                let customerInfo = `<table>
                                        <tr>
                                            <td>First name</td>
                                            <td>${data.FirstName}</td>
                                        </tr>
                                        <tr>
                                            <td>Last name</td>
                                            <td>${data.LastName}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>${data.Email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone number</td>
                                            <td>${data.Phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Street address</td>
                                            <td>${data.StreetAddress}</td>
                                        </tr>
                                        <tr>
                                            <td>Zip code</td>
                                            <td>${data.ZipCode}</td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>${data.City}</td>
                                        </tr>
                                        <tr>
                                            <td>Comment</td>
                                            <td>${data.Comment}</td>
                                        </tr>
                                    </table>`;

                //Create customer's order
                let orderTable = $("<table>").addClass("table-list");
                let orderFirstRow = `<tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                     </tr>`;
                orderTable.append(orderFirstRow);

                for (let i in data.OrderItems)
                    orderTable.append(renderAnItem(data.OrderItems[i]));

                //Render whole the order
                dspOrderDetail.append(customerInfo, orderTable);

            }else
                dspOrderDetail.html("<h1>Data not found</h1>");
        })
        .fail(function (error) {console.log("Error found!",error)});
});