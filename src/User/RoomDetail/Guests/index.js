import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Dropdown Examples

import Guests from './Guests';

const tabsContent = [
    {
        title: 'Thông tin phòng',
        content: <Guests />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class GuestByRoom extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="DANH SÁCH KHÁCH TRỌ PHÒNG"
                    subheading="Multiple styles, actions and effects are available for the Archited Framework dropdown buttons."
                    icon="pe-7s-pencil icon-gradient bg-sunny-morning"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}