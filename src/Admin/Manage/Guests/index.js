import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Dropdown Examples

import OldGuests from './OldGuests';
import NewGuests from './NewGuests';

const tabsContent = [
    {
        title: 'Khách hiện tại',
        content: <NewGuests />
    },
    {
        title: 'Khách cũ',
        content: <OldGuests />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class Guests extends React.Component {

    render() {
        if (sessionStorage.getItem("role") !== "admin") {
            if(sessionStorage.getItem("role") === "user") {
              window.location.href ="/room";
            }
            window.location.href = "/";
          }
        return (
            <Fragment>
                <PageTitle
                    heading="KHÁCH TRỌ"
                    icon="pe-7s-user icon-gradient bg-sunny-morning"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}