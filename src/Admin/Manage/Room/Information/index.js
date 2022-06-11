import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import Guests from './Guests';
import Bills from './Bills';
import Waters from './Waters';
import Repairs from './Repairs';
import Electrics from './Electrics';

const tabsContent = [
    {
        title: 'Danh sách khách trọ',
        content: <Guests />
    },
    {
        title: 'Tổng hóa đơn hàng tháng',
        content: <Bills />
    },
    {
        title: 'Hóa đơn tiền điện',
        content: <Electrics />
    },
    {
        title: 'Hóa đơn tiền nước',
        content: <Waters />
    },
    {
        title: 'Lịch sử sửa chữa',
        content: <Repairs />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class Room extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="PHÒNG TRỌ"
                    icon="pe-7s-home icon-gradient bg-tempting-azure"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}