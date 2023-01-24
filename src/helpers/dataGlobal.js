import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { TbBeachOff } from "react-icons/tb";

export const dataNavbar = [
  { name: "Mensajes", linkTo: "/chat", Icon: RiMessengerLine },
  { name: "Vacacionales", linkTo: "/vacations", Icon: TbBeachOff },
  { name: "Nosotros", linkTo: "/about", Icon: AiOutlineInfoCircle },
  { name: "Tienda", linkTo: "/store", Icon: BiStore },
  { name: "Ofertas", linkTo: "/jobOffert", Icon: MdWorkOutline },
];
