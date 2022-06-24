import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Dropdown Examples

import EditRoomProfile from './EditRoomProfile';

const tabsContent = [
    {
        title: 'Thông tin phòng',
        content: <EditRoomProfile />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class EditRoom extends React.Component {

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
                    heading="CHỈNH SỬA"
                    icon="pe-7s-home icon-gradient bg-sunny-morning"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}