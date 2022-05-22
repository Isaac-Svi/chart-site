var dataGraph = [];
var dataPie = [];

window.onload = function () {
    getRandom(); //Default
};

$(document).ready(function () {
    $('#random-data').click(getRandom); //Getting random data when clicking the button
    $('#server-data').click(function () {
        getServer('http://localhost:1234/config');
    }); //Getting data from server when clicking the button
    $('#local-server-data').click(() =>
        getServer('http://localhost:1234/config2')
    ); //Getting data from server when clicking the button
    $('.chart-pie').click(pieChart); //Showing the Pie Chart
    $('.chart-graph').click(graphChart); //Showing the Graph Chart
    $('.button').hover(
        function () {
            $(this).stop().animate({ opacity: '0.4' }, 'slow');
        },
        function () {
            $(this).stop().animate({ opacity: '1' }, 'slow');
        }
    );
});

function pieChart() {
    CanvasJS.addColorSet('blueshades', ['#186AA5', '#0FA8E2', '#98E3FE']);
    var chart = new CanvasJS.Chart('chartContainer', {
        colorSet: 'blueshades',
        legend: {
            maxWidth: 350,
            itemWidth: 120,
            fontColor: '#186AA5',
            horizontalAlign: 'left',
            verticalAlign: 'center',
            legendMarkerType: 'square',
        },
        toolTip: {
            enabled: false,
        },
        data: [
            {
                type: 'pie',
                showInLegend: true,
                legendText: '{indexLabel}',
                dataPoints: [
                    { y: dataPie[0], indexLabel: 'Data 1' },
                    { y: dataPie[1], indexLabel: 'Data 2' },
                    { y: dataPie[2], indexLabel: 'Data 3' },
                ],
            },
        ],
    });
    chart.render();
    $('.chart-pie').addClass('chart-active').removeClass('chart-nonactive');
    $('.chart-graph').removeClass('chart-active').addClass('chart-nonactive');
}

function graphChart() {
    var chart = new CanvasJS.Chart('chartContainer', {
        axisY: {
            labelFontColor: '#186AA5',
        },
        axisX: {
            labelFontColor: '#186AA5',
        },
        dataPointWidth: 20,
        toolTip: {
            enabled: false,
        },
        data: [
            {
                type: 'column',
                color: '#186AA5',
                dataPoints: [
                    { y: dataGraph[0], label: 'Jan.' },
                    { y: dataGraph[1], label: 'Feb.' },
                    { y: dataGraph[2], label: 'Mar.' },
                    { y: dataGraph[3], label: 'Apr.' },
                    { y: dataGraph[4], label: 'May.' },
                    { y: dataGraph[5], label: 'Jun.' },
                    { y: dataGraph[6], label: 'Jul.' },
                    { y: dataGraph[7], label: 'Aug.' },
                    { y: dataGraph[8], label: 'Sep.' },
                    { y: dataGraph[9], label: 'Oct.' },
                    { y: dataGraph[10], label: 'Nov.' },
                    { y: dataGraph[11], label: 'Dec.' },
                ],
            },
        ],
    });

    chart.render();
    $('.chart-graph').addClass('chart-active').removeClass('chart-nonactive');
    $('.chart-pie').removeClass('chart-active').addClass('chart-nonactive');
}

function getRandom() {
    //Filling the random data for the Graph Chart
    for (let i = 0; i < 12; i++) {
        dataGraph[i] = Math.floor(Math.random() * 100) + 1;
    }
    //Filling the random data for the Pie Chart
    for (let i = 0; i < 3; i++) {
        dataPie[i] = Math.floor(Math.random() * 100) + 1;
    }
    $('.chart-graph').hasClass('chart-active') ? graphChart() : pieChart();
}

function getServer(url) {
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {
            dataGraph = [];
            dataPie = [];
            //Filling the server data for the Graph Chart
            var months = data['bars'];
            for (let key in months) {
                dataGraph.push(months[key]);
            }
            //Filling the server data for the Pie Chart
            var pieData = data['pie'];
            for (let key in pieData) {
                dataPie.push(pieData[key]);
            }
            $('.chart-graph').hasClass('chart-active')
                ? graphChart()
                : pieChart();
        },
    });
}
