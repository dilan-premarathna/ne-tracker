
    var server = "https://23pfmc1uj6.execute-api.ap-south-1.amazonaws.com/prod/";
    var API_key = 'SxI5prqhAOSiBtqsrZdaN2sYM8uLa5iNJg2ydV7e';


    $(document).on('submit','#searchForm', function(e){

        e.preventDefault();
        $('input[type="submit"]').parent().find('.loader').remove();
        $('input[type="submit"]').parent().append('<div class="loader"></div>');
        $('.table-wrapper').html('');

        let activityType = $('#eventName').val();
        let catalogName = $('#catalogName').val();
        let startSearchDate = $('#startSearchDate').val();
        let endSearchDate = $('#endSearchDate').val();

        var settings = {
            "url": server+activityType+"?startDate="+startSearchDate+"&endDate="+endSearchDate+"&catalog="+catalogName+"&api_key="+API_key,
            "method": "GET",
           
        };

        console.log(server+activityType+"?startDate="+startSearchDate+"&endDate="+endSearchDate+"&catalog="+catalogName+"&api_key="+API_key);

        $.ajax(settings).done(function (response) {
            
            if(activityType == 'FLR'){
                flr(response);            
            }else if(activityType == 'SEP'){
                sep(response);            
            }else if(activityType == 'CME'){
                cme(response);            
            }else if(activityType == 'IPS'){
                ips(response);            
            }else if(activityType == 'MPC'){
                mpc(response);            
            }else if(activityType == 'GST'){
                gst(response);            
            }else if(activityType == 'RBE'){
                rbe(response);            
            }else if(activityType == 'HSS'){
                hss(response);            
            }else{
                $('input[type="submit"]').parent().find('.loader').remove();
                $('.table-wrapper').html('To Be Developed...');
            }        
        }).error(function (error) {
            console.log(error);
            $('input[type="submit"]').parent().find('.loader').remove();
            $('.table-wrapper').html(error.statusText+' Please try again.');
        })

        
          
    })



    $(document).on('change','#eventName', function(e){
        let selected = $(this).val();
        if(selected=='FLR'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='SEP'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='CME'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
            $("#catalogName").append($('<option>', { 'JANG_ET_AL_CATALOG' : 'JANG_ET_AL_CATALOG' }).text('JANG_ET_AL_CATALOG'));
            $("#catalogName").append($('<option>', { 'VALIDATION_CATALOG' : 'VALIDATION_CATALOG' }).text('VALIDATION_CATALOG'));
        }
        else if(selected=='IPS'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
            $("#catalogName").append($('<option>', { 'WINSLOW_MESSENGER_ICME_CATALOG' : 'WINSLOW_MESSENGER_ICME_CATALOG' }).text('WINSLOW_MESSENGER_ICME_CATALOG'));
            $("#catalogName").append($('<option>', { 'GRUESBECK_MAVEN_ICME_CATALOG' : 'GRUESBECK_MAVEN_ICME_CATALOG' }).text('GRUESBECK_MAVEN_ICME_CATALOG'));            
        }
        else if(selected=='MPC'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='GST'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='RBE'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
        }
        else if(selected=='HSS'){
            $("#catalogName option").remove();           
            $("#catalogName").append($('<option>', { 'All' : 'ALL' }).text('ALL'));
            $("#catalogName").append($('<option>', { 'M2M_CATALOG' : 'M2M_CATALOG' }).text('M2M_CATALOG'));
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

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Solar Flare</a></td>'
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

    function sep(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="SEP_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">SEP ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Instrument</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        
        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Solar Energetic Particle</a></td>'
                +'<td>'+new Date(value.eventTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
             });
        }

    }

    function cme(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="CME_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'        
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Activity ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Start Time (IST)</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Note</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Instruments</div>'
        +'</th>'
        +'<th data-column="6" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Source Location</div>'
        +'</th>'
        +'<th data-column="7" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Active Region Number</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        
        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Coronal Mass Ejection</a></td>'
                +'<td>'+value.activityID+'</td>'
                +'<td>'+new Date(value.startTime)+'</td>'
                +'<td>'+value.note+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+value.sourceLocation+'</td>'
                +'<td>'+value.activeRegionNum+'</td>'
                +'</tr>');
                
             });
        }

    }

    function ips(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="IPS_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Activity ID</div>'
        +'</th>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Location</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Instrument</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        
        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Interplanetary Shock</a></td>'
                +'<td>'+value.activityID+'</td>'
                +'<td>'+value.location+'</td>'
                +'<td>'+new Date(value.eventTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'</tr>');
                
             });
        }

    }

    function mpc(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="MPC_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">MPC ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Instrument(s)</div>'
        +'</th>'
        +'<th data-column="8" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Linked Event(s)</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        
        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Magnetopause Crossing</a></td>'
                +'<td>'+value.mpcID+'</td>'
                +'<td>'+new Date(value.eventTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
             });
        }

    }

    function gst(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="GST_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">GST ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Start Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Kp Index</div>'
        +'</th>'
        +'<th data-column="8" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Linked Event(s)</div>'
        +'</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody>'
        +'</tbody></table>');

        
        if(response.length==0){

            $('.table-wrapper tbody').append('<td colspan="9" style="text-align: center;padding: 20px;">No data available</td>');

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }     
                
                let allKpIndex = '';
                if(value.allKpIndex){
                    $.each( value.allKpIndex, function( key, value ) {
                        console.log();
                        allKpIndex += value.source+'<br>';
                        allKpIndex += 'Kp: '+value.kpIndex+'<br>';
                        allKpIndex += '('+new Date(value.observedTime)+')';
                    })
                } 

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Geomagnetic Storm</a></td>'
                +'<td>'+value.gstID+'</td>'
                +'<td>'+new Date(value.startTime)+'</td>'
                +'<td>'+allKpIndex+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
             });
        }

    }

    function rbe(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="RBE_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">RBE ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Associated Instrument</div>'
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

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">Radiation Belt Enhancement</a></td>'
                +'<td>'+value.rbeID+'</td>'
                +'<td>'+new Date(value.eventTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
             });
        }

    }

    function hss(response){
        $('input[type="submit"]').parent().find('.loader').remove();

        $('.table-wrapper').html('<table id="HSS_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        +'<thead>'
        +'<tr class="tablesorter-headerRow">'        
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Type</div>'
        +'</th>'
        +'<th data-column="0" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">HSS ID</div>'
        +'</th>'
        +'<th data-column="1" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Event Time (IST)</div>'
        +'</th>'
        +'<th data-column="2" class="tablesorter-header">'
        +'<div class="tablesorter-header-inner">Associated Instrument</div>'
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

        }
        else{
            
             $.each( response, function( key, value ) {
                
                let instruments = '';
                if(value.instruments){
                    $.each( value.instruments, function( key, value ) {
                        instruments += value.displayName+'<br>';
                    })
                }

                let linkedEvents = '';
                if(value.linkedEvents){
                    $.each( value.linkedEvents, function( key, value ) {
                        linkedEvents += value.activityID+'<br>';
                    })
                }                

                $('.table-wrapper tbody').append('<tr>'
                +'<td><a href="'+value.link+'" target="_blank">High Speed Stream</a></td>'
                +'<td>'+value.hssID+'</td>'
                +'<td>'+new Date(value.eventTime)+'</td>'
                +'<td>'+instruments+'</td>'
                +'<td>'+linkedEvents+'</td>'
                +'</tr>');
                
             });
        }

    }
    
