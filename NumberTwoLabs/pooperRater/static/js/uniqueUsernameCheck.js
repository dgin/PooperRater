function checkUniqueUsername() {
    var anonName = document.getElementById('id_anonymous_name').value;
    $.ajax({
        url: '/api/v1/anon/?search=' + anonName,
        type: 'GET',
        success: function(response) {
            console.log(response);
            var profileisyou = document.getElementById("profileisyou");
            var profilesuccess = document.getElementById("profilesuccess");
            var profilealert = document.getElementById("profilealert");
            var anonNameSubmit = document.getElementById("anonNameSubmit");
            if (response.length > 0) {
                if (response[0].related_user === GlobalUserID) {
                    // Reminds you that this is your username, disallows submit
                    $("#profileisyou").removeClass('hide');
                    $("#profilesuccess").addClass('hide');
                    $("#profilealert").addClass('hide');
                    $("#anonNameSubmit").addClass('disabled');
                } else {
                    // Shows warning, prevents submit
                    $("#profilealert").removeClass('hide');
                    $("#profilesuccess").addClass('hide');
                    $("#profileisyou").addClass('hide');
                    $("#anonNameSubmit").addClass('disabled');
                }
            } else{
                // Shows happiness, allows submit
                $("#profilesuccess").removeClass('hide');
                $("#profilealert").addClass('hide');
                $("#profileisyou").addClass('hide');
                $("#anonNameSubmit").removeClass('disabled');
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    return false;
}