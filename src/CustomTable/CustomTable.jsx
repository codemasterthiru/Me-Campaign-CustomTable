import React, { useEffect, useState } from "react";
import jsonData from "./data.json";
import "./style.scss";
import { Pagination } from "./Pagination";

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    const loadData = (length) => {
      const res = JSON.parse(JSON.stringify(jsonData));
      return length ? res.slice(0, length) : res;
    };
    setData(loadData());
    setDisplayData(loadData(10));
  }, []);
  const onChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (value !== "") {
      const res = data.filter((i) => i?.name?.toLowerCase().includes(value));
      setData(res);
      setDisplayData(res.slice(0, 10));
    } else {
      const loadData = (length) => {
        const res = JSON.parse(JSON.stringify(jsonData));
        return length ? res.slice(0, length) : res;
      };
      setData(loadData());
      setDisplayData(loadData(10));
    }
  };
  const dataChange = (props) => {
    let maxLength = props * 10,
      minLength = maxLength - 10;
    const newData = data.filter(
      (i, idx) => idx + 1 <= maxLength && idx + 1 > minLength
    );
    setDisplayData(newData);
  };
  const deleteItem = (event) => {
    const id = event.target.id;
    let index = data.findIndex((i) => i._id === id),
      res = data;
    res.splice(index, 1);
    setData(res);
    setDisplayData(res.slice(0, 10));
  };
  return (
    <div className="table-container">
      <input type="text" onChange={onChange} className="search-input" />
      <table className="table">
        <tbody>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Type</th>
            <th>Company</th>
            <th>Action Items</th>
          </tr>
          {displayData.map((row, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.company}</td>
              <td>
                <button id={row._id} onClick={deleteItem}>
                  {"delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination props={data.length} onClick={dataChange} />
    </div>
  );
};

export { CustomTable };
export default { CustomTable };
