"use strict";

(function () {
  let cardColor, headingColor, labelColor, borderColor, legendColor;

  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    headingColor = config.colors_dark.headingColor;
    labelColor = config.colors_dark.textMuted;
    legendColor = config.colors_dark.bodyColor;
    borderColor = config.colors_dark.borderColor;
  } else {
    cardColor = config.colors.cardColor;
    headingColor = config.colors.headingColor;
    labelColor = config.colors.textMuted;
    legendColor = config.colors.bodyColor;
    borderColor = config.colors.borderColor;
  }

  const chartColors = {
    column: {
      series1: "#826af9",
      series2: "#d2b0ff",
      bg: "#f8d3ff",
    },
  };

  const barChartEl = document.querySelector("#chart-laporan"),
    barChartConfig = {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          colors: legendColor,
          useSeriesColors: false,
        },
      },
      colors: ["#2b9bf4", "#ff9f43", "#a8aaae"],
      stroke: {
        show: true,
        colors: ["transparent"],
      },
      grid: {
        borderColor: borderColor,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      series: [
        {
          name: "Jumlah",
          data: [21, 22, 10],
        },
      ],
      xaxis: {
        categories: ["Hoax", "Kerjasama", "Control"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: "13px",
          },
        },
      },
      fill: {
        opacity: 1,
      },
    };

  if (typeof barChartEl !== undefined && barChartEl !== null) {
    const barChart = new ApexCharts(barChartEl, barChartConfig);
    barChart.render();
  }

  $("#btn-print-grafik").on("click", function () {
    var divToPrint = document.getElementById("chart-laporan");
    var newWin = window.open("", "Print-Window");

    newWin.document.open();
    newWin.document.write(
      '<html><body onload="window.print()">' +
        divToPrint.innerHTML +
        "</body></html>"
    );
    newWin.document.close();
  });
})();
