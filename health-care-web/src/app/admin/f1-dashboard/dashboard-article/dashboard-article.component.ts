import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StatisticAdminService } from '../../_services/statistic_admin.service';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.css'],
})
export class DashboardArticleComponent implements OnInit {
  numberArticle: any = {
    admin: 0,
    doctor: 0,
    hospital: 0,
  };

  bgColors = [
    'rgba(0, 128, 0, 0.7)',
    'rgba(255, 165, 0, 0.7)',
    'rgba(0, 0, 255, 0.7)',
  ];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ thống kê tài khoản',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };
  lineChartLegend = true;
  // Pie
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ tỉ lệ số lượng tài khoản',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };
  pieCharData: ChartConfiguration<'line'>['data'] = {
    labels: ['Admin', 'Bệnh viện', 'Bác sĩ'],
    datasets: [
      {
        data: [],
        label: 'Thống kê tài khoản',
        backgroundColor: this.bgColors,
      },
    ],
  };
  pieChartLegend = true;

  statisticData: any;
  isLoading = false;
  constructor(
    private api: StatisticAdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getArticleStatistic().subscribe({
      next: ({ data }) => {
        this.statisticData = data;
        this.numberArticle = this.statisticData.total_article;
        this.pieCharData.datasets[0].data = [
          this.numberArticle.admin,
          this.numberArticle.hospital,
          this.numberArticle.doctor,
        ];
        this.drawLineStatisticArticle();
        this.cdr.detectChanges();
        this.isLoading = false;
      },
    });
  }

  drawLineStatisticArticle() {
    const keys = Object.keys(this.statisticData.admin);
    this.lineChartData.labels = keys;

    for (let i = 0; i < 3; i++) {
      this.lineChartData.datasets.push({
        data: [],
        label: '',
        fill: true,
        tension: 0.2,
        borderColor: 'black',
        backgroundColor: this.bgColors[i],
      });
    }

    for (const key of keys) {
      this.lineChartData.datasets[0].data.push(this.statisticData.admin[key]);
      this.lineChartData.datasets[0].label = 'Admin';

      this.lineChartData.datasets[1].data.push(this.statisticData.doctor[key]);
      this.lineChartData.datasets[1].label = 'Bệnh viện';

      this.lineChartData.datasets[2].data.push(
        this.statisticData.hospital[key],
      );
      this.lineChartData.datasets[2].label = 'Bác sĩ';
    }
  }
}
