import React, { Fragment } from "react";

import Tabs from "react-responsive-tabs";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Dropdown Examples

import RoomProfile from "./RoomProfile";

const tabsContent = [
  {
    title: "Thông tin phòng",
    content: <RoomProfile />,
  },
];

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}

export default class Room extends React.Component {
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
          heading="TRANG CHỦ"
          icon="pe-7s-home icon-gradient bg-sunny-morning"
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
