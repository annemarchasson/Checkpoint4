import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./Workshop.scss";

function Workshop() {
  const [sub] = useState({
    userId: 2,
    workshopId: 1,
  });
  const [formWorkshop, setFormWorkshop] = useState({
    organizer: "",
    date: "",
    address: "",
    maxAttendees: "",
    currentAttendees: "",
  });
  const [Confirm, setConfirm] = useState(false);
  const [Confirm2, setConfirm2] = useState(false);
  const handleChangeFormWorkshop = (event) => {
    setFormWorkshop({
      ...formWorkshop,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddWorkshop = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/workshops`, formWorkshop)
      .then(() => {
        setConfirm(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handlesubmitWorkshop = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/attendees`, sub)
      .then(() => {
        setConfirm2(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [dataWorkshop, setDataWorkshop] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workshops`)
      .then((response) => {
        setDataWorkshop(response.data[0]);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  // pour calandrier
  const [selectedDate, setSelectedDate] = useState(null);
  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container-workshop">
      <section className="program-section">
        <h2 className="title-section-h2-bis">Ton Programme</h2>
        <Calendar
          className="calendar"
          onChange={handleSelectedDateChange}
          value={selectedDate}
        />
      </section>
      <section className="program-section-add">
        <h2 className="title-section-h2">Proposer un Atelier</h2>
        <form className="form-sub" onSubmit={handleAddWorkshop}>
          <div className="input-place">
            <label className="label-workshp" htmlFor="organizer">
              Organisateur
            </label>
            <input
              className="input-workshop"
              type="text"
              id="organizer"
              name="organizer"
              placeholder="Fantine"
              value={formWorkshop.organizer}
              onChange={handleChangeFormWorkshop}
            />
          </div>
          <div className="input-place">
            <label className="label-workshp" htmlFor="date">
              Date et Heure
            </label>
            <input
              type="datetime"
              className="input-workshop"
              id="date"
              name="date"
              placeholder="2023-08-13 15:30:00"
              value={formWorkshop.date}
              onChange={handleChangeFormWorkshop}
            />
          </div>
          <div className="input-place">
            <label className="label-workshp" htmlFor="address">
              Adresse Postale
            </label>
            <input
              type="text"
              className="input-workshop"
              id="address"
              name="address"
              placeholder="1 rue de Gand 59000 Lille"
              value={formWorkshop.address}
              onChange={handleChangeFormWorkshop}
            />
          </div>
          <div className="input-place">
            <label className="label-workshp" htmlFor="maxAttendees">
              Nombre de Place
            </label>
            <input
              type="number"
              className="input-workshop"
              id="maxAttendees"
              name="maxAttendees"
              placeholder="10"
              value={formWorkshop.maxAttendees}
              onChange={handleChangeFormWorkshop}
            />
          </div>
          <button className="btn-add" type="submit">
            Ajouter
          </button>
          {Confirm && (
            <h3 className="thank">Ton atelier à été ajouté, merci !</h3>
          )}
        </form>
      </section>
      <section className="program-section">
        <form className="form-sub" onSubmit={handlesubmitWorkshop}>
          <h2 className="title-section-h2-ter">S'inscrire à un Atelier</h2>
          <div className="subtitle-sub">Organisateur(trice):</div>
          <div className="label-workshp">{dataWorkshop.organizer}</div>
          <div className="subtitle-sub">Date et Heure:</div>
          <div className="label-workshp">{dataWorkshop.date}</div>
          <div className="subtitle-sub">Lieu:</div>
          <div className="label-workshp">{dataWorkshop.address}</div>
          <div className="subtitle-sub">Nombre de place maximum:</div>
          <div className="label-workshp">{dataWorkshop.maxAttendees}</div>
          <div className="subtitle-sub">Places restantes:</div>
          <div className="label-workshp">{dataWorkshop.currentAttendees}</div>
          <button className="btn-sub" type="submit">
            S'inscrire
          </button>
          {Confirm2 && (
            <h3 className="thank">Ton inscription a été enregistré, merci !</h3>
          )}
        </form>
      </section>
    </div>
  );
}
export default Workshop;
