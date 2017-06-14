$("document").ready(function() {

  $( function() {
    $( "#cityListUL" ).sortable({
      axis: 'y',
      update: function (event, ui) {

          //var data = $(this).sortable('toArray', {attribute: 'itemid'});//, key: 'itemid'});
          var data = $(".list-group").sortable('toArray', {attribute: 'itemid'});//, key: 'itemid'});

          //alert(JSON.stringify(data));

          //console.log("data: " + JSON.parse(data));
          //console.log("ui: " + JSON.parse(ui));
          //POST to server using $.post or $.ajax
          $.ajax({
              //dataType: "json",
              data: {data:data},
              type: 'GET',
              url: '/sort'
          });
      }
    });
    $( "#cityListUL" ).disableSelection();
    
  } );
  
})
