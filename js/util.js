// date formatter
var Util = (function() {
    function formatDate(date) {
        var dateForFormatting = new Date(date);
        
        var formattedDate =
            (dateForFormatting.getDate() + 1) + "." +
            (dateForFormatting.getMonth() + 1) + "." +
            dateForFormatting.getFullYear() + ".";
        
        return formattedDate;
    }

    return {
        formatDate: formatDate
    }
}) ();
