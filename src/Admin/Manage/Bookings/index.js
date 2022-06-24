import React, { Fragment } from "react";

import Tabs from "react-responsive-tabs";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Dropdown Examples

import BookingList from "./BookingList";

const tabsContent = [
  {
    title: "Thông tin đặt phòng",
    content: <BookingList />,
  },
];

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}

export default class Bookings extends React.Component {
  render() {
    if (sessionStorage.getItem("role") !== "admin") {
      if (sessionStorage.getItem("role") === "user") {
        window.location.href = "/room";
      }
      window.location.href = "/";
    }
    return (
      <Fragment>
        <PageTitle
          heading="THÔNG TIN ĐẶT PHÒNG"
          icon="pe-7s-date icon-gradient bg-happy-green"
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
