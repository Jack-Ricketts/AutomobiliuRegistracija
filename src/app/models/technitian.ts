export interface Technitian{
    id?:String,
    name:String,
    surname:String,
    level:number,
    education:String[],
    address: {city:String,street:String}[]
}
