import styled from "styled-components";
import Image from "next/image";

export const RelativeBackgroundImage = styled(Image)`
  position: relative;
  z-index: 1;
  margin-left: 20px;
  margin-top: 10px;
`;

export const FixedBackgroundImage = styled(Image)`
  position: fixed;
  z-index: 1;
  margin-left: -120px;
  margin-top: -10px;
`;
