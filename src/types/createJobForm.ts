export type CreateFormProps={
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setDataCard:React.Dispatch<React.SetStateAction<{
        id: string;
        jobTitle: string;
        reqType: string;
        reqStatus: boolean;
        orgStructure: string;
        Units: string[];
        hiringManagers: string[];
        vacanciesBudget: number;
        vacanciesOpen: number;
        vacanciesField: number;
    }[]>>
}