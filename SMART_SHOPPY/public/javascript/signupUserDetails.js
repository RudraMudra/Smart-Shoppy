var signupUserDetails = () =>{
    var userData ={};
    userData.accountId = $("#userAccountId").val();
    userData.accountPwd = $("#password").val();
    userData.mailId = $("#email").val();
    console.log(userData);

    $.ajax({
        url: '/newuser/signup',
        method: 'POST',
        data: userData,
        dataType: 'JSON',
        success : (response) =>{
            console.log(response);
            if(response.status == 'Success'){
                $("#signupResult").html("<span style='color:green;'>" + response.msg + "</span>");
            }else{
                $("#signupResult").html("<span style='color:red;'>" +response.msg + "</span>");
            }
        }, 
        error: (error) =>{
            console.log(error);
        }
    })
}
