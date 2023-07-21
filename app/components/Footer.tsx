import styled from "styled-components";
import Link from "next/link";

export const Footer = styled.div`
  height: 50px;
  width: 100%;
  position: absolute;
  text-align: center;
  font-family: Consolas, monaco, monospace;
  font-size: 15px;
  bottom: 0;
  color: #fff;
  z-index: 9999;
`;

export const FooterLink = styled(Link)`
  color: #fff;
`;
