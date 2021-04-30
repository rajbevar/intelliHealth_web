import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Medication, MedicalCondition, medicalConditionCreateRequest, Anatomy } from 'src/app/shared/models/parsemodel';

declare var jquery: any;
declare var $: any;
import swal from 'sweetalert2';
import { problem } from 'src/app/shared/models/problemmodel';
import { ProblemsService } from 'src/app/services/problem.service';
import { MedicationService } from 'src/app/services/medication.service';
import { MedicationModel } from 'src/app/shared/models/medicationmodel';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit, OnChanges {
  @Input() medicalCondition;
  @Input() medication;
  @Input() patientExternalId;
  @Output() loadNotes = new EventEmitter();
  @Output() loadFollowups = new EventEmitter();
  @Output() loadMedications = new EventEmitter();
  medicationData: Medication[];
  @Input() suggestionMedication:Medication[];
  medicalConditionData: MedicalCondition[];
  finalMedicationCondition: problem[];
  finalMedication: MedicationModel;
  anatomy:Anatomy[];
  _iteration:number=0;
  constructor(private problemsService: ProblemsService,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
    private medicationService: MedicationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ng4LoadingSpinnerService.show();
    for (let property in changes) {
      if (property === 'medicalCondition') {
        if (changes[property].currentValue) {
          this.medicalConditionData = changes[property].currentValue;
        }

      }
      if (property === 'patientExternalId') {
        if (changes[property].currentValue) {
          this.patientExternalId = changes[property].currentValue;
        }

      }



      if (property == "medication") {
        if (changes[property].currentValue) {
          this.medicationData = [];
          this.medicationData = changes[property].currentValue;         

          this.medicationData.forEach(condition => {
            condition.durationInNumber=1;
          });
                  
        }
      }


    }
    this.ng4LoadingSpinnerService.hide();
  }

  OnEditProblem(index: any) {
    this.medicalConditionData[index].isEditable = true;

  }

  onSymptomSelect(index: any) {
    if (this.medicalConditionData[index].isSelected)
      this.medicalConditionData[index].isSelected = false;
    else
      this.medicalConditionData[index].isSelected = true;

  }
  saveSymptoms() {
    this.ng4LoadingSpinnerService.show();
    this.finalMedicationCondition = [];
    this.medicalConditionData.forEach(condition => {
      this.finalMedicationCondition.push({ IsProblem: condition.isProblem, Name: condition.text,category:2 });
    });
    this.problemsService.CreateProblems(this.finalMedicationCondition,this.patientExternalId).subscribe(result => {
      this.anatomy=[];
      let createRequest : medicalConditionCreateRequest ={MedicalConditions:this.medicalConditionData,Anatomies:this.anatomy}        
      this.medicationService.addMedicalConditionToFhir(createRequest, this.patientExternalId).subscribe(result2 => {
        
        this.ng4LoadingSpinnerService.hide();
        swal('Medical Conditions Saved Successfully');
      });      
      
    });
  }

  symptomChanged(event: Event, index: any) {
    this.medicalConditionData[index].text = (event.target as HTMLInputElement).value;
  }

  RemoveSymptom(index: any) {
    this.medicalConditionData.splice(index, 1);
  }
  MedicationNameChanged(event: Event, index: any) {
    this.medicationData[index].text = (event.target as HTMLInputElement).value;
  }
  MedicationFormChanged(event: Event, index: any) {
    this.medicationData[index].form = (event.target as HTMLInputElement).value;
  }
  MedicationDosageChanged(event: Event, index: any) {
    this.medicationData[index].dosage = (event.target as HTMLInputElement).value;
  }
  MedicationDurationChanged(event: Event, index: any) {
    this.medicationData[index].durationInNumber = parseInt((event.target as HTMLInputElement).value);
  
  }
  MedicationFrequencyChanged(event: Event, index: any) {
    this.medicationData[index].frequency = (event.target as HTMLInputElement).value;
  }
  MedicationModeChanged(event: Event, index: any) {
    this.medicationData[index].routeOrMode = (event.target as HTMLInputElement).value;
  }
  AddNewMedication() {    
    this._iteration=this.medicationData.length + 1;
    let newMedication: Medication = {
      beginOffset: 1,
      category: "MEDICATION",
      dosage: null,
      duration: null,
      endOffset: 1,
      form: null,
      frequency: null,
      id: 2,
      rate: null,
      routeOrMode: null,
      score: 2.0,
      strength: null,
      text: "",
      traits: null,
      type: "GENERIC_NAME",
      durationInNumber:1,
      iteration: this._iteration
    };
    this.medicationData.push(newMedication);
  }

  RemoveMedication(index: any) {
    this.medicationData.splice(index, 1);

  }

  AddSuggestionMedication(index: any) {
    this.medicationData.push(this.suggestionMedication[index]);
    this.suggestionMedication.splice(index,1);

  }

  SaveMedication() {
    this.ng4LoadingSpinnerService.show();
    this.finalMedication = { ExternalId: this.patientExternalId, medicationEntity: this.medicationData }
    this.medicationService.createMedication(this.finalMedication).subscribe(result => {

      // this.ng4LoadingSpinnerService.hide();
      // swal('Medication Saved Successfully');
      this.medicationService.addMedicationToFhir(this.medicationData, this.patientExternalId).subscribe(result1 => {
        
        //swal('Medication Saved Successfully');

        this.loadFollowups.emit();

        this.loadMedications.emit();
        this.ng4LoadingSpinnerService.hide();
        // this.anatomy=[];
        // let createRequest : medicalConditionCreateRequest ={MedicalConditions:this.medicalConditionData,Anatomies:this.anatomy}        
        // this.medicationService.addMedicalConditionToFhir(createRequest, this.patientExternalId).subscribe(result2 => {
          
        //   this.ng4LoadingSpinnerService.hide();
        //   swal('Medication Saved Successfully');
        // });
      });
    });
  }

}
