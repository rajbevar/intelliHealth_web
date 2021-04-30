import { Component, OnInit, NgZone } from '@angular/core';

import { SignalRService } from '../../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { NotesService } from 'src/app/services/notes.service';
import { NoteModel } from 'src/app/shared/models/note';
import * as moment from 'moment';
import { ParseModel, Medication, MedicalCondition, Anatomy } from 'src/app/shared/models/parsemodel';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { patient } from 'src/app/shared/models/patientmodel';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common'
import { TextExtractService } from 'src/app/services/textextract.service';
import { MedicationComponent } from '../medication/medication.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MedicationService } from 'src/app/services/medication.service';
import { ProblemsService } from 'src/app/services/problem.service'
import { problemModel } from 'src/app/shared/models/problemmodel';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { MedicationFollowUp, MedFollowUpChartDataModel } from 'src/app/shared/models/medicationmodel';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  options: Options;
  bpChart: Highcharts.Chart;
  data: testdata[];
  model: any = {};
  isNewNotesAdded: boolean = false;
  notes: NoteModel[];
  parsedNotes: NoteModel[];
  medications: Medication[];
  parsedMedications: Medication[];
  parsedMedicalConditions: MedicalCondition[];
  sub: Subscription;
  patientModel: patient;
  patientExternalId: string;
  suggestionMedication: string[];
  showSuggestion: boolean = true;
  patientFollowUp: MedicationFollowUp[];
  chartpatientFollowup: any[];
  suggestionMedications: Medication[];
  problemList: problemModel[];
  showmedication = 'none';
  shownewmedication = 'none';




  constructor(private route: ActivatedRoute, public signalRService: SignalRService, private http: HttpClient,
    private zone: NgZone, public notesService: NotesService,
    private patientService: PatientService,
    private medicationService: MedicationService,
    public datepipe: DatePipe,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
    public textExtractService: TextExtractService,
    private problemsService: ProblemsService) {

  }

  ngOnInit() {
this.ng4LoadingSpinnerService.show();
    this.options = {
      chart: {
        type: "scatter"
      },
      title: { text: 'Medication Chart' },
      xAxis: {
        type: 'datetime',        
        showFirstLabel: true,
        startOnTick: true,
        endOnTick: true,
        tickmarkPlacement: 'on',
        minTickInterval: moment.duration(1, 'day').asMilliseconds(),
        labels:
        {
          "format": "{value:%Y-%m-%d}",
          //rotation: 200
        }

      },
      legend: {
        enabled: false
    },
      credits: {
        enabled: false
      },
      yAxis: [
        {
          categories: ['6 am','8 am','10 am', '12 pm','2 pm', '5 pm', '8 pm', '10 pm'],
          gridLineColor: '#226174',
          min:0,
          max:7,
          tickInterval:1,
          title: {
            text: 'Timing',
            style: {               
              fontSize:'13px',
              fontWeight:'bold'
          }
          },
          labels: {
            style: {
               
                fontSize:'12px'
            }
        }
          //tickInterval: 1
        },

      ],
      tooltip: {
        backgroundColor: '#227799',
        xDateFormat: '%e-%b-%Y',
        formatter: function () {
          var chart = this.series.chart, index = this.y;
          return '<b>' + Highcharts.dateFormat('%e-%b-%Y', this.x) + '</b><br/>' +
            chart.yAxis[0].categories[index] + '<br/>'
            + this.point.name;
        },
        style: {
          color: 'white',
          fontWeight: 'bold'
      }
      },
      plotOptions: {

        scatter: {
          marker: {
            radius: 5,
            fillColor: '#FFF',
            lineWidth: 2,
            lineColor: null,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          }
        },
        series: {
          marker: {
            enabled: true
          }
        }
      },
      series: [
        //   {
        //   data: [
        //     {x: Date.parse('2016-10-20'), y: 2, name:'med1', marker: { fillColor: '#00FF00'} },
        //     {x: Date.parse('2016-10-21'), y: 0, name:'med3', marker: { fillColor: '#FFFFFF'} },
        //     {x: Date.parse('2016-10-22'), y: 3, name:'med2', marker: { fillColor: '#00FF00'} },

        //   ],
        //   type: 'scatter'
        // }
      ]
    };  

    this.patientExternalId = this.route.snapshot.params['id'];
    this.patientService.GetPatient(this.patientExternalId).subscribe(result => {

      this.model.patientModel = result.result;

      let latest_date = this.datepipe.transform(result.result.dateOfBirth, 'MM/dd/yyyy');

      var birthdate = this.datepipe.transform(result.result.dateOfBirth, 'MMM dd,yyyy');
      var timeDiff = Math.abs(Date.now() - new Date(result.result.dateOfBirth).getTime());
      var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.model.patientModel.dateOfBirth = latest_date;
      this.model.patientModel.BirthDate = birthdate;
      this.model.patientModel.Age = age;



    });
    this.textExtractService.GetSuggestionData(this.patientExternalId).subscribe(result => {
      this.suggestionMedication = result.result;
    });
    this.signalRService.startConnection();
    this.signalRService.registerEvents();
    //this.startHttpRequest();
    this.isNewNotesAdded = false;
    this.zone.run(() => {
      this.signalRService.onMessageReceived.subscribe((message) => {

        let element = document.getElementById('divRight')
        element.className = 'control-sidebar control-sidebar-light control-sidebar-open'
        this.ng4LoadingSpinnerService.show();
        this.loadNotes();
        this.loadParsedNotes();
        this.loadMedicationFollowups()
      });
    });
    this.loadNotes();
    this.loadMedications();
    this.loadProblems();
    this.loadParsedNotes();
    this.loadMedicationFollowups();
    this.ng4LoadingSpinnerService.hide();
  }

  selectedUserTab = 1;
  tabs = [
    {
      name: 'Patient details',
      key: 1,
      active: true
    },
    {
      name: 'Conditions',
      key: 2,
      active: false
    },
    {
      name: 'Medications',
      key: 4,
      active: false
    },
    {
      name: 'Notes',
      key: 5,
      active: false
    }
  ];



  NewMedication()
  {

    this.parsedMedicalConditions = [];
    this.parsedMedications = [];
    this.suggestionMedications = [];
    this.shownewmedication = 'block';
  }

  CloseNewMedication()
  {
    this.shownewmedication = 'none';
  }
  loadNotes(): void {
    this.ng4LoadingSpinnerService.show();
    this.zone.run(() => {
      this.notesService.GetNotes(this.patientExternalId).subscribe(result => {
        this.notes = result.result.results;
        this.notes.forEach(note => {
          var dateTime = new Date(note.createDateTime);

          var temp = dateTime.toLocaleString('en-US',{timeZone:'America/New_York'});  
          var dateTime1 = new Date(temp); 
          var t1 = moment(dateTime1).format("DD-MMM-YY hh:mm:ss A");
           note.createDateTime = t1;
        });
        this.ng4LoadingSpinnerService.hide();
      });
    });
  }

  loadParsedNotes(): void {
    this.ng4LoadingSpinnerService.show();
    this.zone.run(() => {
      this.notesService.GetParsedNotes(this.patientExternalId).subscribe(result => {
        this.parsedNotes = result.result.results;
        this.parsedNotes.forEach(note => {
          
          var dateTime = new Date(note.createDateTime);
          var temp = dateTime.toLocaleString('en-US',{timeZone:'America/New_York'});  
          var dateTime1 = new Date(temp); 
          var t1 = moment(dateTime1).format("DD-MMM-YY hh:mm:ss A");
          note.createDateTime = t1;
        });
        this.ng4LoadingSpinnerService.hide();
      });
    });
  }

  loadMedications() {
    this.shownewmedication = 'none';
    this.medicationService.GetMedications(this.patientExternalId).subscribe(result => {

      this.medications = result.result.results;

    });
  }
  checkTakenTime(time: any) {
    let categories= ['6 am','8 am','10 am', '12 pm','2 pm', '5 pm', '8 pm', '10 pm'];
    return categories.indexOf(time)
  }


  // NONE=0,
  // TAKEN=1, 
  // NOTTAKEN = 2,
  // IGNORED = 3,
  checkStatus(status: any) {
    let categories = ["#fff","#00965d","#fff","#d03737"];
    return categories[status];
  }
  loadMedicationFollowups() {
    this.patientFollowUp=[];
    this.chartpatientFollowup=[];
    this.ng4LoadingSpinnerService.show();
    this.medicationService.GetMedicationFollowUp(this.patientExternalId).subscribe(result => {
      this.patientFollowUp = result.result.results;      
      this.patientFollowUp.forEach(followup => {       
        followup.medicationFollowUps.forEach(followupitems => {        

          let temdate = moment(followupitems.takenDate).valueOf();
          let y = this.checkTakenTime(followupitems.takenTime);
          let statusFillColor = this.checkStatus(followupitems.status);
         
          this.chartpatientFollowup.push({x: temdate, y: y,name: followup.name,dosage : followup.doage,marker: { fillColor: statusFillColor }});
          //BPDiaArray.push({ x: temdate, y: 1, name: 'post breakfast' });

        });
        
      });
      this.options.series =[];
      this.options.series.push({
        name: 'FollowUps',
        type: 'scatter',
        data: this.chartpatientFollowup,
        marker: {
          symbol: 'circle'
        }
      });
  
      this.bpChart = Highcharts.chart('BPcontainer', this.options);
      this.ng4LoadingSpinnerService.hide();
    });
  }
  loadProblems() {
    this.problemsService.GetProblems(this.patientExternalId).subscribe(result => {
      this.problemList = result.result.results;
      this.problemList.forEach(note => {
       
        var dateTime = new Date(note.recordedDate);

        var temp = dateTime.toLocaleString('en-US',{timeZone:'America/New_York'});  
        var dateTime1 = new Date(temp); 
        var t1 = moment(dateTime1).format("DD-MMM-YY hh:mm:ss A");
        note.recordedDate = t1;
      });
    });


  }
  hidecontrolbar() {
    let element1 = document.getElementById('divcustom')
    element1.className = 'control-sidebar1 control-sidebar-light'

  }
  showcontrolbar() {
    //let element = document.getElementById('popupwindow');

    let element1 = document.getElementById('divcustom')



    if (element1.classList.contains('control-sidebar-open'))
      element1.className = 'control-sidebar1 control-sidebar-light'
    else
      element1.className = 'control-sidebar1 control-sidebar-light control-sidebar-open'
    
    // if (this.showSuggestion) {
    //   this.showSuggestion = false;
    //   //if (element.style.right === "0px") {
    //   element.className = 'popupwindow closed';
    // }
    // else {
    //   this.showSuggestion = true;
    //   element.className = 'popupwindow open';
    // }


  }
  tabChange(selectedTab) {
    console.log('### tab change');
    this.selectedUserTab = selectedTab.key;
    for (let tab of this.tabs) {
      if (tab.key === selectedTab.key) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
  }

  IgnoreNotes(id: any) {
    this.notesService.ignoreNotes(id).subscribe(result => {
      console.log('Ignored clinical notes');
      this.loadNotes();
      this.loadParsedNotes();
    });
  }

  CloseMedicationPopup() {
    this.showmedication = 'none';
    this.loadNotes();
    this.loadParsedNotes();
  }

  NotesTextChange(event: Event, index: any) {
    this.notes[index].note = (event.target as HTMLInputElement).value;
  }
  ParseNotes(id: any) {
    let that = this;
    let clinicalNotes: string; 
    this.ng4LoadingSpinnerService.show();
    
    this.notesService.updateNotes(id).subscribe(result => {      
      this.notes.forEach(note => {
        if (note.id === id) {
          clinicalNotes = note.note;
        }
      });
      this.textExtractService.GetExtractedData(clinicalNotes, this.patientExternalId).subscribe(data => {

        this.parsedMedicalConditions = data.result.medicalConditions;
        this.parsedMedications = data.result.medications;
        this.suggestionMedications = data.result.suggestedMedications;
        this.parsedMedicalConditions.forEach(condition => {

          if (condition.typeName === "SYMPTOM") {
            condition.isProblem = false;
            condition.isSymptom = true;
          }
          else {
            condition.isProblem = true;
            condition.isSymptom = false;
          }

        });

        this.ng4LoadingSpinnerService.hide();
      });
      // let element = document.getElementById('tblMedication')
      // element.className = 'show table_custom1 table table-hover fsmall'     

    });

    that.showmedication = 'block';
  }
  submitMedicine(medicine: any) {

  }


}


class testdata {
  isActive: boolean
}