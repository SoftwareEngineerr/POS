import { Navigate } from "react-router";
import Login from "../veiws/Website/authentication/Login/login";
import HomePage from "../veiws/Website/HomePage/HomePage";
import { uniqueId } from "lodash";
import { IconAperture, IconCopy, IconLayoutDashboard,  IconLogin, IconMoodHappy, IconTypography, IconRegistered, IconUserPlus } from '@tabler/icons';
import TechRegistration from "../veiws/Dashboard/authentication/TeacherReg/registration";
import CustomizeRolls from "../veiws/Dashboard/CustomizeRolls/CustomizeRolls";
import Expense from "../veiws/Dashboard/Expense/Expense/Expense";
import { AddCard, Api, AddAlert, AppRegistration, Assessment, Bloodtype, InstallMobile, CallSplit, DataSaverOn, Dialpad, GradeOutlined, VerifiedUserRounded, StickyNote2Rounded, FlightClassOutlined, Games, Subject, Inventory2Outlined, PersonAddAlt, ProductionQuantityLimits, AttachMoneyOutlined, KeyboardReturnOutlined, HowToReg, HowToRegOutlined, WorkspacePremiumOutlined, GpsFixedOutlined, PaymentOutlined } from "@mui/icons-material";
import Donation from "../veiws/Dashboard/Expense/Donation/Donation";
import Income from "../veiws/Dashboard/Expense/Income/Income";
import Result from "../veiws/Website/Result/Result";
import Dashboard from "../veiws/Dashboard/Dashboard/Dashboard";
import MenuProfile from "../veiws/Dashboard/MenuProfile/MenuProfile";
import Contact from "../veiws/Website/Contact/Contact";
import Branch from "../veiws/Website/Branch/Branch";
import { User_Data, } from "../hooks/Requests/localStroagedata";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import StudentActivation from "../veiws/Dashboard/activation/student";
import { Typography } from "@mui/material";
import Inventory from "../veiws/Dashboard/Inventory";
import Khata from "../veiws/Dashboard/Khata";
import ProductAvailable from "../veiws/Dashboard/Product_Availablity";
import KhataBill from "../veiws/Dashboard/KhataBill/KhataBill";
import ReturnProduct from "../veiws/Dashboard/ReturnProduct/ReturnProduct";
import Cash from "../veiws/Dashboard/Cash/Cash";

// console.log(SelectedData())
export const RouteHeader = () => {
  // const [data , setData] = useState(useSelector((state)=>state.Auth.userdata.roles.StudentReg))
  // console.log(data + 'sami')
 // console.log(User_Data.roles[0])
 let getRolse = User_Data == undefined ? undefined : User_Data.roles[0]  == undefined ? 'empty' : User_Data.roles[0];
  return {
    router:{
        auth:[
            {path:'/auth/' , element: <Navigate to="/auth/login" /> },
            {path:'/auth/login' , element:<Login />},
            // {path:'/auth/registration', element:<Registration />},
           
        ],
        SinglePage:[
            {path:'/' , element: <Navigate to="/HomePage" /> },
            {path:'/HomePage' , element: <div id="HomePage"><Contact /></div>},
            {path:'/Result' , element: <div id="Result"><Result /></div>},
            // {path:'/Contact' , element: <div id="Result"><Contact /></div>},
            {path:'/Branch/:BranchId' , element: <div id="Result"><Branch /></div>},
            {
              item: true,
            id: uniqueId(),
            title: 'My-Profile',
            icon: IconCopy,
            // href: '/Private/Shoqa',
            path: '/*',
            element: <div id="ErrorPage"><ErrorPage /></div>
              
            }
        ],
        Menu:[
          ...(User_Data == undefined  ? [] : User_Data == 'empty' ? [] : [
            {path:'/Private/' , element: <Navigate to="/Private/Home" /> },
            // {path:'/Private/Home', element: <>Dashboard</>},
          
                  {
                    item: true,
                    navlabel: true,
                    subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>Home </Typography><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}></Typography></div>,
                    title: '',
                    icon: '',
                    href: '',
                    path: '',
                    element: ''
                  },
                  {
                    item: true,
                    navlabel: false,
                    subheader: '',
                    title: 'Dashboard',
                    icon: IconLayoutDashboard,
                    href: '/Private/Home',
                    path: '/Private/Home',
                    element: <div id="Dashboard"><Dashboard /></div>
                  },
              ...( getRolse.Inventory != 1
                ? []
                :
                [
                  {
                    item: true,
                    id: uniqueId(),
                    title: <div><span>Inventory </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                    icon: Inventory2Outlined,
                    href: '/Private/Inventory',
                    path: '/Private/Inventory',
                    element: <div id="Inventory"><Inventory /></div>
                  },
                ]
                ),
                ...( getRolse.Khata != 1
                  ? []
                  :
                  [
                    {
                      item: true,
                      id: uniqueId(),
                      title: <div><span>Khata </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                      icon: PersonAddAlt,
                      href: '/Private/Khata',
                      path: '/Private/Khata',
                      element: <div id="Khata"><Khata /></div>
                    },
                  ]
                  ),
                  ...( getRolse.Product_Available != 1
                    ? []
                    :
                    [
                      {
                        item: true,
                        id: uniqueId(),
                        title: <div><span>Product Available </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                        icon: ProductionQuantityLimits,
                        href: '/Private/Product_Available',
                        path: '/Private/Product_Available',
                        element: <div id="Khata"><ProductAvailable /></div>
                      },
                    ]
                    ),
                    ...( getRolse.Khata_Bill != 1
                      ? []
                      :
                      [
                        {
                          item: true,
                          id: uniqueId(),
                          title: <div><span>Khata Bill </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                          icon: AttachMoneyOutlined,
                          href: '/Private/Khata_Bill',
                          path: '/Private/Khata_Bill',
                          element: <div id="Khata"><KhataBill /></div>
                        },
                      ]
                      ),
                      ...( getRolse.Khata_Bill != 1
                        ? []
                        :
                        [
                          {
                            item: true,
                            id: uniqueId(),
                            title: <div><span>Return Product </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                            icon: KeyboardReturnOutlined,
                            href: '/Private/Return_Product',
                            path: '/Private/Return_Product',
                            element: <div id="Khata"><ReturnProduct /></div>
                          },
                        ]
                        ),
                        ...( getRolse.Khata_Bill != 1
                          ? []
                          :
                          [
                            {
                              item: true,
                              id: uniqueId(),
                              title: <div><span>Employee Registration</span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                              icon: HowToRegOutlined,
                              href: '/Private/Employee/Registration',
                              path: '/Private/Employee/Registration',
                              element: <div id="Khata"><TechRegistration /></div>
                            },
                          ]
                          ),
                          ...( getRolse.Khata_Bill != 1
                            ? []
                            :
                            [
                              {
                                item: true,
                                id: uniqueId(),
                                title: <div><span>Cash Bill</span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                                icon: PaymentOutlined,
                                href: '/Private/Cash_bill',
                                path: '/Private/Cash_bill',
                                element: <div id="Khata"><Cash /></div>
                              },
                            ]
                            ),
                            ...( getRolse.Khata_Bill != 1
                              ? []
                              :
                              [
                                {
                                  item: true,
                                  id: uniqueId(),
                                  title: <div><span>Track Bill</span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                                  icon: GpsFixedOutlined,
                                  href: '/Private/Track_Bill',
                                  path: '/Private/Track_Bill',
                                  element: <div id="Khata"><TechRegistration /></div>
                                },
                              ]
                              ),
                    
                  
            
             
            
              ...( getRolse.Class == 1 || getRolse.Admin == 1 || getRolse.Shoqa == 1 ||  getRolse.TeacherActive == 1 || getRolse.Result == 1 || getRolse.StudentStatus == 1 || getRolse.Marif == 1 || getRolse.MobileApp == 1
                ?
                [{
                  item: true,
                  navlabel: true,
                  subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>Managment </Typography><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                }]
                :
                []
                ),
              ...( getRolse.Admin != 1
                ? []
                :
                [{
                item: true,
                id: uniqueId(),
                title: <div><span>Authorities </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>    </Typography></div>,
                icon: WorkspacePremiumOutlined,
                href: '/Private/Auth/Role',
                path: '/Private/Auth/Role',
                element: <div id="CustomizeRolls"><CustomizeRolls /></div>
              }]),
              
    
                  ...( getRolse.Expense == 1 || getRolse.Donation == 1 || getRolse.Income == 1
                    ? 
                    [{
                    item: true,
                    navlabel: true,
                    subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>Finance </Typography><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> </Typography></div>,
                  }]
                  :
                  []
                 
                  ),
                  ...( getRolse.Expense != 1
                    ? []
                    :
                    [{
                    item: true,
                    id: uniqueId(),
                    title: <div><span>Expense </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> لګښت</Typography></div>,
                    icon: CallSplit,
                    href: '/Private/Expense/Expense',
                    path: '/Private/Expense/Expense',
                    element: <div id="Expense"><Expense /></div>
                    }]),
                    // ...( getRolse.Donation != 1
                    //   ? []
                    //   :
                    //   [{
                    //   item: true,
                    //   id: uniqueId(),
                    //   title: <div><span>Donation </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> بسپنه</Typography></div>,
                    //   icon: Bloodtype,
                    //   href: '/Private/Expense/Donation',
                    //   path: '/Private/Expense/Donation',
                    //   element: <div id="Donation"><Donation /></div>
                    //   }]),
                      ...( getRolse.Income != 1
                        ? []
                        :
                        [{
                      item: true,
                      id: uniqueId(),
                      title: <div><span>Income </span><Typography variant="span" sx={{fontSize: '16px',marginLeft: '7px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> عاید</Typography></div>,
                      icon: DataSaverOn,
                      href: '/Private/Expense/Income',
                      path: '/Private/Expense/Income',
                      element: <div id="Income"><Income /></div>
                      }]),
                   {
                    item: true,
                    id: uniqueId(),
                    title: 'My-Profile',
                    icon: IconCopy,
                    // href: '/Private/Shoqa',
                    path: '/Private/My-Profile',
                    element: <div id="Profile"><MenuProfile /></div>
                    },
                    {
                      item: true,
                    id: uniqueId(),
                    title: 'My-Profile',
                    icon: IconCopy,
                    // href: '/Private/Shoqa',
                    path: '/Private/*',
                    element: <div id="ErrorPage"><ErrorPage /></div>
                      
                    }
        ])]
    }
  }
}