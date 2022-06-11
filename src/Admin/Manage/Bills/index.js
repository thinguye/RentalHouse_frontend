import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Dropdown Examples

import BillList from './BillList';
import OtherFee from './OtherFee';

const tabsContent = [
    {
        title: 'Hóa đơn',
        content: <BillList />
    },
    {
        title: 'Cập nhật các khoản phí',
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

export default class Bills extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="QUẢN LÝ HÓA ĐƠN"
                    icon="pe-7s-calculator icon-gradient bg-grow-early"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}