exports.options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center; color :orange;font-size:30px">Youth Welfare</div>'
    }, 
    footer: {
        height: "50mm",
        contents: {
            // first: 'Cover page',
            // 2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #09c;">{{page}}</span>/<span style="color: #09c;">{{pages}}</span>', // fallback value
            // last: 'Last Page'
        }
    }
};