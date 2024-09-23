// components/DataTable.js

import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Neutra Text', sans-serif;
`;

const Th = styled.th`
  background-color: #c0e3e5;
  color: #322625;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ebebeb;
  padding: 10px;
`;

const DataTable = ({ data, columns }) => {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={column}>{column}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <Td key={`${index}-${column}`}>{row[column]}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;