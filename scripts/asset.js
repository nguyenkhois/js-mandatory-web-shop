//Create constructors for Product and Review
//Refactored these constructors for API
function Product(pId, pName, pPrice, pDescription, pImageUrl) {
    this.Id = pId;
    this.Name = pName;
    this.Price = pPrice;
    this.Description = pDescription;
    this.Image = pImageUrl;
    this.Reviews = [];
}
function Review(rId, pId, cName,cComment,cRating) {
    this.Id = rId;
    this.ProductID = pId;
    this.Name = cName;
    this.Comment = cComment;
    this.Rating = cRating;
}
