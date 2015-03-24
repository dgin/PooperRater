
//activate button for add places
$(".btn-group > .btn").click(function(){
    $(".btn-group > .btn").removeClass("active");
    $(this).addClass("active");
});

$("#submit_anon").on("submit", function(){
    if ("sumbit" == err){
        $(this).toggle("profilealert")
    }
    else {
        $(this).toggle("profilesuccess")
    }
});


