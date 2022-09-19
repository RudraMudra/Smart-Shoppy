var multiple_product = [];
var mulipleProduct_Template;

var loadMultipleProducts = (product_Type) =>{
    $.ajax({
        url: '/get/multiple/Products?product_Type=' + product_Type,
        method: 'GET',
        data: {},
        dataType: 'JSON',
        success : (data) =>{
            console.log(data);
            // console.log(productId);
            multiple_product = data.multipleProductsList;
            getMultipleProduct();
            console.log(product_Type);
        }
    });
}

var getMultipleProduct = () =>{
    $.ajax({
        url: 'templates/multiplesPage_product.htm',
        method: 'GET',
        success: (template) =>{
            mulipleProduct_Template = Handlebars.compile(template);
            showPage();
        }
    })
}



showPage = () =>{
    for(var i=0; i<multiple_product.length; i++){
        $("#multiples").append(mulipleProduct_Template(multiple_product[i]));
    }
    console.log(multiple_product);
}

