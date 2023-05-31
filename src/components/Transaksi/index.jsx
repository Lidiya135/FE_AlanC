import React, { useEffect, useState } from "react";
import style from "../Transaksi/transaksi.module.css";
import user from "../../user.png";
import logo from "../../logo.webp";
import menu from "../../menu.jpg";
import Button from "react-bootstrap/Button";
import axios from "axios";
import swal from "sweetalert";
import AddBill from "../Modal/AddBill";
import ReactToPrint from "react-to-print";

export default function Transaksi() {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:4019/transaction`)
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

  const get = () => {
    axios
      .get(`http://localhost:4019/transaction/tot`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data, "ppppp");
        res.data && setPrice(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  useEffect(() => {
    get();
  }, []);

  const num = [20000, 11000, 21000];
  const newValue = 5000;

  const totalPrice = num.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const totalNew = totalPrice + newValue;

  console.log(totalPrice);
  console.log(totalNew);

  const deleteData = () => {
    axios
      .delete(`http://localhost:4019/transaction`)
      .then((res) => {
        console.log("delete barang success");
        console.log(res);
        swal("Success", "Delete barang success", "success");
        getData();
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("delete barang fail");
        console.log(err);
        swal("Warning", "Delete barang failed", "error");
      });
  };

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className={style.transac}>
      <div className={style.title}>
        <img src={user} />
        <h2>New Customer</h2>
        <img src={menu} />
      </div>
      <h6>Dine in </h6>
      <div className={style.span}>
        <span>1</span>
        <span>view table</span>
      </div>
      {data?.map((t) => (
        <div className={style.table}>
          <p>{t.product}</p>
          <p></p>
          <p>{t.total}</p>
        </div>
      ))}
      <div className={style.table}>
        <p>Total</p>
        <p></p>
        <p>Rp. {totalPrice} </p>
      </div>
      <div className={style.table}>
        <p>Change</p>
        <p></p>
        <p>Rp. </p>
      </div>
      <h5 onClick={() => deleteData()}>Clear Sale</h5>
      <div className={style.btn}>
        {/* <Button variant="primary"><AddBill totalPrice /></Button>{" "} */}
        <AddBill totalPrice />
        <Button variant="primary" onClick={handlePrint}>
          Print Bill
        </Button>{" "}
      </div>
      <div className={style.charge}>
        <img src={logo} />
        {/* <h4>Charge Rp. 104000</h4> */}
        <h4>Charge Rp. {totalPrice}</h4>
        <span></span>
      </div>
    </div>
  );
}
