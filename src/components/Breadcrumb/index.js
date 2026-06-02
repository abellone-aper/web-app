import './Breadcrumb.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <i className="ph ph-caret-right breadcrumb-sep"></i>}
            {item.to
              ? <Link to={item.to} className="breadcrumb-link">{item.label}</Link>
              : <span className="breadcrumb-current">{item.label}</span>
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
