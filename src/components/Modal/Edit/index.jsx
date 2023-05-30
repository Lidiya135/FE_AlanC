import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Edit({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let id = data.id;
  // console.log(id, "id edit ")

  //UpdateData
  const [photo, setPhoto] = useState (null);
  const [updateData, setUpdateData] = useState({
    name: data.name,
    price: data.price,
    category_id: data.category_id,
  });
  // console.log(updateData)

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updateData.name);
    formData.append("price", updateData.price);
    formData.append("photo", photo);
    formData.append("category_id", updateData.category_id);
    console.log(formData);
    await axios
      .put(`http://localhost:4019/product/${id}`, formData)
      .then((res) => {
        console.log("Update succes");
        console.log(res);
        swal("Success", "Update Success", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Update data failed");
        console.log(err);
        swal("Warning", "Update failed", "error");
        // window.location.reload(false);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Barang
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Product</Form.Label>
              <Form.Control
                name="name"
                value={updateData.name}
                onChange={handleChange}
                placeholder={data.name}
                className="mb-2"
                type="text"
                autoFocus
              />

              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                value={updateData.price}
                onChange={handleChange}
                placeholder={data.price}
                className="mb-2"
                type="number"
                autoFocus
              />

              <Form.Label>Photo</Form.Label>
              <Form.Control
                name="photo"
                onChange={handlePhoto}
                className="mb-2"
                type="file"
                autoFocus
              />

              <Form.Label>Category Id</Form.Label>
              <Form.Control
                id="category_id"
                name="category_id"
                value={updateData.category_id}
                onChange={handleChange}
                placeholder={data.category_id}
                className="mb-2"
                type="text"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
