import React from "react";
import { Table } from "semantic-ui-react";

const TABLE_DATA = [
  {
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    owner: "John Doe",
    status: "in progress",
  },
];

function DashboardTable() {
  return (
    <div className="dashboardTable">
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TABLE_DATA.map((item, i) => (
            <Table.Row>
              <Table.Cell>
                <div>{item.name}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.description}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.owner}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.status}</div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashboardTable;
