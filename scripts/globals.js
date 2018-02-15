//Definition for using the object constructor functions
function Product(pId, pName, pPrice, pDescription, pImageUrl) {
    this.productId = pId;
    this.productName = pName;
    this.productPrice = pPrice;
    this.productDescription = pDescription;
    this.productImageUrl = pImageUrl;
}

let objProduct1 = new Product(1,"Samsung 65\" Q7F QLED 4K UHD Smart TV",19890,"TV:n levererar den ljusstarkaste och skarpaste bildkvaliteten så långt. Titta på TV i strålande 4K UHD-kvalitet.","SamsungQE65Q7FAMTXXC.jpg");

let objProduct2 = new Product(2,"Samsung Tvättmaskin WW80J3473KW",3490,"Användarvänlig tvättmaskin med diamanttrumma som tvättar dina kläder skonsamt och effektivt.","WashWW80J3473KW.jpg");

let objProduct3 = new Product(3,"MacBook Air 13.3\" MQD32",10995,"MacBook Air med 13,3\" skärm och femte generation Intel Core i5-processor som levererar kraft som varar hela dagen.","MacAMQD32KSA.jpg");

let objProduct4 = new Product(4,"Electrolux inbyggnadsugn EOP720NV (vit)",9221,"Laga dina favoriträtter med inbyggnadsugnen från Electrolux. Med SteamPlus-funktion kan du laga läcker och hälsosam mat till din familj och dina gäster.","SpisEOP720NV.jpg");

let objProduct5 = new Product(5,"Siemens EQ.3 s100 espressomaskin",3990,"Siemens EQ.3 s100 är en espressomaskin för kaffeälskare. Espressomaskin är utrustad med SensoFlow-system","kaffeTI301209RW.jpg");

let objProduct6 = new Product(6,"Sony Xperia XA2 smartphone dual-SIM (svart)",3490,"Med smarttelefonen Sony Xperia XA2 får du et kraftig kamera for å fånga dine minnen, skarp 5,2\" Full HD-skärm som visar även de minsta detaljerna, överlägsen battertid.","SONXPXA2BK.jpg");

let objProduct7 = new Product(7,"GoPro Karma drone + Hero 6 Black",11390,"GoPro Karma drönare är liten och smidig och låter dig fånga fantastiska bilder och filmer från luften med din GoPro Hero 6 Black.","GOPROKARHE06.jpg");

let objProduct8 = new Product(8,"Sony Alpha A5100 Systemkamera + 16 - 50 mm objektiv",4490,"Systemkameran Sony Alpha A5100 har en kompakt design och kommer med bra autofokus, snabb fotografering och kraftfull sökare vilket ger otrolig bildkvalitet.","DSLTA5100KTI.jpg");

let arrProducts = [objProduct1,objProduct2,objProduct3, objProduct4,objProduct5,objProduct6,objProduct7,objProduct8];
let arrShoppingCart =[];