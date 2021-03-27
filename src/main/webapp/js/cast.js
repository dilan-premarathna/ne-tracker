
    var server = "https://cors-anywhere.herokuapp.com/https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/";


    $(document).on('submit','#searchForm', function(e){

        e.preventDefault();
        $('input[type="submit"]').parent().append('<div class="loader"></div>');
        $('.table-wrapper').html('');

        let activityType = $('#eventName').val();
        let catalogName = $('#catalogName').val();
        let startSearchDate = $('#startSearchDate').val();
        let endSearchDate = $('#endSearchDate').val();

        var settings = {
            "url": server+activityType+"?startDate="+startSearchDate+"&endDate="+endSearchDate+"&catalog="+catalogName,
            "method": "GET",
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
          };

        if(activityType == 'FLR'){
            $.ajax(settings).done(function (response) {flr(response);});
        }else{
            $('input[type="submit"]').parent().find('.loader').remove();
            $('.table-wrapper').html('To Be Developed...');
        }
          
    })



    $(document).on('change','#eventName', function(e){
        let selected = $(this).val();
        if(selected=='FLR'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='SEP'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='CME'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
            $("#catalogName").append($('<option>', { 'JANG_ET_AL_CATALOG' : 'JANG_ET_AL_CATALOG' }).text('JANG_ET_AL_CATALOG'));
            $("#catalogName").append($('<option>', { 'VALIDATION_CATALOG' : 'VALIDATION_CATALOG' }).text('VALIDATION_CATALOG'));
        }
        else if(selected=='IPS'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
            $("#catalogName").append($('<option>', { 'WINSLOW_MESSENGER_ICME_CATALOG' : 'WINSLOW_MESSENGER_ICME_CATALOG' }).text('WINSLOW_MESSENGER_ICME_CATALOG'));
            $("#catalogName").append($('<option>', { 'GRUESBECK_MAVEN_ICME_CATALOG' : 'GRUESBECK_MAVEN_ICME_CATALOG' }).text('GRUESBECK_MAVEN_ICME_CATALOG'));            
        }
        else if(selected=='MPC'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='GST'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='RBE'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='HSS'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='WSAEnlilSimulations'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('--- ALL ---'));
        }


    });



    function flr(response){

        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="FLR_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Start Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Associated Instrument</div>'
        +'</th>'
        +'<th data-column="3" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Peak Time</div>'
        +'</th>'
        +'<th data-column="4" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">End Time</div>'
        +'</th>'
        +'<th data-column="5" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Class</div>'
        +'</th>'
        +'<th data-column="6" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Source Location</div>'
        +'</th>'
        +'<th data-column="7" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Active Region Number</div>'
        +'</th>'
        +'<th data-column="8" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Directly Linked Event(s)</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }else{
            $.each( response, function( key, value ) {
                
                let instruments = '';
                $.each( value.instruments, function( key, value ) {
                    instruments += value.displayName+'<br>';
                })

                let linkedEvents = '';
                $.each( value.linkedEvents, function( key, value ) {
                    linkedEvents += value.activityID+'<br>';
                })

                $('.table-wrapper tbody').append('<tr>'
                +'<td>Solar Flare</td>'
                +'<td>'+new Date(value.beginTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+new Date(value.peakTime)+'</td>'
                +'<td></td>'
                +'<td>'+value.classType+'</td>'
                +'<td>'+value.sourceLocation+'</td>'
                +'<td>'+value.activeRegionNum+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
            });
        }

    }

















    
