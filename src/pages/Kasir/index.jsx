import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Kasir/kasir.module.css";
import Transaksi from "../../components/Transaksi";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Kasir() {
  const [data, setData] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:4019/product`)
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

  const masukTransaksi = async (price, id) => {
    axios
      .get(`http://localhost:4019/transaction/${id}`)
      .then((res) => {
        console.log(res.data, "get cart");
        console.log(res.data.data.length, "get length");
        if (res.data.data.length == 0) {
          let form = {
            amount: 1,
            product_id: id,
            total: price,
          };
          console.log(form, "loggg form 1");
          axios
            .post(`http://localhost:4019/transaction`, form)
            .then((res) => {
              console.log("Post success");
              console.log(res, "Post success");
              swal(
                "Success",
                "Memasukkan makanan ke list keranjang success",
                "success"
              );

              window.location.reload(false);
            })
            .catch((err) => {
              console.log("Post failed");
              console.log(err);
              swal(
                "Warning",
                "Memasukkan makanan ke list keranjang failed",
                "error"
              );
            });
        } else {
          let form = {
            amount: res.data.data[0].amount + 1,
            product_id: id,
            total: res.data.data[0].total + price,
          };
          console.log(form, "loggg form 2");
          axios
            .post(
              `http://localhost:4019/transaction/${res.data.data[0].id}`,
              form
            )
            .then((res) => {
              console.log("Update success");
              console.log(res);
              swal("Success", "Update product success", "success");
            })
            .catch((err) => {
              console.log("Post failed");
              console.log(err);
              swal("Warning", "Post product failed", "error");
            });
        }
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  return (
    <div className={styles.pages}>
      <div className={styles.foods}>
        <div className={styles.title}>
          <Link to={`/Products`}>
            <h5>Menu Edit Product</h5>
          </Link>
          <h3>List Product Foods</h3>
          <span></span>
        </div>
        <hr />

        <div className={styles.gambar}>
          {data?.map((p) => (
            <div
              onClick={() => masukTransaksi(p.price, p.id)}
              className={styles.boxgbr}
            >
              <img src={p.photo} />
              <br />
              <p> {p.name} </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.transaksi}>
        <Transaksi />
      </div>
    </div>
  );
}
