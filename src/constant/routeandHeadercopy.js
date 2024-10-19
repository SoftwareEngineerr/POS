import { Navigate } from "react-router";
import Login from "../veiws/Website/authentication/Login/login";
import Registration from "../veiws/Dashboard/authentication/Registration/registration";
import HomePage from "../veiws/Website/HomePage/HomePage";
import { uniqueId } from "lodash";
import { IconAperture, IconCopy, IconLayoutDashboard,  IconLogin, IconMoodHappy, IconTypography, IconRegistered, IconUserPlus } from '@tabler/icons';
import TechRegistration from "../veiws/Dashboard/authentication/TeacherReg/registration";
import CustomizeRolls from "../veiws/Dashboard/CustomizeRolls/CustomizeRolls";
import StudentAttendance from "../veiws/Dashboard/Attendance/studentAttendance/studentAttendance";
import TeacherAttendance from "../veiws/Dashboard/Attendance/TeacherAttendance/TeacherAttendance";
import Subjects from "../veiws/Dashboard/Subjects/Subjects";
import Fee from "../veiws/Dashboard/collection/Fee/Fee";
import StudentReport from "../veiws/Dashboard/report/Student/Student";
import TeacherReport from "../veiws/Dashboard/report/Teacher/Teacher";
import Salary from "../veiws/Dashboard/collection/salary/salary";
import Expense from "../veiws/Dashboard/Expense/Expense/Expense";
import Student from "../veiws/Dashboard/report/Student/Student";
import { AppRegistration } from "@mui/icons-material";
import Donation from "../veiws/Dashboard/Expense/Donation/Donation";
import Income from "../veiws/Dashboard/Expense/Income/Income";
import Result from "../veiws/Website/Result/Result";
import Shoqa from "../veiws/Dashboard/Shoqa/Shoqa";
import Dashboard from "../veiws/Dashboard/Dashboard/Dashboard";
import MenuProfile from "../veiws/Dashboard/MenuProfile/MenuProfile";
import Contact from "../veiws/Website/Contact/Contact";
import Branch from "../veiws/Website/Branch/Branch";
import { useSelector } from "react-redux";

export const RouteHeaderCopy = () => {
  const userdata = useSelector((state)=>state.Auth.userdata)
    return {router:{
        auth:[
            {path:'/auth/' , element: <Navigate to="/auth/login" /> },
            {path:'/auth/login' , element:<Login />},
            // {path:'/auth/registration', element:<Registration />}
        ],
        SinglePage:[
            {path:'/' , element: <Navigate to="/HomePage" /> },
            {path:'/HomePage' , element: <div id="HomePage"><Contact /></div>},
            {path:'/Result' , element: <div id="Result"><Result /></div>},
            // {path:'/Contact' , element: <div id="Result"><Contact /></div>},
            {path:'/Branch/:BranchId' , element: <div id="Result"><Branch /></div>}
        ],
        Menu:[
            {path:'/Private/' , element: <Navigate to="/Private/Home" /> },
            // {path:'/Private/Home', element: <>Dashboard</>},
            ...(userdata.Dashboard
              ? [
                  {
                    item: true,
                    navlabel: true,
                    subheader: "Home",
                    title: "",
                    icon: "",
                    href: "",
                    path: "",
                    element: "",
                  },
                  {
                    item: true,
                    navlabel: false,
                    subheader: "",
                    title: "Dashboard",
                    icon: IconLayoutDashboard,
                    href: "/Private/Home",
                    path: "/Private/Home",
                    element: <div id="Dashboard"><Dashboard /></div>,
                  },
                ]
              : []),
              // {
              //   item: true,
              //   id: uniqueId(),
              //   title: 'Chat',
              //   icon: IconLayoutDashboard,
              //   href: '/Private/Chat',
              //   path: '/Private/Chat',
              //   element: <div id="Chat">Chat</div>
              // },
              {
                item: true,
                navlabel: true,
                subheader: 'Student',
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Registration',
                icon: AppRegistration,
                href: '/Private/Registration/Student',
                path: '/Private/Registration/Student',
                element: <div id="Registration"><Registration /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Attendance',
                icon: IconCopy,
                href: '/Private/Attendance/Student',
                path: '/Private/Attendance/Student',
                element: <div id="StudentAttendance"><StudentAttendance /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Report',
                icon: IconCopy,
                href: '/Private/Report/Student',
                path: '/Private/Report/Student',
                element: <div id="StudentReport"><StudentReport /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Fee Collection',
                icon: IconCopy,
                href: '/Private/collection/Fee',
                path: '/Private/collection/Fee',
                element: <div id="Fee"><Fee /></div>
              },
              // {
              //   item: true,
              //   id: uniqueId(),
              //   title: 'Salary Collection',
              //   icon: IconCopy,
              //   href: '/Private/collection/Salary',
              //   path: '/Private/collection/Salary',
              //   element: <Salary />
              // },
              {
                item: true,
                navlabel: true,
                subheader: 'Teacher',
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Teacher Report',
                icon: IconCopy,
                href: '/Private/Report/Teacher',
                path: '/Private/Report/Teacher',
                element: <div id="TeacherReport"><TeacherReport /></div>
              },
              // {
              //   item: true,
              //   navlabel: true,
              //   subheader: 'Teacher',
              // },
              {
                item: true,
                id: uniqueId(),
                title: 'Registration',
                icon: IconCopy,
                href: '/Private/Registration/Teacher',
                path: '/Private/Registration/Teacher',
                element: <div id="TechRegistration"><TechRegistration /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Attendance',
                icon: IconCopy,
                href: '/Private/Attendance/Teacher',
                path: '/Private/Attendance/Teacher',
                element: <div id="TeacherAttendance"><TeacherAttendance /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Salary Distribute',
                icon: IconCopy,
                href: '/Private/collection/Salary',
                path: '/Private/collection/Salary',
                element: <div id="Fee"><Fee /></div>
              },
              // {
              //   item: true,
              //   navlabel: true,
              //   subheader: 'Attendance',
              // },
              {
                item: true,
                navlabel: true,
                subheader: 'Managment',
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Create Subjects',
                icon: IconCopy,
                href: '/Private/Subjects',
                path: '/Private/Subjects',
                element: <div id="Subjects"><Subjects /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Customize Rolls',
                icon: IconCopy,
                href: '/Private/Auth/Role',
                path: '/Private/Auth/Role',
                element: <div id="CustomizeRolls"><CustomizeRolls /></div>
              },
              {
                item: true,
                id: uniqueId(),
                title: 'Expense',
                icon: IconCopy,
                href: '/Private/Expense/Expense',
                path: '/Private/Expense/Expense',
                element: <div id="Expense"><Expense /></div>
                },
                {
                  item: true,
                  id: uniqueId(),
                  title: 'Donation',
                  icon: IconCopy,
                  href: '/Private/Expense/Donation',
                  path: '/Private/Expense/Donation',
                  element: <div id="Donation"><Donation /></div>
                  },
                {
                  item: true,
                  id: uniqueId(),
                  title: 'Income',
                  icon: IconCopy,
                  href: '/Private/Expense/Income',
                  path: '/Private/Expense/Income',
                  element: <div id="Income"><Income /></div>
                  },
                {
                  item: true,
                  id: uniqueId(),
                  title: 'Shoqa',
                  icon: IconCopy,
                  href: '/Private/Shoqa',
                  path: '/Private/Shoqa',
                  element: <div id="Shoqa"><Shoqa /></div>
                  },
             //   Profile Menu items
                  {
                    item: true,
                    id: uniqueId(),
                    title: 'My-Profile',
                    icon: IconCopy,
                    // href: '/Private/Shoqa',
                    path: '/Private/My-Profile',
                    element: <div id="Profile"><MenuProfile /></div>
                    },
        ]
    }
}
}