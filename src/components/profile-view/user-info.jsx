import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export function UserInfo() {
  return (
    <>
      <p>Name: {localStorage.getItem('user')}</p>
      {/* 
      <p>Email: {localStorage.getItem('email')}</p>

      <p>Birthday: {localStorage.getItem('birthday').slice(0, 10)}</p> */}
    </>
  );
}
