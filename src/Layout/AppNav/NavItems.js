export const MainNav = [
    {
        icon: 'pe-7s-rocket',
        label: 'Trang chủ',
        to: '#/dashboards/basic',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-home',
        label: 'Phòng',
        to: '#/manage/rooms',
    },
    {
        icon: 'pe-7s-user',
        label: 'Khách trọ',
        to: '#/manage/guests',

    },
    {
        icon: 'pe-7s-date',
        label: 'Thông tin đặt phòng',
        to: '#/manage/bookings',
    },
    {
        icon: 'pe-7s-tools',
        label: 'Lịch sử sửa chữa',
        to: '#/manage/repairs',
    },
    {
        icon: 'pe-7s-calculator',
        label: 'Quản lý hóa đơn',
        to: '#/manage/bills',
    },
    {
        icon: 'pe-7s-car',
        label: 'Components',
        content: [
            {
                label: 'Icons',
                to: '#/manage/icons',
            },
            {
                label: 'Notifications',
                to: '#/components/notifications',
            },
            {
                label: 'Modals',
                to: '#/components/modals',
            },
            {
                label: 'Progress Bar',
                to: '#/components/progress-bar',
            },
            {
                label: 'Tooltips & Popovers',
                to: '#/components/tooltips-popovers',
            },
            {
                label: 'Carousel',
                to: '#/components/carousel',
            },
            {
                label: 'Maps',
                to: '#/components/maps',
            },
        ],
    },
    {
        icon: 'pe-7s-display2',
        label: 'Regular Tables',
        to: '#/tables/regular-tables',
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '#/forms/controls',
    },
    {
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '#/forms/layouts',
    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '#/forms/validation',
    },
];
export const WidgetsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Dashboard Boxes',
        to: '#/widgets/dashboard-boxes',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '#/charts/chartjs',
    },
];