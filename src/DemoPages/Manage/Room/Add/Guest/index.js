import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

// Dropdown Examples

import GuestDetail from './GuestDetail';

const tabsContent = [
    {
        title: 'Chi tiết khách trọ',
        content: <GuestDetail />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class AddGuest extends React.Component {

    render() {

        return (
            <Fragment>
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}