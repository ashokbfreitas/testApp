import {
    Row,
    Col,
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from "shards-react";

export default function Navigation() {

    return (
        <Row>
            <Col>
                <Navbar type="dark" theme="primary" expand="md">
                    <NavbarBrand href="/">AWS Backup and Cost Allocation</NavbarBrand>

                    <Collapse navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink active href="/backups">
                                    Backups
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active href="/costAllocation">
                                    Cost Allocation
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Col>
        </Row>
    )
}