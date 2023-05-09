export type cardPropsTypes ={
    "id":string,
    "jobTitle": string,
    "reqType": string,
    "reqStatus":boolean,
    "orgStructure" : string,
    "Units" : string[],
    "hiringManagers": string[],
    "vacanciesBudget":number,
    "vacanciesOpen":number,
    "vacanciesField":number,
    deleteItem:(id:string)=>void
}