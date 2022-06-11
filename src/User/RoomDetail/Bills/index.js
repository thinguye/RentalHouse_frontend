import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Dropdown Examples

import BillsTotal from './BillsTotal';
import ElectricBills from './ElectricBills';
import WaterBills from './WaterBills';
import OtherFee from './OtherFee';

const tabsContent = [
    {
        title: 'Hóa đơn tổng',
        content: <BillsTotal />
    },
    {
        title: 'Hóa đơn điện',
        content: <ElectricBills />
    },
    {
        title: 'Hóa đơn nước',
        content: <WaterBills />
    },
    {
        title: 'Các khoản phí khác',
        content: <OtherFee />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class BillByRoom extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="THÔNG TIN PHÒNG"
                    subheading="Multiple styles, actions and effects are available for the Archited Framework dropdown buttons."
                    icon="pe-7s-pencil icon-gradient bg-sunny-morning"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}