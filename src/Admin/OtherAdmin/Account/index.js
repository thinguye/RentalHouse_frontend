import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import AccountDetail from './AccountDetail';

const tabsContent = [
    {
        content: <AccountDetail/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class Account extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="TÀI KHOẢN"
                    icon="pe-7s-home icon-gradient bg-warm-flame"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    };
}