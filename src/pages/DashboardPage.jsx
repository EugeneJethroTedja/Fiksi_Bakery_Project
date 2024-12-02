import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaPlus, FaSave } from "react-icons/fa";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [currentReservation, setCurrentReservation] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        date: "",
        guests: "",
        tableNumber: "",
        letter: "",
    });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowModal = (reservation = null) => {
        setCurrentReservation(reservation);
        setFormData(
            reservation || {
                name: "",
                status: "",
                date: "",
                guests: "",
                tableNumber: "",
                letter: "",
            }
        );
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentReservation(null);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.status || !formData.date || !formData.guests) {
            showToast("Semua field harus diisi!", "danger");
            return;
        }

        if (currentReservation) {
            setReservations((prev) =>
                prev.map((res) =>
                    res.id === currentReservation.id ? { ...res, ...formData } : res
                )
            );
            showToast(`Berhasil Edit Data ${formData.name}!`, "success");
        } else {
            setReservations((prev) => [
                ...prev,
                { ...formData, id: Date.now() },
            ]);
            showToast(`Berhasil Tambah Data ${formData.name}!`, "success");
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        const deletedReservation = reservations.find((res) => res.id === id);
        setReservations((prev) => prev.filter((res) => res.id !== id));
        showToast(`Berhasil Hapus Data ${deletedReservation.name}!`, "danger");
    };

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    const getStatusBackground = (status) => {
        switch (status) {
            case "Confirmed":
                return "green";
            case "Pending":
                return "gold";
            case "Cancelled":
                return "red";
            default:
                return "transparent";
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">
                                {user?.username}
                            </h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">
                                {formatDate(user?.loginAt)}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img
                                src="https://via.placeholder.com/150"
                                className="img-fluid rounded"
                                alt="Tidak Ada Gambar"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <h3 className="fw-bold">Daftar Reservasi Meja</h3>
                <p>
                    Saat ini terdapat <strong>{reservations.length}</strong> reservasi meja.
                </p>
                <Button
                    variant="success"
                    size="sm"
                    className="mb-3 d-flex align-items-center"
                    style={{
                        width: "auto",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                    }}
                    onClick={() => handleShowModal()}
                >
                    <FaPlus className="me-2" /> Tambah Reservasi
                </Button>

                {reservations.length === 0 ? (
                    <p></p>
                ) : (
                    <Row>
                        {reservations.map((res) => (
                            <Col md={4} key={res.id} className="mb-4">
                                <Card
                                    className="h-100"
                                    style={{
                                        borderWidth: "3px",                    
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.05)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")}>
                                        <Card.Body className="d-flex flex-column">
                                            <h5
                                                className="fw-bold text-white mb-3"
                                                style={{
                                                    backgroundColor: "blue",
                                                    width: "100%", 
                                                    padding: "0.5rem 1rem",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {res.name}
                                            </h5>

                                            <div className="mb-2">
                                                <p className="mb-1"><strong>Jumlah Orang:</strong> {res.guests}</p>
                                                <p className="mb-1"><strong>Tanggal & Waktu:</strong> {res.date}</p>
                                            </div>

                                            <div className="mb-2">
                                                <p>
                                                    <strong>Status:</strong>{" "}
                                                    <span
                                                        style={{
                                                            backgroundColor: getStatusBackground(res.status),
                                                            color: "white",
                                                            padding: "0.25rem",
                                                            borderRadius: "15px",
                                                        }}
                                                    >
                                                        {res.status}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <p>
                                                    <strong>Nomor Meja:</strong>{" "}
                                                    {res.status === "Confirmed"
                                                        ? `${res.tableNumber} - ${res.letter}`
                                                        : res.status === "Pending"
                                                        ? "Menunggu Konfirmasi"
                                                        : "Reservasi Dibatalkan"}
                                                </p>
                                            </div>

                                            <div className="mt-auto d-flex justify-content-between">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(res.id)}
                                                >
                                                    Hapus
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleShowModal(res)}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentReservation
                            ? "Edit Reservasi Meja"
                            : "Tambah Reservasi Meja"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Pemesan</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Nama Pemesan"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status Reservasi</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                aria-label="Pilih Status"
                            >
                                <option value="" disabled>
                                    Pilih Status
                                </option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal dan Waktu</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Orang</Form.Label>
                            <Form.Control
                                type="number"
                                name="guests"
                                value={formData.guests}
                                onChange={handleInputChange}
                                placeholder="Jumlah Orang"
                            />
                        </Form.Group>
                        {formData.status === "Confirmed" && (
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nomor Meja</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="tableNumber"
                                                value={formData.tableNumber}
                                                onChange={handleInputChange}
                                                placeholder="Nomor Meja"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Abjad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="letter"
                                                value={formData.letter}
                                                onChange={handleInputChange}
                                                placeholder="Pilih Abjad"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        <FaSave /> Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-center">
                <Toast
                    onClose={() => setToast({ show: false })}
                    show={toast.show}
                    bg={toast.type}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default DashboardPage;
