import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import ResetPass from './ResetPass';

const tabsContent = [
    {
        content: <ResetPass/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ResetPassword extends React.Component {

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
                    heading="TẠO LẠI MẬT KHẨU"
                    icon="pe-7s-refresh icon-gradient bg-warm-flame"
                />
                <Tabs transform={false}  items={getTabs()}/>
            </Fragment>
        );
    };
}