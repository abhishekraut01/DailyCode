import PassowordGenerator from "./components/PassowordGenerator";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";

export default function App() {
  return (
    <BackgroundGradientAnimation className="h-screen w-full flex justify-center items-center">
      <PassowordGenerator />
    </BackgroundGradientAnimation>
  );
}
