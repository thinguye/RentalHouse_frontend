import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import RepairList from './RepairList';

const tabsContent = [
    {
        title: 'Lịch sử sửa chữa',
        content: <RepairList/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class Repairs extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="LỊCH SỬ SỬA CHỮA"
                    icon="pe-7s-tools icon-gradient bg-love-kiss"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}