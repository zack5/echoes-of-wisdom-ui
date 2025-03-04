import SelectorController from "./SelectorController";
import { SelectorProvider } from "../components/ContextSelector";
import { EchoesProvider } from "../components/ContextEchoes";
export default function Selector() {
  return (
    <EchoesProvider>
      <SelectorProvider>
        <SelectorController />
      </SelectorProvider>
    </EchoesProvider>
  )
}