(function( $ ) {
    function diskusage_update(bar){
        var disk = bar.data("disk");
        var endpoint = bar.data("endpoint");
        $.get(endpoint + '/' + disk, function(data) {
            var percent = (data.used / data.total) * 100;
            bar.css({'width': percent + "%"});
            bar.text(disk + ": " + data.used + "GB / " + data.total + "GB - " + data.free + "GB");
        }).fail(function() {
            console.log("error getting data for " + disk);
        })
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
                'class': 'progress-bar disk',
                'role': 'progressbar',
                'aria-valuenow': '0',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
                'data-endpoint': settings.endpoint,
                'data-disk': disk}
                );
            bar_container.append(bar);
            that.append(bar_container);
            diskusage_update(bar);
            setInterval(function(){diskusage_update(bar)}, settings.interval);
        });
        return this;
    };
}( jQuery ));
