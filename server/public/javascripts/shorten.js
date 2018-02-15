// send original url for generate the url shortener
$('.btn').on('click', function() {
    $('#result').text('Processing...');
    $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data) {
            var resultHTML = '<strong>Your shorten url is:</strong> <a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
            $('#result').html(resultHTML);
            $('#result').hide().fadeIn('slow');
        }
    }) 
});