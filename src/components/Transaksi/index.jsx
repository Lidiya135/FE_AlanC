import React from "react";
import style from "../Transaksi/transaksi.module.css";
import user from "../../user.png";
import logo from "../../logo.webp";
import menu from "../../menu.jpg";
import Button from 'react-bootstrap/Button';

export default function Transaksi() {

    return(
      <div className={style.transac}>
        <div className={style.title}>
            <img src={user}/>
            <h2>New Customer</h2>
            <img src={menu} />
        </div>
        <h6>Dine in </h6>
        <div className={style.span}>
            <span>1</span>
            <span>view table</span>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p></p>
            <p>Rp. 15000</p>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p></p>
            <p>Rp. 15000</p>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p>x 2</p>
            <p>Rp. 15000</p>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p>x 2</p>
            <p>Rp. 15000</p>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p></p>
            <p>Rp. 15000</p>
        </div>
        <div className={style.table}>
            <p>Cah Tauge</p>
            <p></p>
            <p>Rp. 15000</p>
        </div>
        <h5>Clear Sale</h5>
        <div className={style.btn}>
            <Button variant="primary">Save Bill</Button>{' '}
            <Button variant="primary">Print Bill</Button>{' '}
        </div>
        <div className={style.charge}>
            <img src={logo} />
            <h4>Charge Rp. 104000</h4>
            <span></span>
        </div>

      </div>
    )
}