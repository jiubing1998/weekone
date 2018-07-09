$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                var str = '';
                res.data.data.forEach(function(file) {
                    str += `<dl>
                                <dt><img src="${file.img}" alt=""></dt>
                                <dd>${file.title}</dd>
                            </dl>`
                })
                $('.section').html(str);
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
})