(function( $ ) {
    var total_bar;
    function diskusage_update(bar){
        var disk = bar.data("disk");
        var endpoint = bar.data("endpoint");

        function set(bar, data){
            var percent = (parseFloat(data.used) / parseFloat(data.total)) * 100;
            bar.css({'width': percent + "%"});
            bar.data("used", data.used);
            bar.data("total", data.total);
            bar.data("free", data.free);
            bar.text(disk + ": " + data.used + "GB / " + data.total + "GB - " + data.free + "GB");
        }
        if(disk != "total"){
            $.get(endpoint + '/' + disk, function(data) {
                set(bar, data);
                diskusage_update(total_bar);
            }).fail(function() {
                console.log("error getting data for " + disk);
            });
        }else{
            var data = {free: 0, used: 0, total: 0};
            $(".progress-bar.disk").not(".total").each(function(){
                var that = $(this)
                data.free += parseFloat(that.data("free"));
                data.used += parseFloat(that.data("used"));
                data.total += parseFloat(that.data("total"));
            });
            set(bar, {
                free: data.free.toFixed(2),
                used: data.used.toFixed(2),
                total: data.total.toFixed(2)
            });
        }
    }
    $.fn.diskusage = function(options) {
        var that = this;
        var settings = $.extend({
            disks: [''],
            interval: 10*1000,
            endpoint: 'http://localhost:4040'
        }, options);
        settings.endpoint = settings.endpoint.replace(/\/$/, "");
        $.each(settings.disks, function(index, disk){
            var bar_container = $('<div>', {'class': 'progress'});
            var bar = $('<div>', {
                'class': 'progress-bar disk ' + disk,
                'role': 'progressbar',
                'aria-valuenow': '0',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
                'data-endpoint': settings.endpoint,
                'data-disk': disk,
                'date-used': '0',
                'date-total': '0',
                'date-free': '0'}
                );
            bar_container.append(bar);
            that.append(bar_container);
            if(disk != 'total'){
                diskusage_update(bar);
                setInterval(function(){diskusage_update(bar, that)}, settings.interval);
            }else
                total_bar = bar;
        });
        return this;
    };
}( jQuery ));
