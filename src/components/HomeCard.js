import React from "react";
import { Link } from "react-router-dom"
import { Card, CardTitle, CardImg, CardBody, Button, Col } from "shards-react";

export default function HomeCard(props) {
    return (
        
        <Col>
            
            <Card className="m-3" style={{ backgroundcolor: "#F6F6F6" }}>
                <CardImg
                    top
                    src={props.img}
                    alt={props.alt}
                    height="400px"
                    style={{ "object-fit": "cover" }}
                />
                <CardBody>
                    <CardTitle style={{ color: "#10454F" }}>
                        <h3 style={{ fontFamily: "Sora" }}>{props.title}</h3>
                    </CardTitle>
                    <p style={{ fontSize: "21px" }}>{props.content}</p>
                    <Link to={props.to}>
                        <Button
                        style={{
                            backgroundColor: "#10454F",
                            borderColor: "#10454F",
                            float: "right",
                        }}
                        >
                            <b>Click here to view {props.alt} &rarr;</b>
                        </Button>
                    </Link>
                </CardBody>
            </Card>
            
        </Col>

        
    );
}