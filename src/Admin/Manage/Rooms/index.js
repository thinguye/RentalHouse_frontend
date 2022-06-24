import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import RoomList from './RoomList';

const tabsContent = [
    {
        title: 'Danh sách phòng',
        content: <RoomList/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class Rooms extends React.Component {

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
                    heading="PHÒNG TRỌ"
                    subheading="Mỗi phòng có giá niêm yết riêng, trên 2 người tính thêm 100.000VNĐ/người"
                    icon="pe-7s-home icon-gradient bg-warm-flame"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}