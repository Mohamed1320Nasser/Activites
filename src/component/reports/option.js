exports.options = {
    format: "A4",
    orientation: "portrait",
    margin: "10mm",
    header: {
      height: "30mm",
      contents: '<div style="text-align: center; color: #FF6600; font-size: 40px; font-weight: bold;">Youth Welfare</div>'
    },
    footer: {
      height: "20mm",
      contents: {
        default: '<div style="text-align: left; color: #0000; font-size: 20px;">Page {{page}} of {{pages}}</div>'
      }
    }
  };
  