import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Voting } from 'src/app/models/Voting';
import { VotingQuestionService } from 'src/app/services/voting-question.service';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  styleUrls: ['./voting-results.component.scss']
})
export class VotingResultsComponent implements OnInit {

  votingID: number;
  voting: Voting = new Voting();
  votingQuestionResults: any[] = [];
  barchartlabels: any[] = [];
  barchartdata: any[] = [];
  piechartlabels: any[] = [];
  piechartdata: any[] = [];
  labels: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private votingService: VotingService,
    private votingQuestionService: VotingQuestionService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  //public pieChartLabels: Label[] = [['Response 1'], ['Response 2'], 'Response 3'];
  //public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Scatter
  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 10 },
        { x: 2, y: 30 },
        { x: 3, y: 5 },
        { x: 4, y: 40 },
        { x: 5, y: 15, r: 20 },
      ],
      label: 'Question 2',
      pointRadius: 10,
    },
  ];

  public scatterChartType: ChartType = 'scatter';

  // Bar 
  public barChartOptions: ChartOptions = {
    responsive: true,
    // This is resolving last missing last bar ????
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  //public barChartLabels: Label[] = ['Response 1', 'Response 2', 'Response 3', 'Response 4', 'Response 5', 'Response 6', 'Response 7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Question 3' }
  // ];


  ngOnInit(): void {
    console.log("In ngOn init");
    this.activatedRoute.params.subscribe(data => {
      if (data['id'])
        this.votingID = data['id'];
      this.votingService.getVotingByID(this.votingID).subscribe(votingData => {
        this.voting = votingData;
        this.votingQuestionResults = new Array(this.voting.votingQuestions.length);
        if (this.voting.votingQuestions && this.voting.votingQuestions.length > 0) {
          for (let i = 0; i < this.voting.votingQuestions.length; i++) {
            this.votingQuestionService.getVotingQuestionResult(this.voting.votingQuestions[i].id).subscribe(result =>
              this.votingQuestionResults[i] = result)
          }
        }

        for (let i = 0; i < this.voting.votingQuestions.length; i++) {
          this.barchartlabels.push('');
          this.piechartlabels.push('');
          this.barchartdata.push([{ data: [], label: '' }]);
          this.piechartdata.push(100);
          this.labels.push('');
        }



        // HERE WE ARE: Have results
        setTimeout(() => {
          this.setLabels();
          this.setData();
        }, 2000)
      })
    })
  }

  setLabels() {

    for (let i = 0; i < this.votingQuestionResults.length; i++) {
      //console.log(this.votingQuestionResults[i]);
      if (this.votingQuestionResults[i].data.votingQuestionTypeID == 1 || this.votingQuestionResults[i].data.votingQuestionTypeID == 2) {
        //console.log(Date.now());
        let resultLabels = [];
        this.votingQuestionResults[i].data.result.forEach(item => {
          //console.log(item['name']);
          resultLabels.push(item['name'])
        });
        //console.log(resultLabels);
        //return resultLabels;
        this.barchartlabels[i] = resultLabels;
        this.piechartlabels[i] = resultLabels;
        this.labels[i] = resultLabels;
        // console.log(this.barchartlabels);
        // console.log(this.piechartlabels);
      }

    }

    // this.labels[2] = ['Response 1', 'Response 2', 'Response 3', 'Response 4', 'Response 5', 'Response 6', 'Response 7'];
    // this.labels[3] = [['Response 1'], ['Response 2'], 'Response 3'];

    console.log(this.labels);
  }

  setData() {
    for (let i = 0; i < this.votingQuestionResults.length; i++) {
      //console.log(this.votingQuestionResults[i]);
      if (this.votingQuestionResults[i].data.votingQuestionTypeID == 2) {
        //console.log(result);
        let resultData = [];
        this.votingQuestionResults[i].data.result.forEach(item => {
          //console.log(item['name']);
          resultData.push(+item['count'])
        });

        // console.log(resultData);

        let data: ChartDataSets[] = [
          { data: resultData, label: this.votingQuestionResults[i].data.votingQuestion }
        ];

        this.barchartdata[i] = data;

        //console.log(barChartData);

        //return barChartData;
      }
      else if (this.votingQuestionResults[i].data.votingQuestionTypeID == 1) {
        //console.log(result);
        let resultData = [];
        this.votingQuestionResults[i].data.result.forEach(item => {
          //console.log(item['name']);
          resultData.push(+item['count'])
        });

        // console.log(resultData);

        let data: SingleDataSet[] = resultData;

        //console.log(pieChartData);

        // return pieChartData;
        this.piechartdata[i] = data;
      }
    

    }

    console.log(this.barchartdata);
    console.log(this.piechartdata);
    // this.barchartdata[2] = [
    //   { data: [65, 59, 80, 81, 56, 55, 40, 20], label: 'Question 3' }
    // ];
    // this.piechartdata[3] = [300, 500, 100, 70];

  }


  // radioResultLabelsMap(result: any[]){
  //   console.log(Date.now());
  //   let resultLabels = [];
  //   result.forEach(item => {
  //     //console.log(item['name']);
  //     resultLabels.push(item['name'])
  //   });
  //   console.log(resultLabels);
  //   //return resultLabels;
  // }

  // barchartResultDataMap(result: any[]){
  //   //console.log(result);
  //   let resultData = [];
  //   result.forEach(item => {
  //     //console.log(item['name']);
  //     resultData.push(+item['count'])
  //   });

  //   // console.log(resultData);

  //   let barChartData: ChartDataSets[] = [
  //     { data: resultData, }
  //   ];

  //   console.log(barChartData);

  //   return barChartData;
  // }

  // piechartResultDataMap(result: any[]){
  //   //console.log(result);
  //   let resultData = [];
  //   result.forEach(item => {
  //     //console.log(item['name']);
  //     resultData.push(+item['count'])
  //   });

  //   // console.log(resultData);

  //   let pieChartData: SingleDataSet[] = resultData;

  //   console.log(pieChartData);

  //   return pieChartData;
  // }

}
