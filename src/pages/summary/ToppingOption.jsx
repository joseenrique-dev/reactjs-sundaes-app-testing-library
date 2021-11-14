import React from 'react';
import { Col } from 'react-bootstrap';

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        style={{ width: '75%' }}
        alt={`${name} topping`}
      />
    </Col>
  );
}
