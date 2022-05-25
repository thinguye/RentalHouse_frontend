import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import EditGuestProfile from './EditGuestProfile';
import UpdateRoom from './UpdateRoom';

const tabsContent = [
    {
        title: 'Chỉnh sửa thông tin khách trọ',
        content: <EditGuestProfile />
    },
    {
        title: 'Đổi phòng',
        content: <UpdateRoom />
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class EditGuest extends React.Component {

    render() {

        return (
            <Fragment>
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}