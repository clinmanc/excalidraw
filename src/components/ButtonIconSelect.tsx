// import clsx from "clsx";
import { Select } from "antd";

const { Option } = Select;

// TODO: It might be "clever" to add option.icon to the existing component <ButtonSelect />
export const ButtonIconSelect = <T extends Object>({
  options,
  value,
  onChange,
  group,
}: {
  options: { value: T; text: string; icon: JSX.Element; testId?: string }[];
  value: T | null;
  onChange: (value: T) => void;
  group: string;
}) => (
  <Select
    style={{ width: "40px" }}
    showArrow={false}
    value={value}
    onChange={(value) => onChange(value)}
  >
    {options.map((option) => (
      <Option
        className="excalidraw"
        key={option.text}
        value={option.value}
        title={option.text}
      >
        {option.icon}
      </Option>
    ))}
  </Select>
  // <div className="buttonList buttonListIcon">
  //   {options.map((option) => (
  //     <label
  //       key={option.text}
  //       className={clsx({ active: value === option.value })}
  //       title={option.text}
  //     >
  //       <input
  //         type="radio"
  //         name={group}
  //         onChange={() => onChange(option.value)}
  //         checked={value === option.value}
  //         data-testid={option.testId}
  //       />
  //       {option.icon}
  //     </label>
  //   ))}
  // </div>
);
