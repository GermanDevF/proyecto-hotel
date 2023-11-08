const express = require("express");
const app = express();
const stripe = require('stripe')('pk_test_51O2gfuJw0dovYyK3ViteKYgwaQz7Fh3fDPUDkqFrzI7zoIQ5c6EcT43rAjU37s4QvJaQJqGqE2uvllPbPS0SoWDI00NywlwgMx');

const session = require('express-session');

const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const verify = jwt.verify;
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel",
    port: "3307"
});

//-----------------------------------------------------------USUARIOS--------------------------------------------------------------//

app.post("/createUser", (req, res) => {
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido_p = req.body.apellido_p;
    const apellido_m = req.body.apellido_m;

    db.query('INSERT INTO usuarios(email,contrasena,nombre,apellido_p,apellido_m) VALUES(?,?,?,?,?)', [email, contrasena, nombre, apellido_p, apellido_m],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/getUsers", (req, res) => {
    db.query('SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/getUser/:id", (req, res) => {
    const id_usuario = req.params.id_usuario;
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', id_usuario,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

/*LOGIN*/
// Configura la sesión
app.post('/login', (req, res) => {
    const { email, contrasena } = req.body;
  
    db.query('SELECT * FROM usuarios WHERE email = ? AND contrasena = ?', [email, contrasena], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error en la base de datos' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      } else {
        const usuario = {
          email: email,
        };
  
        jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1h' }, (jwtErr, token) => {
          if (jwtErr) {
            res.status(500).json({ error: 'Error al generar el token' });
          } else {
            res.json({ token });
          }
        });
      }
    });
  });
  
  app.get('/user', (req, res) => {
    const jwtByUser = req.headers.authorization || ""; // Obtiene el token del encabezado
    const jwt2 = jwtByUser.split(" ").pop();
    
    if (!jwt2) {
      return res.status(401).json({ error: 'No has iniciado sesión' });
    }
  
    const isUser = verifyToken(jwt2);
    if (isUser) {
      const email = isUser.usuario.email;
  
      db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
        if (err) {
          // Manejo de errores
        } else if (result.length === 0) {
          res.status(401).json({ error: 'Credenciales incorrectas' });
        } else {
          res.send(result);
        }
      });
    } else {
      res.status(401).json({ error: 'Token no válido' });
    }
  });
  
/*
const checkJwt = (req, res, next) => {
    try {
      const jwtByUser = req.headers.authorization || "";
      const jwt = jwtByUser.split(" ").pop(); // 11111
      const isUser = verifyToken(`${jwt}`) = { id };
      if (!isUser) {
        res.status(401);
        res.send("NO_TIENES_UN_JWT_VALIDO");
      } else {
        req.user = isUser;
        next();
      }
    } catch (e) {
      console.log({ e });
      res.status(400);
      res.send("SESSION_NO_VALIDAD");
    }
  };

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

*/
const verifyToken = (jwt) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
}; 



app.put("/updateUser", (req, res) => {
    const id_usuario = req.body.id_usuario;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido_p = req.body.apellido_p;
    const apellido_m = req.body.apellido_m;

    db.query('UPDATE usuarios SET email=?,contrasena=?,nombre=?,apellido_p=?,apellido_m=? WHERE id_usuario=?', [email, contrasena, nombre, apellido_p, apellido_m, id_usuario],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteUser/:id", (req, res) => {
    const id_usuario = req.params.id_usuario;

    db.query('DELETE FROM usuarios WHERE id_usuario=?', id_usuario,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});



//-----------------------------------------------------------HABITACIONES--------------------------------------------------------------//

app.post("/createRoom", (req, res) => {
    const tipo_de_habitacion = req.body.tipo_de_habitacion;
    const estado = req.body.estado;
    const precio = req.body.precio;

    db.query('INSERT INTO habitaciones(tipo_de_habitacion,estado,precio) VALUES(?,?,?)', [tipo_de_habitacion, estado, precio],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/getRooms", (req, res) => {
    db.query('SELECT * FROM habitaciones',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateRoom", (req, res) => {
    const id_habitacion = req.body.id_habitacion;
    const tipo_de_habitacion = req.body.tipo_de_habitacion;
    const estado = req.body.estado;
    const precio = req.body.precio;

    db.query('UPDATE habitaciones SET tipo_de_habitacion=?,estado=?,precio=? WHERE id_habitacion=?', [tipo_de_habitacion, estado, precio, id_habitacion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteRoom/:id", (req, res) => {
    const id_habitacion = req.params.id_habitacion;

    db.query('DELETE FROM habitaciones WHERE id_habitacion=?', id_habitacion,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});



//-----------------------------------------------------------RESERVACIONES--------------------------------------------------------------//

app.post("/createReservation", async (req, res) => {
    const id = req.body.id;
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const total_pago = req.body.total_pago;
    const token = req.body.stripeToken; 
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;
  
    try {
      // Primero, crea el pago con Stripe
      const payment = await stripe.paymentIntents.create({
        amount: total_pago,
        currency: "MXN",
        source: token,
        description: "Luxury Hotel Reservation",
        payment_method: id,
        confirm: true, // Confirmar el pago al mismo tiempo
      });
  
      // Después de confirmar el pago, realiza la inserción en la base de datos
      if (payment.status === "succeeded") {
        db.query(
          'INSERT INTO reservaciones(fecha_llegada, fecha_salida, total_pago, token, id_usuario, id_habitacion) VALUES(?, ?, ?, ?, ?, ?)',
          [fecha_llegada, fecha_salida, total_pago, token, id_usuario, id_habitacion],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Error al insertar en la base de datos" });
            } else {
              res.send(result);
              console.log(payment);
              return res.status(200).json({ message: "Successful Payment" });
            }
          }
        );
      } else {
        return res.status(400).json({ message: "El pago no se ha completado con éxito." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.raw.message });
    }
  });
  

app.get("/getReservations", (req, res) => {
    db.query('SELECT * FROM reservaciones',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateReservation", (req, res) => {
    const id_reservacion = req.body.id_reservacion;
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const numero_huespedes = req.body.numero_huespedes;
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;


    db.query('UPDATE reservaciones SET fecha_llegada=?,fecha_salida=?,numero_huespedes=?,id_usuario=?,id_habitacion=? WHERE id_reservacion=?', [fecha_llegada, fecha_salida, numero_huespedes, id_usuario, id_habitacion, id_reservacion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.delete("/deleteReservation/:id", (req, res) => {
    const id_reservacion = req.params.id_reservacion;

    db.query('DELETE FROM reservaciones WHERE id_reservacion=?', id_reservacion,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
})