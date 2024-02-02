import styles from "./contacts-info.module.css";

export const Contacts_info = () => {
  return (
    <div className="container-fluid mt-3" style={{ background: 'rgba(255, 255, 255, 1)', color: "black" }}>
      <div className={styles.container}> 
        <div className={styles.content}>
          <div className={styles.title}>WE ARE HERE FOR YOU</div>
          <div className={styles.description}>
            At Luxury Hotels, we take our customers seriously. Do you have any enquiries, compaints or requests, please forward it to our support desk and we will get back to you as soon as possible.
          </div>
        </div>     
      </div>
      <div className="row" style={{marginBottom: 30}}>
        <div
          className="col p-6 text-black"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18
          }}
        >
          <div className={styles.direction}>
            497 Evergreen Rd. Roseville, CA 95673
          </div>
          <div className={styles.direction}>
            Phone: +44 345 678 903
            Email: luxury_hotels@gmail.com
          </div>
        </div>
        <div
          className="col p-6 text-black" 
          style={{
            display: "flex",
            justifyContent: 'center',
            margin: "20px 0"
          }}
        >
        <form>
          <label htmlFor="name" className={styles.description}>Name:</label><br></br>
          <input type="text" className={styles.entradas} id="name" placeholder="Enter your name" name="name"></input><br></br>
          <label htmlFor="email" className={styles.description}>Email:</label><br></br>
          <input type="email" className={styles.entradas} id="email" placeholder="Enter email" name="email"></input><br></br>
          <label htmlFor="message" className={styles.description}>Message:</label><br></br>
          <textarea  rows="5" className={styles.entradaTexto} id="message" name="message" placeholder="Write your message"></textarea><br></br>
        </form>
        </div>
      </div>
    </div>
  );
};
