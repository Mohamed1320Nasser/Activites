exports.options = {
    format: "A4",
    orientation: "portrait",
    margin: "10mm",
    header: {
        height: "30mm",
        contents: `
            <div style="text-align: center;">
            <span style="float: left;">
                <span style="font-size: 24px; font-weight: bold; color: #FF6600;">Youth</span><span style="font-size: 24px; font-weight: bold; color: #000;">Welfare</span>
                </span>
                <span style="float: right;">
                    <span style="font-size: 24px; font-weight: bold; color: #FF6600; margin-right: 10px;">Thebes</span><span style="font-size: 24px; font-weight: bold; color: #000;">Academy</span>
                </span>
            </div>
        `,
    },
    footer: {
        height: "20mm",
        contents: {
            default: '<div style="text-align: left; color: #000; font-size: 20px;">Page {{page}} of {{pages}}</div>',
        },
    },
};














