import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import db from "../Config";

const Form: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [typeAntrian, setTypeAntrian] = useState<string>("");
  const [noAntrian, setNoAntrian] = useState<string>("");
  const [noPlate, setNoPlate] = useState<string>("");
  const antrianCollections = collection(db, "antrian");

  const handleSubmit = async () => {
    try {
      await addDoc(antrianCollections, {
        typeantrian: typeAntrian,
        noantrian: noAntrian,
        noplate: noPlate,
        created_at: new Date(),
      });
      onCloseModal();
      alert("Data Berhasil ditambahkan");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Data Gagal ditambahkan");
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setTypeAntrian("");
    setNoAntrian("");
    setNoPlate("");
  };

  const handleTypeAntrianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeAntrian(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} >Add Antrian</Button>
      <Modal show={openModal} onHide={onCloseModal} popup>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Antrian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="noantrian">No Antrian:</label>
          <input
            type="text"
            id="noantrian"
            className="input-group"
            value={noAntrian}
            onChange={(e) => setNoAntrian(e.target.value)}
          />
          <br />
          <label htmlFor="noplate">No Plat:</label>
          <input
            type="text"
            className="input-group"
            id="noplate"
            value={noPlate}
            onChange={(e) => setNoPlate(e.target.value)}
          />
          <br />
          <label htmlFor="typeantrian">Tipe Antrian:</label>
          <select
            id="typeantrian"
            value={typeAntrian}
            className="input-group"
            onChange={handleTypeAntrianChange}
          >
            <option value="">Pilih Tipe Antrian</option>
            <option value="booking">Booking</option>
            <option value="non-booking">Non-Booking</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Form;
