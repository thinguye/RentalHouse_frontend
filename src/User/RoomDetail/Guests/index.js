import React, { Fragment } from "react";

import Tabs from "react-responsive-tabs";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Dropdown Examples

import Guests from "./Guests";

const tabsContent = [
  {
    title: "Danh sách khách trọ",
    content: <Guests />,
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
    if (sessionStorage.getItem("role") !== "user") {
      if (sessionStorage.getItem("role") === "admin") {
        window.location.href = "/dashboard";
      }
      window.location.href = "/";
    }
    return (
      <Fragment>
        <PageTitle
          heading="KHÁCH TRỌ TRONG PHÒNG"
          icon="pe-7s-users icon-gradient bg-malibu-beach"
        />
        <Tabs
          tabsWrapperClass="body-tabs body-tabs-layout"
          transform={false}
          showInkBar={true}
          items={getTabs()}
        />
      </Fragment>
    );
  }
}
