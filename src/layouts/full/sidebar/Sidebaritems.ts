export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
      },
    ],
  },
  {
    heading: "MENU",
    children: [
      {
        name: "Lembretes",
        icon: "solar:bell-outline",
        id: uniqueId(),
        url: "/lembretes",
      },
      {
        name: "Produtos",
        icon: "solar:box-outline",
        id: uniqueId(),
        url: "/produtos",
      },
      {
        name: "Serviços",
        icon: "solar:settings-outline",
        id: uniqueId(),
        url: "/servicos",
      },
      {
        name: "Pedidos",
        icon: "solar:clipboard-text-outline",
        id: uniqueId(),
        url: "/pedidos",
      },
    ],
  },
];

export default SidebarContent;
