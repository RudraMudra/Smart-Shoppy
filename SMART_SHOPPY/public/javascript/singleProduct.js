var singleProduct = [];
var singleTemplate;


var loadSingleProduct = (productId) =>{
    $.ajax({
        url: '/get/SingleProductDescrption?productId=' + productId,
        method: 'GET',
        data: {},
        dataType: 'JSON',
        success: (data) =>{
            console.log(data);
            console.log(productId);
            singleProduct = data.productDescrption;
            getSingleProduct();
            console.log(productId);
            // NewTab();
            // NewTab(){

            // }
        }
    });
}

//  var NewTab = () =>{
//     debugger
//     window.open("/templates/new_SingleDetails.htm", "_blank");
// }

var getSingleProduct = () =>{
    $.ajax({
        url: 'templates/productDescription.htm',
        method: 'GET',
        success: (template) =>{
            // console.log(template);
            singleTemplate = Handlebars.compile(template);
            showSinglePage();
        }
    })
}

showSinglePage = () =>{
    for(var i=0;i<singleProduct.length;i++){
        $("#singleDetailsBlock").append(singleTemplate(singleProduct[i]));
        // console.log(singleTemplate(singleProduct[i]));
    }
    console.log(singleProduct);
    console.log("singleProduct");
}

