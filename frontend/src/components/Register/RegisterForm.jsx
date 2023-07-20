import { useState } from "react";
import { toast } from "react-toastify";

function RegisterForm() {
  const [firstname, setUsername] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState(""):

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"}/user`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          // lastname,
          // email,
          password,
          // address,
          // phoneNumber,
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
        <label htmlFor="username">firstname</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Go</button>
    </form>
  );
}

export default RegisterForm;
