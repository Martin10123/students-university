import { useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { BsFilterLeft, BsTags } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { AuthUserContext } from "../../../context";
import { firebaseDB } from "../../../firebase";
import { useScroll } from "../../../hook";

import { getProductByAny } from "../../helpers";
import { CardProduct, SideBar } from "../components";

import styles from "./mainStore.module.css";

export const MainStore = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);
  const { users, infoUserActive } = useContext(AuthUserContext);

  const navigate = useNavigate();

  useScroll([openSideBar]);

  useEffect(() => {
    const docRef = query(
      collection(firebaseDB, "storeApp"),
      orderBy("name", "asc")
    );

    const unSuscribed = onSnapshot(docRef, (product) => {
      const productsColection = product.docs.map((doc) => {
        return {
          idDoc: doc.id,
          ...doc.data(),
        };
      });

      setProducts(productsColection);
    });

    return () => unSuscribed();
  }, []);

  const productsFilter = useMemo(
    () => getProductByAny(products, searchProduct),
    [products, searchProduct]
  );

  return (
    <section className={styles.container}>
      <SideBar
        infoUserActive={infoUserActive}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />

      <div className={styles.content_info}>
        <nav className={styles.content_nav}>
          <BsFilterLeft onClick={() => setOpenSideBar(true)} />
          <p>Store</p>
          <BsTags onClick={() => navigate("/store/selfArticle")} />
        </nav>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.input_form}
            value={searchProduct}
            onChange={({ target }) => setSearchProduct(target.value)}
          />
        </div>

        <div className={styles.title}>
          <p>Productos</p>
        </div>

        <div className={styles.container_card}>
          {productsFilter.map((product) => (
            <CardProduct
              key={product.idDoc}
              product={product}
              infoUserActive={infoUserActive}
              users={users}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
