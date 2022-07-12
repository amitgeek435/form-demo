import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Table } from "react-bootstrap";
import { Pencil, Trash2 } from "react-bootstrap-icons";
// import Showlist from "./Showlist";

const FormDemo = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [editInd, setEditInd] = useState();
  const [image, setImage] = useState();
  const [fvalue, setfValue] = useState({
    fname: "",
    email: "",
    pass: "",
    uimage: "",
  });
  const [allData, setallData] = useState([]);
  const inputEvent = (e) => {
    let { name, value } = e.target;
    setfValue((preVal) => {
      if (name === "uimage") {
        value = URL.createObjectURL(e.target.files[0]);
        setImage(value);
      }
      return { ...preVal, [name]: value };
    });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (show) {
      console.log(e.target.files);
      // let updateImg = URL.createObjectURL(e.target.uimage.files);
      if (e.target.files === undefined) {
        var updateImg = image;
      } else {
        updateImg = URL.createObjectURL(e.target.files[0]);
      }
      const updateData = {
        fname: e.target.fname.value,
        email: e.target.email.value,
        pass: e.target.pass.value,
        uimage: updateImg,
      };
      // console.log(updateData);
      const newArray = allData;
      for (let index = 0; index < newArray.length; index++) {
        if (index === editInd) {
          newArray[editInd] = updateData;
          setfValue({
            fname: "",
            email: "",
            pass: "",
            uimage: "",
          });
          setImage("");
          setShow(false);
        }
      }
    } else {
      if (
        fvalue.fname.length !== 0 &&
        fvalue.email.length !== 0 &&
        fvalue.pass.length !== 0 &&
        fvalue.uimage.length !== 0
      ) {
        setallData((newData) => [...newData, fvalue]);
        setCount(count + 1);
        setfValue({
          fname: "",
          email: "",
          pass: "",
          uimage: "",
        });
        setImage("");
      } else {
        alert("Some Data Missing in This User Form");
      }
    }
  };

  const handleDelete = (ind) => {
    allData.splice(ind, 1);
    setImage("");
    setallData([...allData]);
  };
  const handleEdit = (ind) => {
    let { fname, email, pass, uimage } = allData[ind];
    setShow(true);
    setEditInd(ind);
    setfValue({
      fname: fname,
      email: email,
      pass: pass,
      uimage: uimage,
    });
    setImage(uimage);
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center text-secondary">User Form</h1>
        <hr className="bg-danger pb-1" />
        <Form key={count} onSubmit={formSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              placeholder="Enter Name"
              onChange={inputEvent}
              value={fvalue.fname}
              //   required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={inputEvent}
              value={fvalue.email}
              //   required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="pass"
              onChange={inputEvent}
              value={fvalue.pass}
              //   required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" name="uimage" onChange={inputEvent} />
            {image ? (
              <img
                src={image}
                alt="User Profile"
                width={200}
                className="rounded mt-2"
              />
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit">
            {!show ? "Submit" : "Update"}
          </Button>
        </Form>
        <hr className="bg-danger pb-1" />
        <h2 className="text-center text-secondary">User List...</h2>
        <hr className="bg-danger pb-1" />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.length === 0 ? (
              <tr className="h4 text-center">
                <td colSpan="5" className="text-danger">
                  No User Records Found Yet...
                </td>
              </tr>
            ) : (
              allData?.map((val, ind) => {
                const { fname, email, pass, uimage } = val;
                return (
                  <tr key={ind + 1}>
                    <td>{ind + 1}</td>
                    <td>
                      {uimage ? (
                        <img
                          src={uimage}
                          alt="userprofile"
                          width={150}
                          height={150}
                        />
                      ) : null}
                    </td>
                    <td>{fname}</td>
                    <td>{email}</td>
                    <td>{pass}</td>
                    <td>
                      <Button
                        variant="info"
                        className="mx-3 edit"
                        onClick={() => handleEdit(ind)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={() => handleDelete(ind)}
                      >
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default FormDemo;
