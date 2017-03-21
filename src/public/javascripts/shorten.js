$('#btnclick').on('click',() => 
{

    $.ajax({
        url:'/api/shorten',
        type:'POST',
        dataType:'JSON',
        data: {url: $('#url-field').val()},
        success(data)
        {
            const resultHTML = `<a class="result" href="${data.shortUrl}">${data.shortUrl}</a>`;
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');
            console.log('success API shorten ajax');
        },
        error(data)
        {
            console.log('error ajax POST');
        },

    });
    console.log('button is click');
});