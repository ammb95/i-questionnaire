import { Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";

export default function CollapsibleRow({
  className,
  children: { Header, Toggler, Content },
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row className={`grid grid-cols-12 gap-1 ${className}`}>
        <Col className="col-span-10 lg:col-span-11">
          <Header onClick={() => setShow(!show)} />
        </Col>
        <Col className="flex flex-col justify-center col-span-2 lg:col-span-1">
          <Toggler
            iconStyle={{
              transition: "all 300ms ease-in-out",
              transform: show ? "rotate(180deg)" : "",
            }}
            onClick={() => setShow(!show)}
          />
        </Col>
      </Row>
      <Collapse in={show}>
        <Content />
      </Collapse>
    </>
  );
}
