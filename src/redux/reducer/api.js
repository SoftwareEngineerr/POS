import { UserData } from "../../hooks/FirstTimeWebSrn/Websrn";


const web = 'http://localhost:4000/';

const initialState = {
    //website api's
    Login:`${web}login`,
    Web:`${web}WebSrn`,

    StudentRegistation: `${web}dashboard/studentReg`,
    TeacherRegistation: `${web}dashboard/teacherReg`,
    Imagelink: `${web}dashboard/createFolder`,
    //Studnets suggestion api
    studentsuggestion: `${web}dashboard/studentsuggestion`,
    teachersuggestion: `${web}dashboard/teachersuggestion`,
    imageServer: `${web}public/`,
    // Customize Rolls
    webroles: `${web}dashboard/webRoles`,
    veiwroles: `${web}dashboard/veiwroles`,
    assignroles: `${web}dashboard/assignroles/`,
    //Private Messages
    privateMessage: `${web}dashboard/privateMessage`,
    veiwMessages: `${web}dashboard/veiwMessages`,
    //Group Messages
    Allmembersmessage: `${web}dashboard/Allmembersmessage`,
    veiwAllmemberMessages: `${web}dashboard/veiwAllmemberMessages`,
    //selected messages
    selectedmessage:`${web}dashboard/selectedmessages`,
    //annnouncmentholidays
    annnouncmentholidays: `${web}dashboard/annnouncmentholidays`,
    //public announcement
    publicannouncemnet: `${web}dashboard/publicannnouncment`,
    addpublicannouncemnet: `${web}dashboard/addpublicannnouncment`,
    switchpublicannouncemnet: `${web}dashboard/switch`,
   
    // expense
    expense: `${web}dashboard/expense`,
    veiwexpense: `${web}dashboard/veiwexpense`,
    //income
    income: `${web}dashboard/income`,
    //showlatefee
    showlatefee: `${web}dashboard/showlatefee`,
    //activation
        // student
    studentactivationshow: `${web}dashboard/activition/student`,
    studentActivitionInsertFee: `${web}dashboard/activition/insertfee`,
    studentActivitionUpdateActiviation: `${web}dashboard/activition/updateActiviation`,
        // teacher 
    teacheractivationshow: `${web}dashboard/activition/teacher`,
    teacherActivitionInsertFee: `${web}dashboard/activition/teacherinsertfee`,
    teacherActivitionUpdateActiviation: `${web}dashboard/activition/teacherupdateActiviation`,

    udpateStudentReg: `${web}dashboard/update/studentreg`,
    udpateTeacherReg: `${web}dashboard/update/teacherReg`,

    //inventory
    addProduct: `${web}dashboard/inventory/add`,
    showProduct: `${web}dashboard/inventory/show`,
    deleteProduct: `${web}dashboard/inventory/delete`,
    eidtProduct: `${web}dashboard/inventory/edit`,


    // Khata
    addKhata: `${web}dashboard/khata/add`,
    showKhata: `${web}dashboard/khata/show`,
    deleteKhata: `${web}dashboard/khata/delete`,
    eidtKhata: `${web}dashboard/khata/edit`,
    khataSuggest : `${web}dashboard/Khata/suggest`,

    ShowPersonData:`${web}dashboard/ShowPersonData`,

    // product Availability
    productshow: `${web}dashboard/Product_Availabe/show`,
    hintProduct:`${web}dashboard/Product/show`,
    productAdd: `${web}dashboard/Product/add`,
    showQuantity: `${web}dashboard/quantity/show`,
    productAvailabilityhints:`${web}dashboard/Product_Availabe_hints/show`,
    product_History: `${web}dashboard/Product_History`,
    all_product_History: `${web}dashboard/All_Product_History`,


    //Bills
    create_Bill: `${web}dashboard/Create_Bill`,
    track_bill: `${web}dashboard/Track_bill`,
    userPay: `${web}dashboard/userPay`,
    track_Bill_Id: `${web}dashboard/Track_Bill_Id`,
    return_Bill: `${web}dashboard/Return_Bill`,

    dashboardTotal: `${web}dashboard/total`

};

const Api = (state = initialState) => {
        return state;
}
export default Api;
