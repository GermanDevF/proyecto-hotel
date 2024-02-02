import React, { useState } from "react";
import Axios from "axios";
import styles from "./login.module.css";
import { getImageUrl } from "../../utils";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const login = () => {
        Axios.post('http://localhost:3001/login', {
          email: email,
          contrasena: contrasena
        })
          .then((response) => {
            // Manejar la respuesta del servidor en caso de éxito
            localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
            alert('Inicio de sesión exitoso:', response.data);
            window.location.href = "/";
            // Aquí puedes redirigir al usuario o realizar otras acciones necesarias.
          })
          .catch((error) => {
            // Manejar errores en caso de fallo en el inicio de sesión
            console.error('Error de inicio de sesión:', error);
          });
      }
      
      
    return(
      <>
        <div className={styles.navbar}>
          <img  src={getImageUrl("navbar/logo.png")}/>
        </div>
        <div className={styles.container}> 
          <div className={styles.content}>
            <div className={styles.welcome}>LOGIN</div>
          </div>
        </div>
          <div className={styles.container2}>
            <form >
              <label htmlFor="email" className="form-label" className={styles.description}>Email:</label><br></br>
              <input type="email" className="form-control" className={styles.entradas} id="email" placeholder="Enter your email" name="email"
                value={email} onChange={(event) => setEmail(event.target.value)}></input><br></br>

              <label htmlFor="password" className="form-label" className={styles.description}>Password</label><br></br>
              <input type="password" className="form-control" className={styles.entradas} id="password" placeholder="Enter your password" name="password"
              value={contrasena} onChange={(event) => setContrasena(event.target.value)}></input><br></br> 
              <center>
              <a className={styles.bookBtn} onClick={login}>LOGIN</a><br></br>
              <br></br>
              <a href="/sign-up">I don&apos;t have an account</a>
              </center>
            </form>
          </div>
      </>
    );

}