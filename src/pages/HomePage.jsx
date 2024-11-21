import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturette1 from "../assets/images/featurette-1.jpg";
import imgFeaturette2 from "../assets/images/featurette-2.jpg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";

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

const HomePage = () => {
  return (
    <>
      <ImageCarousel images={images} />
    </>
  );
};

export default HomePage;
