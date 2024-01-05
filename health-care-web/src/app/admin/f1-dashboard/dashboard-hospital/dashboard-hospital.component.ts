import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { StatisticAdminService } from '../../_services/statistic_admin.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-hospital',
  templateUrl: './dashboard-hospital.component.html',
  styleUrls: ['./dashboard-hospital.component.css'],
})
export class DashboardHospitalComponent implements OnInit {
  dateFilter: any;
  data: any;
  chartArticleAccept: any;
  chartArticleHideShow: any;
  chartAppointmentByConfirmed: any;
  chartAppointmentByType: any;

  constructor(private statisticService: StatisticAdminService) {}

  ngOnInit(): void {
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
          this.drawChartAppointmentByConfirmed(this.data.work_schedule);
          this.drawChartAppointmentByType(this.data.work_schedule);
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
  drawChartAppointmentByConfirmed(appoinment: any) {
    this.chartAppointmentByConfirmed = new Chart(
      'chartAppointmentByConfirmed',
      {
        type: 'doughnut',

        data: {
          labels: ['Đã xác nhận', 'Chưa xác nhận'],
          datasets: [
            {
              label: 'Phê duyệt lịch hẹn',
              data: [appoinment.confirm, appoinment.all - appoinment.confirm],
              backgroundColor: ['#00CC66', 'orange'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      },
    );
  }
  drawChartAppointmentByType(appoinment: any) {
    this.chartAppointmentByType = new Chart('chartAppointmentByType', {
      type: 'doughnut',

      data: {
        labels: ['Lịch tư vấn', 'Lịch dịch vụ'],
        datasets: [
          {
            label: 'Loại lịch hẹn',
            data: [appoinment.advice, appoinment.service],
            backgroundColor: ['#00CC66', '#00CCFF'],
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
