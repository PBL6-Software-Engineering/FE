import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { StatisticAdminService } from '../../_services/statistic_admin.service';

@Component({
  selector: 'app-statistic-doctor',
  templateUrl: './statistic-doctor.component.html',
  styleUrls: ['./statistic-doctor.component.css'],
})
export class StatisticDoctorComponent implements OnInit {
  type = 'doctor';
  top = 5;
  dataDraw: any;
  data: any;
  chart: any;
  labels: any[] = [];
  constructor(private statisticService: StatisticAdminService) {}
  ngOnInit(): void {
    this.statisticService.getStatisticByTop(this.top, this.type).subscribe({
      next: ({ data }) => {
        this.data = data.top_doctors.data;
        this.dataDraw = this.data.map((item: any) => {
          return {
            label: item.name_doctor,
            value: item.search_number_doctor,
          };
        });
        this.drawBarChart();
      },
    });
  }

  drawBarChart() {
    const labelsIndex = this.dataDraw.map((item: any, index: any) => index + 1);
    const values = this.dataDraw.map((item: any) => item.value);
    this.chart = new Chart('chart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labelsIndex,
        datasets: [
          {
            label: 'Số lượt tìm kiếm',
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
