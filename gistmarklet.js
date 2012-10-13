var load_gistmarklet = function() {
    $('#landing').hide();
    $('#loading').show();
    var id = location.hash.slice(1);
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
    });
}

var hashchange_func = 
$(document).ready(function() {
    $(window).bind('hashchange', function() {
        if (location.hash == '') {
            $('#landing').show();
            $('#loading').hide();
            $('#gistmarklet').hide();
            document.title = 'GistMarklets';
        } else {
            load_gistmarklet();
        }
    }).trigger('hashchange');
});
