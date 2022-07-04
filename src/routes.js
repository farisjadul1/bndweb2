/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  ListPesanan,
  ListJenis,
  TambahJenis,
  Dashboard,
  EditJenis,
  ListKaos,
  TambahKaos,
  EditKaos,
  Laporan,
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/apparel",
    name: "Apparel",
    icon: "nc-icon nc-bag-16",
    component: ListKaos,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/apparel/tambah",
    name: "Tambah Apparel",
    component: TambahKaos,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/apparel/edit/:id",
    name: "Edit Apparel",
    component: EditKaos,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jenis",
    name: "Jenis Apparel",
    icon: "nc-icon nc-paper",
    component: ListJenis,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/jenis/tambah",
    name: "Tambah Jenis",
    component: TambahJenis,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jenis/edit/:id",
    name: "Edit Jenis",
    component: EditJenis,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/pesanan",
    name: "Transaksi",
    icon: "nc-icon nc-cart-simple",
    component: ListPesanan,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/laporan",
    name: "Laporan Penjualan",
    icon: "nc-icon nc-app",
    component: Laporan,
    layout: "/admin",
    sidebar: true,
  },
  // {
  //   path: "/icon",
  //   name: "Icon",
  //   icon: "nc-icon nc-cart-simple",
  //   component: Icons,
  //   layout: "/admin",
  //   sidebar: true,
  // },
];
export default routes;
