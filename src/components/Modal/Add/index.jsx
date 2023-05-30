import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Add() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //CreateData
  const [photo, setPhoto] = useState(null);
  const [data] = useState(null);
  const [inputData, setInputData] = useState({
    name: data?.name,
    price: data?.price,
    category_id: data?.category_id,
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("price", inputData.price);
    formData.append("photo", photo);
    formData.append("category_id", inputData.category_id);
    console.log(formData);
    axios
      .post(`http://localhost:4019/product`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log("Post product success");
        console.log(res);
        swal("Success", "Post product success", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Post product failed");
        console.log(err);
        swal("Warning", "Post product failed", "error");
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tambah Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group>
              <Form.Label>Nama Product</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={inputData.name}
                placeholder="masukkan nama Product"
                autoFocus
              />
              <Form.Label>price Product</Form.Label>
              <Form.Control
                className="mb-2"
                id="price"
                name="price"
                onChange={(e) => handleChange(e)}
                value={inputData.price}
                type="number"
                placeholder="masukkan price Product"
                autoFocus
              />
              <Form.Label>Photo</Form.Label>
              <br />
              <input
                type="file"
                name="photo"
                onChange={handlePhoto}
              />{" "}
              <br />
              {/* <Form.Label>Photo</Form.Label>
                            <Form.Control
                                id="photo" 
                                name="photo" 
                                onChange={handlePhoto}
                                className="mb-2"
                                type="file"
                                autoFocus
                            /> */}
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                id="category_id"
                name="category_id"
                onChange={(e) => handleChange(e)}
                value={inputData.category_id}
                className="mb-2"
                type="number"
                placeholder="Masukkan Category Id"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => postData(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
