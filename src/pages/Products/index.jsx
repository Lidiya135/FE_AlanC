import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import InsertData from "../../components/Modal/Add";
import Edit from "../../components/Modal/Edit";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

export default function Products() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        search: "",
    });
    const [sortBy, setSortBy] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        getData()
    }, [inputData.search, sortBy, sort])

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const getData = () => {
        axios
            .get(`http://localhost:4019/product?search=${inputData.search}&sortby=${sortBy}&sort=${sort}`)
            .then((res) => {
                console.log("get data succes");
                console.log(res.data);
                res.data && setData(res.data.data);
            })
            .catch((err) => {
                console.log("get data fail");
                console.log(err);
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteData = (id) => {
        axios.delete(`http://localhost:4019/product/${id}`,)
            .then((res) => {
                console.log("delete barang success")
                console.log(res)
                swal("Success", "Delete barang success", "success");
                getData();
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("delete barang fail")
                console.log(err)
                swal("Warning", "Delete barang failed", "error");
            })
    }

    return (
        <div className="bg-secondary " >
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <h3>Penjualan Product Makanan</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <div
                                className={`btn ${sortBy === "name" ? "btn-success" : "btn-outline-success"
                                    } ms-1`}
                                onClick={() => setSortBy("name")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">Nama Product</h6>
                            </div>
                            <div
                                className={`btn ${sortBy === "price" ? "btn-success" : "btn-outline-success"
                                    } ms-3`}
                                onClick={() => setSortBy("price")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">Price</h6>
                            </div>

                            <div
                                className={`btn ${sort === "asc" ? "btn-success" : "btn-outline-success"
                                    } ms-5`}
                                onClick={() => setSort("asc")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">ASC</h6>
                            </div>
                            <div
                                className={`btn ${sort === "desc" ? "btn-success" : "btn-outline-success"
                                    } ms-3`}
                                onClick={() => setSort("desc")}
                                style={{ width: "100px", borderRadius: "10px" }}
                            >
                                <h6 className=" mt-1">DESC</h6>
                            </div>

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={inputData.search}
                                name="search"
                                onChange={handleChange}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="mt-3">
                <Table responsive="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>Photo Product</th>
                            <th>Nama Product</th>
                            <th>Price</th>
                            <th>
                                <InsertData />
                            </th>
                        </tr>
                    </thead>
                    {data?.map((p) => (
                        <tbody key={p.id}>
                            <tr>
                                <td>
                                    <img src={p.photo} style={{width:"100px", heigh:"100px"}} />
                                </td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>
                                    <Edit data={p} />
                                    <Button variant="danger" type="submit" onClick={(e) => deleteData(e, p.id)}>Delete</Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </section>
        </div>


    )

}