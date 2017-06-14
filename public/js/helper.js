/*$( document ).ready(function() {

    //var el = document.getElementById('cityListUL');
    //var sortable = Sortable.create(el);
    
    

    $(function() {
        $('#city').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "data/city.list.json",
                    dataType: 'json',
                    data: request,
                    success: function( data ) {
                        response( $.map( data, function( item ) {
                            console.log(item.nodes.id);
                            return(item.nodes.id)
                        }));
                    }
                }); 
            },  
            minLength: 0
        });
    });

});*/


/*$(document).ready(function() {
    $('#city').autocomplete(
    {
        source: function(request, response)
        {
            $.getJSON('public/data/city.list.json', { q: request.term }, function(result)
            {
                response($.map(result, function(item) 
                {
                    return item.value;
                }));
            });
        }
    });
});*/
