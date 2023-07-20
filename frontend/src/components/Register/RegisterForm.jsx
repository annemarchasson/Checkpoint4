import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const handleClicktoHome = () => {
    navigate("/Workshop");
  };
  const handleFirstnameChange = (event) => {
    const newFirstname = event.target.value;
    setFirstname(newFirstname);
  };
  const handleLastnameChange = (event) => {
    const newLastname = event.target.value;
    setLastname(newLastname);
  };
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };
  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
  };
  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/user`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          address,
          phoneNumber,
        }),
      }
    ).then((response) => {
      if (response.status === 201) {
        toast.error("Ton compte existe déjà, Connecte-toi!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={handleFirstnameChange}
        />
      </div>
      <div>
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={handleLastnameChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de Passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="address">Adresse</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Téléphone</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      <button type="submit" onClick={handleClicktoHome}>
        Valider
      </button>
    </form>
  );
}

export default RegisterForm;
