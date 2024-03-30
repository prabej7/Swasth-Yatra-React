interface User {
    doctors: []
    eSewaName: string;
    eSewaNo: string;
    email: string;
    fName: string;
    files: string;
    img: string;
    pan: string;
    password: string;
    reg: string;
    type: string;
    username: string;
    __v: number;
    _id: string;
    lat: number;
    lon: number;
    patinets?: [{
        date:string
        doctor:string;
        name:string;
        receipt:string
        __v:number;
        _id:string;
    }],
    appointments?:[]
}

export default User

// interface User {
//     doctors:[]
//     eSewaName:'';
//     eSewaNo:'';
//     email:'';
//     fName:'';
//     files:'';
//     img:'';
//     pan:'';
//     password:'';
//     reg:'';
//     type:'';
//     username:'';
//     __v:0;
//     _id:'';
// }

// const initialState: User =  {
//     doctors:[],
//     eSewaName:'',
//     eSewaNo:'',
//     email:'',
//     fName:'',
//     files:'',
//     img:'',
//     pan:'',
//     password:'',
//     reg:'',
//     type:'',
//     username:'',
//     __v:0,
//     _id:'',
//     lat:0,
//     lon:0
// }