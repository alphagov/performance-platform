$(function () {
    $('#go').on('click', function () {
        var dataToPost = {
            writeApiLocation: $('#write-api-location').val(),
            jsonToPost: editor.getValue(),
            bearerToken: $('#bearer-token').val()
        };
        $.ajax({
            url: "/post",
            type: "POST",
            data: JSON.stringify(dataToPost),
            contentType: "application/json",
            processData: false,
            success: function () {
                $('#results').append("<p><span class='label label-success'>Post Successful</span></p>")
            },
            error: function (req) {
                console.log(req);
                $('#results').append("<p><span class='label label-warning'>Post Failed</span></p><p>" + req.responseText +"</p>")
            }
        });
    });
});
