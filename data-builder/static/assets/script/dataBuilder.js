$(function () {
    $('#go').on('click', function () {
        var dataToPost = {
            writeApiLocation: $('#write-api-location').val(),
            jsonToPost: editor.getValue(),
            bearerToken: $('#bearer-token').val()
        };

        $.storage.setItem('code', dataToPost.jsonToPost, 'localStorage');

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

// local storage for bucket url and token
$(function () {
    var bucketName = $.storage.getItem('bucket', 'localStorage'),
        bearerToken = $.storage.getItem('token', 'localStorage'),
        code = $.storage.getItem('code', 'localStorage'),
        write = $('#write-api-location'),
        bearer = $('#bearer-token');
    if (bucketName) {
        write.val(bucketName);
    }
    if (bearerToken) {
        bearer.val(bearerToken);
    }
    if (code) {
        editor.setValue(code);
    }

    write.on('change', function () {
        $.storage.setItem('bucket', write.val(), 'localStorage');
    });

    bearer.on('change', function () {
        $.storage.setItem('token', bearer.val(), 'localStorage');
    });
});
