
var checkPincodeDetails = () =>{
    var userPincode = {};
    userPincode.checkAvailability = $("#checkAvailability").val();
    console.log(userPincode);

    $.ajax({
        url: '/check/Availability',
        method: 'POST',
        data: userPincode,
        dataType: 'JSON',
        success : (response) =>{
            console.log(response);
            if(response.status == 'Success'){
                $("#checkResult").html("<span style='color:green;margin-left: 9px;font-weight: 500;font-size: 25px;'>" + response.msg + "</span>");
            }else{
                $("#checkResult").html("<span style='color:red;margin-left: 9px;font-weight: 500;font-size: 25px;'>" + response.msg + "</span>");
            }
        },
    error: (error) =>{
         console.log(error);
        }
    })    
}