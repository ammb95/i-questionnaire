import React, { useState } from "react";
import { Card, CardContent, Collapse, IconButton } from "@material-ui/core";
import { Col, Row } from "reactstrap";

export default function CardCollapse({
  children: { Title, Body },
  cardContentProps,
  iconButtonProps,
  ...rest
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={rest?.className || ""}>
      <CardContent className={cardContentProps?.className || ""}>
        <Row className="flex justify-between items-center">
          <Col className="px-0" xs={10}>
            <Title />
          </Col>
          <Col xs={1} align="end" className="px-0">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              <i
                className={`las la-chevron-down ${
                  iconButtonProps?.icon?.className || ""
                }`}
                style={{
                  transition: "all 300ms ease",
                  transform: isExpanded ? "rotate(180deg)" : "",
                }}
              />
            </IconButton>
          </Col>
        </Row>
        <Collapse in={isExpanded}>
          <Body />
        </Collapse>
      </CardContent>
    </Card>
  );
}
