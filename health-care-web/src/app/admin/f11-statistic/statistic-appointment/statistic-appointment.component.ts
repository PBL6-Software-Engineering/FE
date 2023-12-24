import { Component, OnInit } from '@angular/core';
import { StatisticAdminService } from '../../_services/statistic_admin.service';
import { Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-statistic-appointment',
  templateUrl: './statistic-appointment.component.html',
  styleUrls: ['./statistic-appointment.component.css'],
})
export class StatisticAppointmentComponent implements OnInit {
  type = 'appointment';
  chartService: any;
  chartAdvise: any;

  queryService = {
    start_date: '2023-11-17', // "2023-11-20" OR NULL
    end_date: '2023-11-29', // "2023-11-20" OR NULL
    paginate: 5,
    page: 1,
    typesort: 'revenue', // revenue , rating
    sortlatest: true, // true , false
  };

  queryAdvise = {
    start_date: '2023-11-17', // "2023-11-20" OR NULL
    end_date: '2023-11-29', // "2023-11-20" OR NULL
    paginate: 5,
    page: 1,
    typesort: 'revenue', // revenue , rating
    sortlatest: true, // true , false
  };

  dataService: any[] = [];
  dataAdvise: any[] = [];

  dataDrawService: any[] = [];
  dataDrawAdvise: any[] = [];

  constructor(private statisticService: StatisticAdminService) {}

  ngOnInit(): void {
    forkJoin([
      this.statisticService.getStatisticAppointmentService(this.queryService),
      this.statisticService.getStatisticAppointmentAdvise(this.queryAdvise),
    ]).subscribe({
      next: (res) => {
        this.dataService = res[0].data.data;
        this.dataAdvise = res[1].data.data;

        this.dataDrawService = this.dataService.map((item: any) => {
          return {
            label: item.name_service,
            value: item.total_revenue,
          };
        });

        this.dataDrawAdvise = this.dataAdvise.map((item: any) => {
          return {
            label: item.doctor_name,
            value: item.total_revenue,
          };
        });

        this.drawBarChartService();
        this.drawBarChartAdvise();
      },
    });
  }

  drawBarChartService() {
    const labelsIndex = this.dataDrawService.map(
      (item: any, index: any) => index + 1,
    );
    const values = this.dataDrawService.map((item: any) => item.value);
    this.chartService = new Chart('chartService', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labelsIndex,
        datasets: [
          {
            label: 'Doanh thu',
            data: values,
            backgroundColor: '#00AA00',
          },
        ],
      },
      options: {
        aspectRatio: 3,
      },
    });
  }

  drawBarChartAdvise() {
    const labelsIndex = this.dataDrawAdvise.map(
      (item: any, index: any) => index + 1,
    );
    const values = this.dataDrawAdvise.map((item: any) => item.value);
    this.chartAdvise = new Chart('chartAdvise', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labelsIndex,
        datasets: [
          {
            label: 'Doanh thu',
            data: values,
            backgroundColor: '#00AA00',
          },
        ],
      },
      options: {
        aspectRatio: 3,
      },
    });
  }
}
