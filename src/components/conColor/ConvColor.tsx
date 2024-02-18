import { ChangeEvent, useState } from "react"
import Input from "../input/Input"

import './convColor.scss'

const ConvColor = () => {
  const [color, setColor] = useState<string>('#fff');
  const [hexValue, setHexValue] = useState<string>('#');
  const [rgbValue, setRgbValue] = useState<string>('rgb()');
  const handleHexValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor('#fff');
    setRgbValue('rgb()');
    const hex = e.target.value.slice(0, 7);

    if(hex.length > 7) return;
    setHexValue(hex);

    if (hex.length !== 7) return;
    if (hex[0] !== '#' || hex.slice(1, 7).match(/[^\d(A-F)(a-f)]/g)) {
      setColor('red');
      setRgbValue('ОШИБКА')
      return;
    }

    const hexRGB: string[] = hex.match(/[\d\w]{2}/g);
    const r = parseInt(hexRGB[0], 16);
    const g = parseInt(hexRGB[1], 16);
    const b = parseInt(hexRGB[2], 16);
    setRgbValue(`rgb(${r}, ${g}, ${b})`);
    setColor(hex);
  }

  return (
    <div className="convColor" style={{background: color}}>
      <div className="convColor__field">
        <Input name="hex" value={hexValue} placeholder="#000000" onChange={handleHexValue} className="convColor__input convColor__input_hex" readOnly={false} />
      </div>
      <div className="convColor__field">
        <Input name="rgb" value={rgbValue} placeholder="rgba(0, 0, 0)" readOnly className="convColor__input convColor__input_rgb" />
      </div>
    </div>
  )
}

export default ConvColor