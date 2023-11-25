import { Component, ElementRef, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import 'src/assets/js/dashboards-analytics';
@Component({
  selector: 'app-f1-dashboard',
  templateUrl: './f1-dashboard.component.html',
  styleUrls: ['./f1-dashboard.component.scss'],
})
export class F1DashboardComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.drawTotalRevenueChart();
    this.drawOrderStatisticsChart();
    this.drawProfileReportChart();
    this.drawGrowthChart();
    this.drawIncomeChart();
  }

  drawTotalRevenueChart(): void {
    const element = this.el.nativeElement.querySelector('#total-revenue-chart');
    if (!element) {
      return;
    }

    const options = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 101, 56, 61, 105],
        },
        {
          name: 'Revenue',
          data: [76, 85, 57, 98, 87, 58],
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: '300px',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['30%'],
          endingShape: 'rounded',
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#000',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#000',
            fontSize: '12px',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: any) {
            return '$' + val + ' thousands';
          },
        },
      },
      colors: ['#5c1ac3', '#e2e6ec'],
      grid: {
        borderColor: '#d9e6fa',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
    new ApexCharts(element, options).render();
  }

  drawOrderStatisticsChart(): void {
    const element = this.el.nativeElement.querySelector(
      '#orderStatisticsChart',
    );
    if (!element) {
      return;
    }
    const options = {
      series: [44, 55, 13, 43],
      chart: {
        width: 300,
        maxWidth: '100%',
        type: 'pie',
      },
      labels: ['Electronic', 'Fashion', 'Decor', 'Sports'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(element, options);
    chart.render();
  }

  drawProfileReportChart(): void {
    const element = this.el.nativeElement.querySelector('#profileReportChart');
    if (!element) {
      return;
    }
    const options = {
      series: [
        {
          name: 'Sales',
          data: [5, 10, 10, 5, 15, 20, 25, 10, 5, 15, 10, 20, 25, 5, 15],
        },
      ],
      chart: {
        height: 250,
        type: 'line',
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
          '1/11/2001',
          '2/11/2001',
          '3/11/2001',
        ],
        tickAmount: 10,
        labels: {
          formatter: function (value: any, timestamp: number, opts: any) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM');
          },
        },
      },
      title: {
        text: 'Profile report',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        min: 0,
        max: 30,
      },
    };

    const chart = new ApexCharts(element, options);
    chart.render();
  }

  drawGrowthChart(): void {
    const element = this.el.nativeElement.querySelector('#growthChart');
    if (!element) {
      return;
    }
    const options = {
      series: [62],
      chart: {
        height: 350,
        maxWidth: '100%',
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val: any) {
                return val + '%';
              },
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ['Tăng trưởng công ty'],
    };

    const chart = new ApexCharts(element, options);
    chart.render();
  }

  drawIncomeChart(): void {
    const element = this.el.nativeElement.querySelector('#incomeChart');
    if (!element) {
      return;
    }
    var options = {
      series: [
        {
          name: 'Năm 2022',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Năm 2023',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    const chart = new ApexCharts(element, options);
    chart.render();
  }
}
