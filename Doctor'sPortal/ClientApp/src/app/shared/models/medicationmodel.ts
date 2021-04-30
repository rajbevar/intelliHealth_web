import { Medication } from './parsemodel';

export interface MedicationModel {
    ExternalId: string
    medicationEntity: Medication[]

}

export interface Medication {
    Name: string
    Frenquency: string
    Doage: string
    Strength: string
}

export interface MedicationFollowUp {
    id: string
    code: string
    name: string
    frenquency: string
    doage: string
    strength: string
    duration: number
    frenquencyInDay: number
    frequencyTimings: null
    medicationFollowUps: FollowUp[]
}

export interface FollowUp {
    takenDate: string,
    takenTime: string,
    status: number,

}

export interface MedFollowUpChartDataModel {
    date: string,
    name: string,
    dosage: string,
    mode: string,
    time: number
}