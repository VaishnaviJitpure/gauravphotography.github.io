function activate_menu(mid)
{
    $("li#m" + mid).addClass("is-expanded");
}

function IsNumeric(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function IsDecimal(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
}

function IsReadonly(evt) {
    return false;
}

/*OTP js function
*/
$(function()
{
    $("#mobile_no, #otp").val("");
    $("#mobileField").show();
    $("#otpField, #otpLink").hide();
    $("#otp").removeAttr("required");
    $("#submitBtn").val("Request OTP");
});
            
 function send_otp()
{
     login_with_otp(1);
}
function login_with_otp(x=0)
{
    var btxt = $("#submitBtn").val();
    var m_footer = $(".form-actions").html();
    if (btoa(btxt) == btoa("Request OTP")|| x == 1) 
    {
        $.ajax(
        {
            url: "controllers/general.php",
            method : "POST",
            data: {"mobile_no" : $("#mobile_no").val(), "c1e7c5cfd3d06ee8ef28b5c807d50f3b" : btoa("login_with_otp")},
            success : function(response)
            {
                var data=JSON.parse(response); 
                if(response.success==0)
                {
                   alert("somthing went wrong"); 
                }
                else
                {
                    if(x == 1)
                    {
                        $(".form-actions").html(m_footer);
                        $("#otpLink").html('<small>OTP sent. Failed to receive. <a href="javascript:void(0);" onclick="send_otp();">Click to resend</a></small>');
                    }
                    else
                    {
                        $("#mobileField").hide();
                        $("#otpField, #otpLink").show();
                        $("#otp").attr("required", "required");
                        $(".form-actions").html(m_footer);
                        $("#submitBtn").val("Submit OTP");
                    }
                }
            }
        })
    }
    else
    {
        $(".form-actions").html('<i class="fa fa-refresh fa-spin" style="font-size:24px;color:#000;"></i>');
        var mobile_no=$("#mobile_no").val();
        $.ajax(
        {
            url: "controllers/general.php",
            method : "POST",
            data: {"mobile_no" : $("#mobile_no").val(),"otp" : $("#otp").val(), "c1e7c5cfd3d06ee8ef28b5c807d50f3b" : btoa("verify_otp")},
            success : function(data)
            {
                var response = $.parseJSON(data);
                if(response.success == 1)
                {
                    window.location.href = "complete_profile.php?mobile_no="+mobile_no;
                }
                else
                {
                    alert(response.msg);
                }
            }
        })
    }

}