// send original url for generate the url shortener
$('.btn').on('click', function(e) {

    if ( $('#url-field').val() === '' ) {
        e.preventDefault();
    } else {
        $('#result').text('Processing...');
        $.ajax({
            url: '/api/shorten',
            type: 'POST',
            dataType: 'JSON',
            data: {url: $('#url-field').val()},
            success: function(data) {
                var resultHTML = '';

                if (data.error) {
                    resultHTML = '<p class="errorMsg">'+data.result+'</p>';
                } else {
                    resultHTML = '<strong>Your shorten url is:</strong> <a class="result" href="' + data.result + '">'
                + data.result + '</a>';
                }
                
                $('#result').html(resultHTML);
                $('#result').hide().fadeIn('slow');
            }
        }) 
    }

});