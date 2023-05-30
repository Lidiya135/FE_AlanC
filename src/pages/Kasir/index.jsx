import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Kasir/kasir.module.css";
import Transaksi from "../../components/Transaksi";
import { Link } from "react-router-dom";

export default function Kasir() {
  const [data, setData] = useState([]);

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
  return (
    <div className={styles.pages}>
      <div className={styles.foods}>
        <div className={styles.title}>
          <Link to={`/Products`}>
            <h6>Edit Product</h6>
          </Link>
          <h3>List Product Foods</h3>
          <span></span>
        </div>
        <hr />

        <div className={styles.gambar}>
          {data?.map((p) => (
            <div key={p.id} className={styles.boxgbr}>
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
