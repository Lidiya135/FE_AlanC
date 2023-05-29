import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Add() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //CreateData
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [category_id, setCategory_id] = useState("");

      const handlePhoto = (e) => {
        setPhoto(e.target.files[0]);
        console.log(e.target.files[0]);
      };

    const postData = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(price);
        console.log(photo);
        console.log(category_id);
        let data = {
          name,
          price,
          photo,
          category_id
        };

        try {
            await axios.post(`http://localhost:4019/product`, data)
            swal("Success", "Menambahkan Product Sukses", "success");
            window.location.reload(false);
        } catch (err) {
            console.log(err);
            swal("Warning", "Gagal Menambahkan Product", "error");
        }
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
                                onChange={(e) => setName(e.target.value)}
                                placeholder="masukkan nama Product"
                                autoFocus
                            />

                            <Form.Label>price Product</Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="price" 
                                name="price" 
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                placeholder="masukkan price Product"
                                autoFocus
                            />
                            <Form.Label>Photo</Form.Label><br/>
                            <input type="file" id="photo" name="photo" placeholder="photo" onChange={handlePhoto}/> <br/>
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
                                onChange={(e) => setCategory_id(e.target.value)}
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
                    <Button variant="primary" onClick={ postData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;