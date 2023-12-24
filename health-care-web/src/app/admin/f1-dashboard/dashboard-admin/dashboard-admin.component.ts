import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { StatisticAdminService } from '../../_services/statistic_admin.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  dateFilter: any;
  data: any;
  chartArticleAccept: any;
  chartArticleHideShow: any;
  chartUser: any;

  constructor(private statisticService: StatisticAdminService) {}

  ngOnInit(): void {
    console.log('DashboardHospitalComponent');
    const currentYear = new Date().getFullYear();
    flatpickr('#dateFilter', {
      allowInput: true,
      mode: 'range',
      dateFormat: 'd-m-Y',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
      defaultDate: [currentYear + '-01-01', currentYear + '-12-31'],
    });

    this.getOverview();

    // setInterval(() => {
    //   this.getOverview();
    // }, 30000);
  }

  getOverview() {
    const currentYear = new Date().getFullYear();
    this.statisticService
      .getDashboardOverview({
        fromDate: currentYear + '-01-01',
        toDate: currentYear + '-12-31',
      })
      .subscribe({
        next: ({ data }) => {
          this.data = data;
          this.drawChartArticleAccept(this.data.article);
          this.drawChartArticleHideShow(this.data.article);
          this.drawChartUser(this.data.user);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  drawChartArticleAccept(article: any) {
    this.chartArticleAccept = new Chart('chartArticleAccept', {
      type: 'doughnut',

      data: {
        labels: ['Đã phê duyệt', 'Chờ phê duyệt'],
        datasets: [
          {
            label: 'Phê duyệt bài viết',
            data: [article.accept, article.all - article.accept],
            backgroundColor: ['#00CC66', 'orange'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  drawChartArticleHideShow(article: any) {
    this.chartArticleHideShow = new Chart('chartArticleHideShow', {
      type: 'doughnut',

      data: {
        labels: ['Hiển thị', 'Bị ẩn'],
        datasets: [
          {
            label: 'Ẩn hiện bài viết bài viết',
            data: [article.show, article.all - article.show],
            backgroundColor: ['#00CC66', 'orange'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  drawChartUser(user: any) {
    this.chartUser = new Chart('chartUser', {
      type: 'doughnut',

      data: {
        labels: ['Bình thường', 'Bị khoá'],
        datasets: [
          {
            label: 'Quản lý tài khoản',
            data: [user.accept, user.all - user.accept],
            backgroundColor: ['#00CC66', '#CC0000'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}

