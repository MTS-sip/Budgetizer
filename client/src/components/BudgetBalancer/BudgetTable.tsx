import React from 'react';
import { Table } from 'semantic-ui-react';
import CategorySection from './CategorySection';
import RunningTotal from './RunningTotal';

interface BudgetData {
  [key: string]: number;
}

interface BudgetTableProps {
  budgetData: BudgetData;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ budgetData }) => {
  const categories = Object.keys(budgetData).sort();

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Budget Balancer</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">$</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {categories.map((category) => (
          <CategorySection key={category} category={category} amount={budgetData[category]} />
        ))}
        <RunningTotal budgetData={budgetData} />
      </Table.Body>
    </Table>
  );
};


export default BudgetTable;