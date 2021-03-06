export const MainNav = [
    {
        icon: 'pe-7s-home',
        label: 'Trang chủ',
        to: '/room',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-users',
        label: 'Khách trọ trong phòng',
        to: '/room-details/guests',

    },
    {
        icon: 'pe-7s-calculator',
        label: 'Hóa đơn phòng',
        to: '/room-details/bills',
    },
    {
        icon: 'pe-7s-tools',
        label: 'Lịch sử sửa chữa',
        to: '/room-details/repairs',
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-user',
        label: 'Tài khoản',
        content: [
            {
                label: 'Đổi mật khẩu',
                to: '/account-room',
            },
            {
                label: 'Đăng xuất',
                to: '/home',
            },
        ],
    }
];