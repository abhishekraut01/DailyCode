import { MovingBorderWrapper } from "../components/ui/MovingBorderWrapper";

const PasswordGenerator = () => {
  return (
    <MovingBorderWrapper borderRadius="1.25rem" duration={6000}>
      <div className="flex flex-col p-4 rounded-md shadow-xl ">
        <div className="flex bg-transparent p-5 rounded-md ">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-s-md"
            placeholder="Your password"
          />
          <button className="bg-slate-400 px-3 py-2 rounded-e-md">Copy</button>
        </div>
        <div className="flex gap-2 bg-transparent p-3">
          <label htmlFor="length-range" className="text-white">
            Length
          </label>
          <input id="length-range" type="range" />
          <h3 className="text-white">12</h3>
          <input id="include-uppercase" type="checkbox" />
          <label htmlFor="Number" className="text-white">
            Number
          </label>
          <input id="include-numbers" type="checkbox" />
          <label htmlFor="include-character" className="text-white">
            Character
          </label>
        </div>
      </div>
    </MovingBorderWrapper>
  );
};

export default PasswordGenerator;
