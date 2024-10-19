import { useState } from "react";
import { RouteHeader } from "../../../constant/routeAndHeader";

const Menuitems = () =>{
  const [meunitem , setMenuitem] = useState(RouteHeader().router.Menu)
  return [
    ...meunitem
  ];
  
}

export default Menuitems;
