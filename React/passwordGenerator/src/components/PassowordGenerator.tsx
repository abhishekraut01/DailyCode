import { useEffect, useState } from "react";
import { MovingBorderWrapper } from "../components/ui/MovingBorderWrapper";
import { Button } from "./ui/moving-border";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("@password730382");
  const [includeCharacter, setIncludeCharacter] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [length, setLength] = useState(12);

  const copyToClickBoard =()=>{
    
  }

  useEffect(() => {
    const generatePassowrd = () => {
      let str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";
      let result = "";
      if (includeNumber) {
        str += "123456789";
      }
      if (includeCharacter) {
        str += "!@#$%^&*(){}|/";
      }

      for (let i = 0; i < length; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));
      }
      setPassword(result);
    };

    generatePassowrd();
  }, [length, includeNumber, includeCharacter, setPassword]);
  return (
    <MovingBorderWrapper borderRadius="1.25rem" duration={6000}>
      <div className="flex flex-col p-4 rounded-md shadow-xl ">
        <div className="flex bg-transparent p-5 rounded-md ">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-s-md"
            placeholder="Your password"
            value={password}
          />
          <Button onClick={()=>{
            copyToClickBoard()
          }}>Copy</Button>
        </div>
        <div className="flex gap-2 bg-transparent p-3">
          <label htmlFor="length-range" className="text-white">
            length
          </label>
          <input
            id="length-range"
            type="range"
            min="8"
            max="18"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <h3 className="text-white">{length}</h3>
          <input
            onChange={() => {
              setIncludeNumber((prev) => !prev);
            }}
            checked={includeNumber}
            id="include-number"
            type="checkbox"
          />
          <label htmlFor="Number" className="text-white">
            Number
          </label>
          <input
            onChange={() => {
              setIncludeCharacter((prev) => !prev);
            }}
            checked={includeCharacter}
            id="include-numbers"
            type="checkbox"
          />
          <label htmlFor="include-character" className="text-white">
            Character
          </label>
        </div>
      </div>
    </MovingBorderWrapper>
  );
};

export default PasswordGenerator;
