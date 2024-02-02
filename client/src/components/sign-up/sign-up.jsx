import React, { useState } from "react";
import styles from "./sign-up.module.css";
import Axios from "axios";
import { getImageUrl } from "../../utils";

export const Sign_up = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido_p, setApellido_p] = useState("");
  const [apellido_m, setApellido_m] = useState("");
    
  const add = () => {
    Axios.post("http://localhost:3001/createUser", {
      email: email,
      contrasena: contrasena,
      nombre: nombre,
      apellido_p: apellido_p,
      apellido_m: apellido_m
    }).then(() => {
      alert(`El empleado ${nombre} fue registrado con éxito.`);
      window.location.href = "/login";
    }).catch((error) => {
      alert("Error" + (error));
    });
  };

  return(
    <>
    <div className={styles.navbar}>
    <img  src={getImageUrl("navbar/logo.png")}/>
    </div>
      <div className={styles.container}> 
        <div className={styles.content}>
          <div className={styles.welcome}>SIGN UP</div>
        </div>
      </div>
      <div className={styles.container2}>
      <form >
        <label htmlFor="email" className="form-label" className={styles.description}>
          Email:
        </label>
        <br></br>
        <input type="email" className="form-control" className={styles.entradas} id="email" placeholder="Enter your email" name="email"
        value={email} onChange={(event) => setEmail(event.target.value)}></input><br></br>

        <label htmlFor="password" className="form-label" className={styles.description}>Password: </label><br></br>
        <input type="password" className="form-control" className={styles.entradas} id="password" placeholder="Enter your password" name="password"
        value={contrasena} onChange={(event) => setContrasena(event.target.value)}></input><br></br> 

        <label htmlFor="name" className="form-label" className={styles.description}>Name:</label><br></br>
        <input type="text" className="form-control" className={styles.entradas} id="name" placeholder="Enter your name" name="name"
        value={nombre} onChange={(event) => setNombre(event.target.value)}></input><br></br>

        <label htmlFor="apellido_p" className="form-label" className={styles.description}>First Name: </label><br></br>
        <input type="text" className="form-control" className={styles.entradas} id="apellido_p" placeholder="Enter your first name" name="apellido_p"
        value={apellido_p} onChange={(event) => setApellido_p(event.target.value)}></input><br></br>

        <label htmlFor="apellido_m" className="form-label" className={styles.description}>Second Name: </label><br></br>
        <input type="text" className="form-control" className={styles.entradas} id="apellido_m" placeholder="Enter your first name" name="apellido_m"
        value={apellido_m} onChange={(event) => setApellido_m(event.target.value)}></input><br></br> 
        <center>
        <a className={styles.bookBtn} onClick={add}>SIGN UP</a><br></br>
        <br></br>
        <a href="/login">I have an account</a>
        </center>
      </form>
      </div>
    </>
  );
}