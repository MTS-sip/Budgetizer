import React from 'react';
import { Table } from 'semantic-ui-react';

// Define the props for the RunningTotal component
interface RunningTotalProps {
  budgetData: {
    [key: string]: number;
  };
}

const RunningTotal: React.FC<RunningTotalProps> = ({ budgetData }) => {
  const total = Object.values(budgetData).reduce((acc, val) => acc + val, 0);

    
  return (
    <Table.Row>
      <Table.Cell><strong>Total</strong></Table.Cell>
      <Table.Cell textAlign="right"><strong>{total.toFixed(2)}</strong></Table.Cell>
    </Table.Row>
  );
};

export default RunningTotal;