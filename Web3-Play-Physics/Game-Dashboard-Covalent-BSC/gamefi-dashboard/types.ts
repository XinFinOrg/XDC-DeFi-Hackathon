import { IconType } from "react-icons";

export interface getKPIData {
    symbol: string,
    title : string,
    value : number,
    total : number,
    icon  : IconType 
}

export interface getActivity {
    id: number,
    price: number,
    status: string
}