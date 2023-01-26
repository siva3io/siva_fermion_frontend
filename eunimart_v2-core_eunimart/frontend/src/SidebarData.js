import React from "react";

export const SidebarData = [
  {
    title: "MDM",
    path: "/products",

    subNav: [
      {
        title: "Products",
        path: "/products",
      },
      {
        title: "Contacts",
        path: "/contacts",
      },
      {
        title: "Locations",
        path: "/locations",
      },
    ],
  },

  {
    title: "Orders",
    path: "/salesOrders",

    subNav: [
      {
        title: "Sales Orders",
        path: "/salesOrders",
      },
      {
        title: "Sales Returns",
        path: "/salesReturns",
      },
      {
        title: "Purchase Orders",
        path: "/purchaseOrders",
      },
      {
        title: "GRN",
        path: "/grn",
      },
      {
        title: "ASN",
        path: "/asn",
      },
      {
        title: "Internal Stock Transfer",
        path: "/ist",
      },
      {
        title: "Delivery Orders",
        path: "/deliveryOrders",
      },
    ],
  },

  {
    title: "Inventory",
    path: "/inventory",

    subNav: [
      {
        title: "Inventory",
        path: "/inventory",
      },
    ],
  },

  {
    title: "Invoicing",
    path: "/invoicing",
    subNav: [
      {
        title: "Invoicing",
        path: "/invoicing",
      },
    ],
  },

  // {
  //   title: "Omnichannel",
  //   path: "/marketplaces",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: "Marketplaces",
  //       path: "/marketplaces",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Retail",
  //       path: "/retail",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Webstores",
  //       path: "/webstores",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },

  // {
  //   title: "Scrapping",
  //   path: "/scrapping",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Scrapping",
  //       path: "/scrapping",
  //       icon: <FaIcons.FaPhone />,
  //     },
  //   ],
  // },
  // {
  //   title: "LocalWarehouse",
  //   path: "/localwarehouse",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: "LocalWarehouse",
  //       path: "/localwarehouse",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  // {
  //   title: "Payment",
  //   path: "/payment",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: "Payment",
  //       path: "/payment",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
];

export const TopBarData = [
  //inner pages

  //products
  {
    title: "Create Product",
    path: "/products/addProduct",
    subNav: [
      {
        title: "Create Product",
        path: "/products/addProduct",
      },
    ],
  },

  {
    title: "MDM  >  PRODUCTS  >  PRODUCT VIEW",
    path: "/products/productView/:id",

    subNav: [
      {
        title: "MDM  >  PRODUCTS  >  PRODUCT VIEW",
        path: "/products/productView/:id",
      },
    ],
  },

  //contacts
  {
    title: "Create Contact",
    path: "/contacts/createContact",

    subNav: [
      {
        title: "Create Contact",
        path: "/contacts/createContact",
      },
    ],
  },

  {
    title: "MDM  >  CONTACTS  >  CONTACT VIEW",
    path: "/contacts/viewContact/:id",

    subNav: [
      {
        title: "MDM  >  CONTACTS  >  CONTACT VIEW",
        path: "/contacts/viewContact/:id",
      },
    ],
  },

  //locations
  {
    title: "Create Location",
    path: "/locations/addLocation",

    subNav: [
      {
        title: "Create Location",
        path: "/locations/addLocation",
      },
    ],
  },

  {
    title: "MDM  >  LOCATIONS  >  LOCATON VIEW",
    path: "/locations/viewLocation",

    subNav: [
      {
        title: "MDM  >  LOCATIONS  >  LOCATON VIEW",
        path: "/locations/viewLocation",
      },
    ],
  },

  //sales orders
  {
    title: "Create Sales Order",
    path: "/salesOrders/create",

    subNav: [
      {
        title: "Create SalesOrder",
        path: "/salesOrders/create",
      },
    ],
  },

  {
    title: "MDM  >  SALSES ORDERS  >  SALES ORDER VIEW",
    path: "/salesOrders/viewSalesOrders/:id",

    subNav: [
      {
        title: "MDM  >  SALSES ORDERS  >  SALES ORDER VIEW",
        path: "/salesOrders/viewSalesOrders/:id",
      },
    ],
  },

  //sales return
  {
    title: "Create Sales Return",
    path: "/salesReturns/create",

    subNav: [
      {
        title: "Create Sales Return",
        path: "/salesReturns/create",
      },
    ],
  },

  {
    title: "MDM  >  SALSES RETURN  >  SALES RETURN VIEW",
    path: "/salesReturns/viewSalesReturns/:id",

    subNav: [
      {
        title: "MDM  >  SALSES RETURN  >  SALES RETURN VIEW",
        path: "/salesReturns/viewSalesReturns/:id",
      },
    ],
  },

  //purchase orders
  {
    title: "Create Purchase Order",
    path: "/purchaseOrders/createPurchaseOrder",

    subNav: [
      {
        title: "Create Purchase Order",
        path: "/purchaseOrders/createPurchaseOrder",
      },
    ],
  },

  {
    title: "MDM  >  PURCHASE ORDER  >  PURCHASE ORDER VIEW",
    path: "/purchaseOrders/purchaseOrderView/:id",

    subNav: [
      {
        title: "MDM  >  PURCHASE ORDER  >  PURCHASE ORDER VIEW",
        path: "/purchaseOrders/purchaseOrderView/:id",
      },
    ],
  },

  //grn
  {
    title: "Create GRN",
    path: "/grn/addGrnr",

    subNav: [
      {
        title: "Create GRN",
        path: "/grn/addGrn",
      },
    ],
  },

  {
    title: "MDM  >  GRN  >  GRN VIEW",
    path: "/grn/viewGrn/:id",

    subNav: [
      {
        title: "MDM  >  GRN  >  GRN VIEW",
        path: "/grn/viewGrn/:id",
      },
    ],
  },

  //asn
  {
    title: "Create ASN",
    path: "/asn/create",

    subNav: [
      {
        title: "Create ASN",
        path: "/asn/create",
      },
    ],
  },

  {
    title: "MDM  >  ASN  >  ASN VIEW",
    path: "/asn/viewAsn/:id",

    subNav: [
      {
        title: "MDM  >  ASN  >  ASN VIEW",
        path: "/asn/viewAsn/:id",
      },
    ],
  },

  //ist
  {
    title: "Create Internal Stock Transfer",
    path: "/ist/createIst",

    subNav: [
      {
        title: "Create Internal Stock Transfer",
        path: "/ist/createIstn",
      },
    ],
  },

  {
    title: "MDM  >  INTERNAL STOCK TRANSFER  >  IST VIEW",
    path: "/ist/istView",

    subNav: [
      {
        title: "MDM  >  INTERNAL STOCK TRANSFER  >  IST VIEW",
        path: "/ist/istView",
      },
    ],
  },

  //inventory
  // {
  //   title: "Create Internal Stock Transfer",
  //   path: "/ist/createIst",
  //   icon: <></>,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Create Internal Stock Transfer",
  //       path: "/ist/createIstn",
  //       icon: <></>,
  //     },
  //   ],
  // },

  // {
  //   title: "MDM  >  INTERNAL STOCK TRANSFER  >  IST VIEW",
  //   path: "/ist/istView",
  //   icon: <></>,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "MDM  >  INTERNAL STOCK TRANSFER  >  IST VIEW",
  //       path: "/ist/istView",
  //       icon: <></>,
  //     },
  //   ],
  // },

  //invoicing
  {
    title: "Create Invoicing",
    path: "/invoicing/addInvoicing",

    subNav: [
      {
        title: "Create Invoicing",
        path: "/invoicing/addInvoicing",
      },
    ],
  },

  {
    title: "MDM  >  INVOICING  >  INVOICE VIEW",
    path: "/invoicing/invoicingView/:id",

    subNav: [
      {
        title: "MDM  >  INVOICING  >  INVOICE VIEW",
        path: "/invoicing/invoicingView/:id",
      },
    ],
  },

  //do
  // {
  //   title: "Delivery Order Process",
  //   path: "/deliveryOrders/DeliveryProcess",
  //   icon: <></>,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Delivery Order Process",
  //       path: "/deliveryOrders/DeliveryProcess",
  //       icon: <></>,
  //     },
  //   ],
  // },
  {
    title: "Delivery Order Process",
    path: "/deliveryOrders/DeliveryProcess",

    subNav: [
      {
        title: "Delivery Order Process",
        path: "/deliveryOrders/DeliveryProcess",
      },
    ],
  },

  {
    title: "MDM  >  DELIVERY ORDERS  >  DELIVERY ORDER VIEW",
    path: "/deliveryOrders/DeliveryView/:id",

    subNav: [
      {
        title: "MDM  >  DELIVERY ORDERS  >  DELIVERY ORDER VIEW",
        path: "/deliveryOrders/DeliveryView/:id",
      },
    ],
  },
];
/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/
