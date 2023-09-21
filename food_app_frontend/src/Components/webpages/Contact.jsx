import Navbar from "../navFooter/Navbar";
import Card from "react-bootstrap/Card";
import "../webpages/Contact.css"

export default function Contact() {
  return (
    <>
      <Navbar />
      <div>
        <h3><strong>Developed By</strong></h3>
      </div>
      <div className="container">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Vaishnavi Peri</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">vaishnavi.peri@nexturn.com</Card.Subtitle>
            <Card.Text>Java Intern at NexTurn</Card.Text>
            <Card.Link href="#">Github</Card.Link>
            <Card.Link href="#">LinkedIn</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Shek Haseena </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">shek.haseena@nexturn.com</Card.Subtitle>
            <Card.Text>Java Intern at NexTurn</Card.Text>
            <Card.Link href="#">Github</Card.Link>
            <Card.Link href="#">LinkedIn</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Shivani Malkolla</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">shivani.malkolla@nexturn.com</Card.Subtitle>
            <Card.Text>Java Intern at NexTurn</Card.Text>
            <Card.Link href="#">Github</Card.Link>
            <Card.Link href="#">LinkedIn</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Seeni Arivazhakan</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">seeni.arivazhakan@nexturn.com</Card.Subtitle>
            <Card.Text>Java Intern at NexTurn</Card.Text>
            <Card.Link href="#">Github</Card.Link>
            <Card.Link href="#">LinkedIn</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
