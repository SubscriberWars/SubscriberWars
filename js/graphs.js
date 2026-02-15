var twitch_channel_graph = Highcharts.chart({
    chart: {
        renderTo: 'twitch_channel_graph',
        type: 'areaspline',
        accessibilityEnabled: { enabled: false },
        zoomType: 'x',
        backgroundColor: 'transparent',
        plotBorderColor: 'transparent'
    },
    title: { text: '' },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 300,
        gridLineColor: '#f5f5f5',
        labels: { style: { color: '#f5f5f5' } },
        minorGridLineColor: '#transparent',
        tickColor: '#f5f5f5',
        lineColor: '#f5f5f5',
        title: { style: { color: '#transparent' } }
    },
    yAxis: {
        title: { text: '' },
        gridLineColor: '#transparent',
        labels: { enabled: false },
        minorGridLineColor: 'transparent'
    },
    credits: { enabled: false, text: "" },
    plotOptions: { areaspline: { fillOpacity: 0.5 } },
    tooltip: {
        shared: true,
        valueSuffix: '',
        backgroundColor: '#000',
        borderColor: '#9146FF',
        borderWidth: '3px',
        style: {
            color: '#f5f5f5',
            fontSize: '1.5em'
        }
    },
    series: [{
        showInLegend: false,
        name: 'Subscribers',
        marker: { enabled: false },
        lineColor: '#9146FF',
        color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#772CE8'],
                    [1, '#9146FF']
                ]
            },
            lineWidth: 3,
            shadow: {
                color: 'rgba(0,0,0,0.25)',
                width: 1,
                offsetX: 0,
                offsetY: 1
            },
        lineWidth: 4,
        data: [] // Starts empty
    }]
});