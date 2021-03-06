import React, { Fragment } from "react";

import Tabs from "react-responsive-tabs";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Dropdown Examples

import RepairsList from "./RepairsList";

const tabsContent = [
  {
    title: "Lịch sử chỉnh sửa",
    content: <RepairsList />,
  },
];

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}

export default class Repairs extends React.Component {
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
          heading="LỊCH SỬ CHỈNH SỬA"
          icon="pe-7s-tools icon-gradient bg-warm-flame"
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
