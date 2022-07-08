import React from "react";
import { Container, Col, Row } from "shards-react";
import Navigation from "../components/Navigation";

import HomeCard from "../components/HomeCard";
import backupImg from "../assets/backups_image.jpg";
import costImg from "../assets/cost_image_alt.jpg";

export default function Home() {

    //const [data, getData] = useState([]);

    return (
        <>
            <Navigation />
            <Container>
                <Row>
                    <Col
                        style={{
                            fontsize: "4.75vw",
                            fontFamily: "Sora",
                            textAlign: "center",
                            color: "#10454F",
                        }}
                    >
                        AWS Backup and Cost Allocation
                    </Col>
                </Row>
                <Row>
                    <HomeCard
                        img={backupImg}
                        title="Backups"
                        content="View and filter all current backups for various AWS instances"
                        to="backups"
                        alt="backups"
                    />
                    <HomeCard
                        img={costImg}
                        title="Cost Allocation"
                        content="Review the cost allocation for AWS backups"
                        to="costAllocation"
                        alt="cost allocation"
                    />
                </Row>
            
            </Container>
        </>
       

       

    );
    


}