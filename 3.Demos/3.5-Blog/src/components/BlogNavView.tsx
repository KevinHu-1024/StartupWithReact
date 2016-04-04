import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar, NavItem, Nav, NavDropdown, NavbarBrand, MenuItem } from 'react-bootstrap';

export class  BlogNavView extends React.Component<any, any> {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">玉伯的博客</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">首页</NavItem>
                    <NavItem eventKey={2} href="#">链接</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>设置</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Link Right</NavItem>
                    <NavItem eventKey={2} href="#">Link Right</NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>            
        );
    }
}