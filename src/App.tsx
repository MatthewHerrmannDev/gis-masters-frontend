import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import QueryOption from './QueryOption';
import './App.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QueryForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

// Return 3 adjacent select menus (property, operator, value)
function QueryForm() {
  // Extract organizationID from URL
  const [searchParameters] = useSearchParams();
  const organizationID = searchParameters.get("organizationID");
  const url = "http://localhost:8080/organizationID/" + organizationID;

  // Fetch query options
  const [queryOptions, setQueryOptions] = useState<QueryOption[]>([]);
  const [type, setType] = useState<string>("");
  useEffect(() => {
     fetch(url)
        .then((response) => response.json())
        .then((data) => {
           setQueryOptions(data);
           setType(data[0].type);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  return (
    <>
      <form>
        <table id="queryTable">
          <thead><tr>
            <th><label htmlFor="propertySelect">Property:</label></th>
            <th><label htmlFor="operatorSelect">Operator:</label></th>
            <th><label htmlFor="valueSelect">Value:</label></th>
          </tr></thead>
          <tbody><tr>
            <td><select id="propertySelect" className="querySelect" onChange={event => {setType(event.target.value)}}>
              {PropertyOptions(queryOptions)}</select></td>
            <td><select id="operatorSelect" className="querySelect">{OperatorOptions(type)}</select></td>
            <td><select id="valueSelect" className="querySelect">{ValueOptions(type)}</select></td>
          </tr></tbody>
        </table>
      </form>
    </>
  )
}

// Return property options
function PropertyOptions(queryOptions: QueryOption[]) {
  return (
    <>
      {queryOptions.map((option) => (
        <option key={option.name} value={option.type}>{option.display_name}</option>
      ))}
    </>
  )
}

// Return numeric or boolean operators depending on property type
function OperatorOptions(type: string) {
  let operators: string[] = []
  const numericOperators = ["==", "!=", "<", ">", "<=", ">="];
  const booleanOperators = ["==", "!="];
  if (type == "numeric") {
    operators = numericOperators;
  } else if (type == "boolean") {
    operators = booleanOperators;
  }

  return (
    <>
      {operators.map((operand) => (
        <option key={operand} value={operand}>{operand}</option>
      ))}
    </>
  )
}

// Return numeric or boolean values depending on property type
function ValueOptions(type: string) {
  let values: string[] = []
  const numericValues: string[] = [];
  for (let i = 0; i <= 20; i++) {
    numericValues.push(i.toString());
  }
  const booleanValues = ["true", "false"];
  if (type == "numeric") {
    values = numericValues;
  } else if (type == "boolean") {
    values = booleanValues;
  }

  return (
    <>
      {values.map((value) => (
        <option key={value} value={value}>{value}</option>
      ))}
    </>
  )
}