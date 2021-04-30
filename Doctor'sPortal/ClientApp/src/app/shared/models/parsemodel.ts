export interface ParseModel {
    medications: Medication,
    medicalConditions: MedicalCondition  
    suggestedMedications: Medication 
}

// public bool isBot { get; set; }
// public string Name { get; set; }
// public string Doage { get; set; }
// public string Unit { get; set; }
// public string Duration { get; set; }
// public string DurationUnit { get; set; }


export interface Medication
{
      iteration :number,
      id: number,
      score: number,
      text: string,
      beginOffset: number,
      endOffset: number,
      dosage: string,
      routeOrMode: string,
      frequency: string,
      duration: string,
      form: string,
      rate: string,
      strength: string,
      traits: null,
      type: string,
      category: string,
      durationInNumber:number
}

export interface MedicalCondition
{
    id: number,
      score: number,
      text: string,
      beginOffset: number,
      endOffset: number,
      type: string,
      typeName: string,
      category: string,
      isProblem:boolean,
      isSymptom:boolean,
      isEditable:boolean,
      isSelected:boolean
}

export interface Anatomy
{
      id: number,
      score: number,
      text: string,
      beginOffset: number,
      endOffset: number,
      type: string,  
      category: string
     
}
export interface medicalConditionCreateRequest
{
  MedicalConditions:MedicalCondition[]
  Anatomies:Anatomy[]
}