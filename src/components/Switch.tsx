import React, { useState, FC } from "react";
import styled from "styled-components";

type SwitchProps = {
  Label: string;
  LabelColor?: string;
  isChecked?: boolean;
  onChange?: (isOn: boolean) => void;
};
type SliderProps = { isChecked?: boolean };
type LabelProps = { LabelColor: string | undefined };

const SwitchContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SwitchWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 24px;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #fff;
`;

const Slider = styled.div<SliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  background-color: ${({ isChecked }) =>
    isChecked ? "#00a9e0" : "transparent"};

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    left: ${({ isChecked }) => (isChecked ? "calc(100% - 21px)" : "3px")};
    top: calc(50% - 9px);
    border-radius: 50%;
    background-color: #fff;
    transition: 0.4s;
  }
`;

const SwitchLabel = styled.span<LabelProps>`
  line-height: 1;
  color: ${({ LabelColor }) => LabelColor || "#fff"};
`;

const Switch: FC<SwitchProps> = ({
  Label,
  LabelColor,
  isChecked,
  onChange,
}) => {
  const [isOn, setIsOn] = useState<boolean>(isChecked || false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    onChange && onChange(!isOn);
  };

  return (
    <SwitchContainer>
      <SwitchWrapper onClick={toggleSwitch}>
        <Slider isChecked={isOn} />
      </SwitchWrapper>
      <SwitchLabel LabelColor={LabelColor}>{Label}</SwitchLabel>
    </SwitchContainer>
  );
};

export default Switch;
