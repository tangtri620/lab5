import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyen Van A", code: "CODE12345", active: true },
    { name: "Tran Van B", code: "CODE67890", active: false },
  ]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [active, setActive] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleAddStudent = () => {
    const newStudent = { name, code, active };
    setStudents([newStudent, ...students]);
    setName("");
    setCode("");
    setActive(false);
  };

  const handleDeleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleSelectStudent = (e, index) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCount(selectedCount + 1);
    } else {
      setSelectedCount(selectedCount - 1);
    }
  };

  const handleClearAll = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <Container>
      <h4>Total Selected Student: {selectedCount}</h4>
      <Button variant="primary" onClick={handleClearAll}>
        Clear
      </Button>

      <Form className="mt-3">
        <Form.Group controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="studentCode">
          <Form.Label>Student Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="studentActive">
          <Form.Check
            type="checkbox"
            label="Still Active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </Form.Group>

        <Button variant="success" onClick={handleAddStudent}>
          Add
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleSelectStudent(e, index)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                {student.active ? (
                  <span className="badge bg-primary">Active</span>
                ) : (
                  <span className="badge bg-danger">In-active</span>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
