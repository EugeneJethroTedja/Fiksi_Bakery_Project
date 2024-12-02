import { Container, Row, Col, Card } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturette1 from "../assets/images/featurette-1.jpg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";
import imgBakery4 from "../assets/images/bakery4.jpg";
import imgBakery5 from "../assets/images/bakery5.jpg";
import imgBakery6 from "../assets/images/bakery6.jpg";
import imgBakery7 from "../assets/images/bakery7.jpg";


const images = [
  {
    img: imgBakery1,
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: imgBakery2,
    title: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: imgBakery3,
    title: "Third slide label",
    description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
];

const cards = [
  {
    img: imgBakery4,
    title: "Your taste bud is key, experience the heartbeat of our bakery.",
    description: "Our modern, sophisticated bakery items are designed to exceed expectations with premium taste, quality where you need it, and thoughtful attention to detail.",
  },
  {
    img: imgBakery5,
    title: "Your taste bud is key, experience the heartbeat of our bakery.",
    description: "Our modern, sophisticated bakery items are designed to exceed expectations with premium taste, quality where you need it, and thoughtful attention to detail.",
  },
  {
    img: imgBakery6,
    title: "Your taste bud is key, experience the heartbeat of our bakery.",
    description: "Our modern, sophisticated bakery items are designed to exceed expectations with premium taste, quality where you need it, and thoughtful attention to detail.",
  },
  {
    img: imgBakery7,
    title: "Your taste bud is key, experience the heartbeat of our bakery.",
    description: "Our modern, sophisticated bakery items are designed to exceed expectations with premium taste, quality where you need it, and thoughtful attention to detail.",
  },
];

const HomePage = () => {
  return (
    <>
      <ImageCarousel images={images} />
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <h2 className="fw-normal">
              Bakery pertama dan satu-satunya <strong>yang fiksional</strong>.
            </h2>
            <p className="lead">
              Diciptakan oleh <strong>[Eugene Jethro Tedja Kusuma Wardana]</strong>, Mahasiswa Universitas Atma Jaya Yogyakarta dari program studi Informatika.
            </p>
            <p className="lead">
              Nomor Pokok Mahasiswa: <strong>[220711908]</strong>.
            </p>
          </Col>
          <Col md={5}>
            <img
              src={imgFeaturette1}
              className="img-fluid mx-auto rounded shadow"
              role="img"
              aria-label="Gambar featurette 1"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          {cards.map((card, index) => (
            <Row
              key={index}
              className={`mb-4 align-items-start ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              <Col md={5} className="d-flex align-items-start">
                <img
                  src={card.img}
                  alt={`Image ${index + 1}`}
                  className="img-fluid rounded shadow"
                />
              </Col>

              <Col md={7} className="d-flex align-items-start flex-column">
                <h3 className="fw-bold">{card.title}</h3>
                <p>{card.description}</p>
              </Col>
            </Row>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
