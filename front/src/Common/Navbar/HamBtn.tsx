import "./HamBtn.css";
import styled from "styled-components";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function HamBtn({ onClick }: Props) {
  return (
    <StyledDiv onClick={onClick}>
      <a className="menu-trigger" href="#">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin-left: 230px;
`;
export default HamBtn;
