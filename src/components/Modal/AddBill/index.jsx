import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddBill(totalPrice) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState(null);
  const getData = () => {
    axios
      .get(`http://localhost:4019/pay`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [inputData, setInputData] = useState({
    charge: data?.charge,
    pay: data?.pay,
    change: data?.change
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const change = inputData.pay - totalPrice;

  const postData = async (e) => {
    e.preventDefault();
    let charge = totalPrice;
    console.log(charge, "charge bill")
    const formData = new FormData();
    formData.append("charge", charge);
    formData.append("change", change);
    formData.append("pay", inputData.price);
    console.log(formData);
    axios
      .post(`http://localhost:4019/pay`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log("Post product success");
        console.log(res);
        swal("Success", "Save Bill success", "success");
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log("Post product failed");
        console.log(err);
        swal("Warning", "Save Bill failed", "error");
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save Bill
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group>
              <Form.Label>Charge</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={inputData.charge}
                placeholder={totalPrice}
                autoFocus
              />
              <Form.Label>pay</Form.Label>
              <Form.Control
                className="mb-2"
                id="pay"
                name="pay"
                onChange={(e) => handleChange(e)}
                value={inputData.pay}
                type="number"
                placeholder="masukkan pay Product"
                autoFocus
              />
              <br />
              <Form.Label>Change</Form.Label>
              <Form.Control
                id="category_id"
                name="category_id"
                onChange={(e) => handleChange(e)}
                value={inputData.change}
                className="mb-2"
                type="number"
                placeholder={change}
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

export default AddBill;
