import React from "react";

const onClick = (event, onClick) => {
  const text = event.target.innerText;
  onClick(text);
};

const Pagination = (data) => {
  let result = [],
    { props } = data;
  if (props > 0) {
    const tenRem = props % 10;
    const tenDivd = props / 10 + (tenRem > 0 ? 1 : 0);
    for (let i = 0; i < parseInt(tenDivd); i++) {
      result.push(
        <div
          className="page-button"
          onClick={(event) => onClick(event, data.onClick)}
          key={i}
        >
          {i + 1}
        </div>
      );
    }
  }
  return <div className="pagination-container">{result}</div>;
};
export { Pagination };
export default { Pagination };
