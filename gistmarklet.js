var load_gistmarklet = function() {
    $('#landing').hide();
    $('#loading').show();
    var id = location.hash.slice(1);
    $('#header input').val(id);
    $.getJSON('https://api.github.com/gists/' + id + '?&callback=?',
        function(data) {
            for (var filename in data.data.files) break;
            script = data.data.files[filename].content;
            if (script.slice(0, 11) != 'javascript:')
                script = 'javascript:' + script;
            $('#gistmarklet a')
                .attr('href', script)
                .text(data.data.description)
                .bookmarkletHelperArrow();
            document.title = 'GistMarklets: ' + data.data.description;
            $('#loading').hide();
            $('#gistmarklet').show();
            if (navigator.userAgent.indexOf('Chrome') > 0)
                $('#note').text('You may need to press ctrl+b to show your bookmarks bar');
            else
                $('#note').text('');
    });
}

var hashchange_func = 
$(document).ready(function() {
    $(window).bind('hashchange', function() {
        if (location.hash == '') {
            $('#header input').val('');
            $('#landing').show();
            $('#loading').hide();
            $('#gistmarklet').hide();
            document.title = 'GistMarklets';
            $('#demo a').bookmarkletHelperArrow({pos: 700});
        } else {
            load_gistmarklet();
        }
    }).trigger('hashchange');
    $('#header .button').click(function() {
        location.hash = '#' + $(this).siblings('input').val();
    });
});
