import { MenuItem } from './menu.model';

export class Menus {
    public MENU: MenuItem[] = [
        {
            id: 1,
            label: 'MENUITEMS.MENU.TEXT',
            isTitle: true
        },
        {
            id: 2,
            label: 'MENUITEMS.DASHBOARDS.TEXT',
            icon: 'uil-home-alt',
            link: '/dashboard',
        },
        {
            id: 3,
            label: 'Booking Order',
            isTitle: true
        },
        {
            id: 10,
            label: 'Approval Order',
            icon: 'uil-invoice',
            link: '/approval-order',
        },
        {
            id: 4,
            label: 'Book Order',
            icon: 'uil-invoice',
            link: '/book-order',
        },
        {
            id: 5,
            label: 'MASTERS',
            isTitle: true
        },
        {
            id: 6,
            label: 'Users',
            icon: 'uil-user-circle',
            link: '/administrator/user',
        },
        {
            id: 7,
            label: 'BDM',
            icon: 'uil-users-alt',
            link: '/administrator/bdm',
        },
        {
            id: 8,
            label: 'AM',
            icon: 'uil-user-md',
            link: '/administrator/am',
        },
        {
            id: 10,
            label: 'Approval-Flow',
            icon: 'uil-share-alt',
            link: '/administrator/approval',
        },
        {
            id: 9,
            label: 'Product',
            icon: 'uil-create-dashboard',
            link: '/administrator/product',
        },
        {
            id: 11,
            label: 'Vendor',
            icon: 'uil-user-nurse',
            link: '/administrator/vendor',
        },
        {
            id: 15,
            label: 'Entity',
            icon: 'uil-book-reader',
            link: '/administrator/entity',
        },


        {
            id: 12,
            label: 'Customer',
            icon: 'uil-shutter-alt',
            link: '/administrator/customer',
        },
        {
            id: 13,
            label: 'OEM',
            icon: 'uil-file-plus-alt',
            link: '/administrator/oem',
        },
        // {
        //     id: 14,
        //     label: 'Business Category',
        //     icon: 'uil-user-circle',
        //     link: '/administrator/businesscategory',
        // },
        // {
        //     id: 15,
        //     label: 'MENUITEMS.CHAT.TEXT',
        //     icon: 'uil-comments-alt',
        //     link: '/chat',
        //     badge: {
        //         variant: 'warning',
        //         text: 'MENUITEMS.CHAT.BADGE',
        //     },
        // },
        // {
        //     id: 16,
        //     label: 'MENUITEMS.ECOMMERCE.TEXT',
        //     icon: 'uil-store',
        //     subItems: [
        //         {
        //             id: 8,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTS',
        //             link: '/ecommerce/products',
        //             parentId: 7
        //         },
        //         {
        //             id: 9,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL',
        //             link: '/ecommerce/product-detail/1',
        //             parentId: 7
        //         },
        //         {
        //             id: 10,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.ORDERS',
        //             link: '/ecommerce/orders',
        //             parentId: 7
        //         },
        //         {
        //             id: 11,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
        //             link: '/ecommerce/customers',
        //             parentId: 7
        //         },
        //         {
        //             id: 12,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.CART',
        //             link: '/ecommerce/cart',
        //             parentId: 7
        //         },
        //         {
        //             id: 13,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.CHECKOUT',
        //             link: '/ecommerce/checkout',
        //             parentId: 7
        //         },
        //         {
        //             id: 14,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.SHOPS',
        //             link: '/ecommerce/shops',
        //             parentId: 7
        //         },
        //         {
        //             id: 15,
        //             label: 'MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT',
        //             link: '/ecommerce/add-product',
        //             parentId: 7
        //         },
        //     ]
        // },
        // {
        //     id: 16,
        //     label: 'MENUITEMS.EMAIL.TEXT',
        //     icon: 'uil-envelope',
        //     subItems: [
        //         {
        //             id: 17,
        //             label: 'MENUITEMS.EMAIL.LIST.INBOX',
        //             link: '/email/inbox',
        //             parentId: 16
        //         },
        //         {
        //             id: 18,
        //             label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
        //             link: '/email/read/1',
        //             parentId: 16
        //         }
        //     ]
        // },
        // {
        //     id: 19,
        //     label: 'MENUITEMS.INVOICES.TEXT',
        //     icon: 'uil-invoice',
        //     subItems: [
        //         {
        //             id: 20,
        //             label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
        //             link: '/invoices/list',
        //             parentId: 19
        //         },
        //         {
        //             id: 21,
        //             label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
        //             link: '/invoices/detail',
        //             parentId: 19
        //         },
        //     ]
        // },
        // {
        //     id: 22,
        //     label: 'MENUITEMS.CONTACTS.TEXT',
        //     icon: 'uil-book-alt',
        //     subItems: [
        //         {
        //             id: 23,
        //             label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
        //             link: '/contacts/grid',
        //             parentId: 22
        //         },
        //         {
        //             id: 24,
        //             label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
        //             link: '/contacts/list',
        //             parentId: 22
        //         },
        //         {
        //             id: 25,
        //             label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
        //             link: '/contacts/profile',
        //             parentId: 22
        //         }
        //     ]
        // },
        // {
        //     id: 26,
        //     label: 'MENUITEMS.PAGES.TEXT',
        //     isTitle: true
        // },
        // {
        //     id: 27,
        //     label: 'MENUITEMS.AUTHENTICATION.TEXT',
        //     icon: 'uil-user-circle',
        //     subItems: [
        //         {
        //             id: 28,
        //             label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
        //             link: '/pages/login-1',
        //             parentId: 27
        //         },
        //         {
        //             id: 29,
        //             label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
        //             link: '/pages/register-1',
        //             parentId: 27
        //         },
        //         {
        //             id: 30,
        //             label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
        //             link: '/pages/recoverpwd-1',
        //             parentId: 27
        //         },
        //         {
        //             id: 31,
        //             label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
        //             link: '/pages/lock-screen-1',
        //             parentId: 27
        //         }
        //     ]
        // },
        // {
        //     id: 32,
        //     label: 'MENUITEMS.UTILITY.TEXT',
        //     icon: 'uil-file-alt',
        //     subItems: [
        //         {
        //             id: 34,
        //             label:'MENUITEMS.UTILITY.LIST.STARTER',
        //             link: '/pages/starter',
        //             parentId: 32
        //         },
        //         {
        //             id: 35,
        //             label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
        //             link: '/pages/maintenance',
        //             parentId: 32
        //         },
        //         {
        //             id: 36,
        //             label: 'MENUITEMS.UTILITY.LIST.COMINGSOON',
        //             link: '/pages/comingsoon',
        //             parentId: 32
        //         },
        //         {
        //             id: 37,
        //             label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
        //             link: '/pages/timeline',
        //             parentId: 32
        //         },
        //         {
        //             id: 38,
        //             label: 'MENUITEMS.UTILITY.LIST.FAQS',
        //             link: '/pages/faqs',
        //             parentId: 32
        //         },
        //         {
        //             id: 39,
        //             label: 'MENUITEMS.UTILITY.LIST.PRICING',
        //             link: '/pages/pricing',
        //             parentId: 32
        //         },
        //         {
        //             id: 40,
        //             label: 'MENUITEMS.UTILITY.LIST.ERROR404',
        //             link: '/pages/404',
        //             parentId: 32
        //         },
        //         {
        //             id: 41,
        //             label: 'MENUITEMS.UTILITY.LIST.ERROR500',
        //             link: '/pages/500',
        //             parentId: 32
        //         },
        //     ]
        // },
        // {
        //     id: 42,
        //     label: 'MENUITEMS.COMPONENTS.TEXT',
        //     isTitle: true
        // },
        // {
        //     id: 43,
        //     label: 'MENUITEMS.UIELEMENTS.TEXT',
        //     icon: 'uil-flask',
        //     subItems: [
        //         {
        //             id: 44,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
        //             link: '/ui/alerts',
        //             parentId: 43
        //         },
        //         {
        //             id: 45,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
        //             link: '/ui/buttons',
        //             parentId: 43
        //         },
        //         {
        //             id: 46,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
        //             link: '/ui/cards',
        //             parentId: 43
        //         },
        //         {
        //             id: 47,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
        //             link: '/ui/carousel',
        //             parentId: 43
        //         },
        //         {
        //             id: 48,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
        //             link: '/ui/dropdowns',
        //             parentId: 43
        //         },
        //         {
        //             id: 49,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
        //             link: '/ui/grid',
        //             parentId: 43
        //         },
        //         {
        //             id: 50,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
        //             link: '/ui/images',
        //             parentId: 43
        //         },
        //         {
        //             id: 52,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
        //             link: '/ui/modals',
        //             parentId: 43
        //         },
        //         {
        //             id: 53,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
        //             link: '/ui/rangeslider',
        //             parentId: 43
        //         },
        //         {
        //             id: 55,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
        //             link: '/ui/progressbar',
        //             parentId: 43
        //         },
        //         {
        //             id: 55,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
        //             link: '/ui/placeholder',
        //             parentId: 43
        //         },
        //         {
        //             id: 56,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
        //             link: '/ui/sweet-alert',
        //             parentId: 43
        //         },
        //         {
        //             id: 57,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
        //             link: '/ui/tabs-accordions',
        //             parentId: 43
        //         },
        //         {
        //             id: 58,
        //             label:'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
        //             link: '/ui/typography',
        //             parentId: 43
        //         },
        //         {
        //             id: 59,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
        //             link: '/ui/video',
        //             parentId: 43
        //         },
        //         {
        //             id: 60,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
        //             link: '/ui/general',
        //             parentId: 43
        //         },
        //         {
        //             id: 61,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
        //             link: '/ui/colors',
        //             parentId: 43
        //         },
        //         {
        //             id: 62,
        //             label: 'MENUITEMS.UIELEMENTS.LIST.RATING',
        //             link: '/ui/rating',
        //             parentId: 43
        //         }
        //     ]
        // },
        // {
        //     id: 64,
        //     label: 'MENUITEMS.FORMS.TEXT',
        //     icon: 'uil-shutter-alt',
        //     badge: {
        //         variant: 'primary',
        //         text: '6', //'MENUITEMS.FORMS.BADGE',
        //     },
        //     subItems: [
        //         {
        //             id: 65,
        //             label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
        //             link: '/form/elements',
        //             parentId: 64
        //         },
        //         {
        //             id: 66,
        //             label: 'MENUITEMS.FORMS.LIST.VALIDATION',
        //             link: '/form/validation',
        //             parentId: 64
        //         },
        //         {
        //             id: 67,
        //             label: 'MENUITEMS.FORMS.LIST.ADVANCED',
        //             link: '/form/advanced',
        //             parentId: 64
        //         },
        //         {
        //             id: 68,
        //             label: 'MENUITEMS.FORMS.LIST.EDITOR',
        //             link: '/form/editor',
        //             parentId: 64
        //         },
        //         {
        //             id: 69,
        //             label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
        //             link: '/form/uploads',
        //             parentId: 64
        //         },
        //         {
        //             id: 71,
        //             label: 'MENUITEMS.FORMS.LIST.REPEATER',
        //             link: '/form/repeater',
        //             parentId: 64
        //         },
        //         {
        //             id: 72,
        //             label: 'MENUITEMS.FORMS.LIST.WIZARD',
        //             link: '/form/wizard',
        //             parentId: 64
        //         },
        //         {
        //             id: 73,
        //             label: 'MENUITEMS.FORMS.LIST.MASK',
        //             link: '/form/mask',
        //             parentId: 64
        //         }
        //     ]
        // },
        // {
        //     id: 74,
        //     icon: 'uil-list-ul',
        //     label: 'MENUITEMS.TABLES.TEXT',
        //     subItems: [
        //         {
        //             id: 75,
        //             label: 'MENUITEMS.TABLES.LIST.BASIC',
        //             link: '/tables/basic',
        //             parentId: 74
        //         },
        //         {
        //             id: 76,
        //             label: 'MENUITEMS.TABLES.LIST.ADVANCED',
        //             link: '/tables/datatable',
        //             parentId: 74
        //         }
        //     ]
        // },
        // {
        //     id: 79,
        //     label: 'MENUITEMS.CHARTS.TEXT',
        //     icon: 'uil-chart',
        //     subItems: [
        //         {
        //             id: 80,
        //             label: 'MENUITEMS.CHARTS.LIST.APEX',
        //             link: '/charts/apex',
        //             parentId: 79
        //         },
        //         {
        //             id: 81,
        //             label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
        //             link: '/charts/chartjs',
        //             parentId: 79
        //         },
        //         {
        //             id: 82,
        //             label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
        //             link: '/charts/chartist',
        //             parentId: 79
        //         },
        //         {
        //             id: 83,
        //             label: 'MENUITEMS.CHARTS.LIST.ECHART',
        //             link: '/charts/echart',
        //             parentId: 79
        //         },
        //     ]
        // },
        // {
        //     id: 85,
        //     label: 'MENUITEMS.ICONS.TEXT',
        //     icon: 'uil-streering',
        //     subItems: [
        //         {
        //             id: 86,
        //             label: 'MENUITEMS.ICONS.LIST.UNICONS',
        //             link: '/icons/unicons',
        //             parentId: 85
        //         },
        //         {
        //             id: 87,
        //             label: 'MENUITEMS.ICONS.LIST.BOXICONS',
        //             link: '/icons/boxicons',
        //             parentId: 85
        //         },
        //         {
        //             id: 88,
        //             label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
        //             link: '/icons/materialdesign',
        //             parentId: 85
        //         },
        //         {
        //             id: 89,
        //             label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
        //             link: '/icons/dripicons',
        //             parentId: 85
        //         },
        //         {
        //             id: 90,
        //             label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
        //             link: '/icons/fontawesome',
        //             parentId: 85
        //         },
        //     ]
        // },
        // {
        //     id: 100,
        //     label: 'MENUITEMS.MAPS.TEXT',
        //     icon: 'uil-location-point',
        //     subItems: [
        //         {
        //             id: 101,
        //             label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
        //             link: '/maps/google',
        //             parentId: 100
        //         }
        //     ]
        // },
        // {
        //     id: 104,
        //     label: 'MENUITEMS.MULTILEVEL.TEXT',
        //     icon: 'uil-share-alt',
        //     subItems: [
        //         {
        //             id: 105,
        //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
        //             parentId: 104
        //         },
        //         {
        //             id: 106,
        //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
        //             parentId: 104,
        //             subItems: [
        //                 {
        //                     id: 107,
        //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
        //                     parentId: 106,
        //                 },
        //                 {
        //                     id: 108,
        //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
        //                     parentId: 106,
        //                 }
        //             ]
        //         },
        //     ]
        // }
    ];
    
    public MENU_ADMIN: MenuItem[] = [
        {
            id: 1,
            label: 'MENUITEMS.MENU.TEXT',
            isTitle: true
        },
        {
            id: 2,
            label: 'MENUITEMS.DASHBOARDS.TEXT',
            icon: 'uil-home-alt',
            link: '/dashboard',
        },
        {
            id: 3,
            label: 'Booking Order',
            isTitle: true
        },
        // {
        //     id: 10,
        //     label: 'Approval Order',
        //     icon: 'uil-invoice',
        //     link: '/approval-order',
        // },
        {
            id: 4,
            label: 'Book Order',
            icon: 'uil-invoice',
            link: '/book-order',
        },
        {
            id: 5,
            label: 'MASTERS',
            isTitle: true
        },
        {
            id: 6,
            label: 'Users',
            icon: 'uil-user-circle',
            link: '/administrator/user',
        },
        {
            id: 7,
            label: 'BDM',
            icon: 'uil-users-alt',
            link: '/administrator/bdm',
        },
        {
            id: 8,
            label: 'AM',
            icon: 'uil-user-md',
            link: '/administrator/am',
        },
        {
            id: 10,
            label: 'Approval-Flow',
            icon: 'uil-share-alt',
            link: '/administrator/approval',
        },
        {
            id: 9,
            label: 'Product',
            icon: 'uil-create-dashboard',
            link: '/administrator/product',
        },
        {
            id: 11,
            label: 'Vendor',
            icon: 'uil-user-nurse',
            link: '/administrator/vendor',
        },
        {
            id: 15,
            label: 'Entity',
            icon: 'uil-book-reader',
            link: '/administrator/entity',
        },
        {
            id: 12,
            label: 'Customer',
            icon: 'uil-shutter-alt',
            link: '/administrator/customer',
        },
        {
            id: 13,
            label: 'OEM',
            icon: 'uil-file-plus-alt',
            link: '/administrator/oem',
        },
    ];
    
    public MENU_APPROVAL: MenuItem[] = [
        {
            id: 1,
            label: 'MENUITEMS.MENU.TEXT',
            isTitle: true
        },
        // {
        //     id: 2,
        //     label: 'MENUITEMS.DASHBOARDS.TEXT',
        //     icon: 'uil-home-alt',
        //     link: '/dashboard',
        // },
        // {
        //     id: 3,
        //     label: 'Booking Order',
        //     isTitle: true
        // },
        {
            id: 10,
            label: 'Approval Order',
            icon: 'uil-invoice',
            link: '/approval-order',
           
        },
        

    ];
    
    public MENU_AM: MenuItem[] = [
        {
            id: 1,
            label: 'MENUITEMS.MENU.TEXT',
            isTitle: true
        },
        {
            id: 2,
            label: 'MENUITEMS.DASHBOARDS.TEXT',
            icon: 'uil-home-alt',
            link: '/dashboard',
        },
        {
            id: 3,
            label: 'Booking Order',
            isTitle: true
        },
        {
            id: 4,
            label: 'Book Order',
            icon: 'uil-invoice',
            link: '/book-order',
        },
        // {
        //     id:20,
        //     label: 'Excel',
        //     link: '/excel',
        // },
        // {
        //     id: 11,
        //     label: 'Vendor',
        //     icon: 'uil-user-nurse',
        //     link: '/administrator/vendor',
        // },
        {
            id: 12,
            label: 'Customer',
            icon: 'uil-shutter-alt',
            link: '/administrator/customer',
        },
    ];
    public MENU_BDM: MenuItem[] = [
        {
            id: 1,
            label: 'MENUITEMS.MENU.TEXT',
            isTitle: true
        },
        {
            id: 2,
            label: 'MENUITEMS.DASHBOARDS.TEXT',
            icon: 'uil-home-alt',
            link: '/dashboard',
        },
        {
            id: 3,
            label: 'Booking Order',
            isTitle: true
        },
        {
            id: 4,
            label: 'Book Order',
            icon: 'uil-invoice',
            link: '/book-order',
        },
       
    ];

    public MENU_OPRATIONS: MenuItem[] = [
        // {
        //     id: 1,
        //     label: 'MENUITEMS.MENU.TEXT',
        //     isTitle: true
        // },
        // {
        //     id: 2,
        //     label: 'MENUITEMS.DASHBOARDS.TEXT',
        //     icon: 'uil-home-alt',
        //     link: '/dashboard',
        // },
        // {
        //     id: 3,
        //     label: 'Oprational Order',
        //     isTitle: true
        // },
        {
            id: 4,
            label: 'Operational Order',
            icon: 'uil-invoice',
            link: '/operational',
        },
        {
            id: 4,
            label: 'Payment',
            icon: 'uil-invoice',
            link: '/invoices',
        },
        {
            id: 5,
            label: 'View All Invoices',
            icon: 'uil-invoice',
            link: '/allInvoices',
        },
        {
            id: 11,
            label: 'Vendor',
            icon: 'uil-user-nurse',
            link: '/administrator/vendor',
        },
       
    ];
}




