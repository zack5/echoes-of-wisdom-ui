import SelectorController from "./SelectorController";
import { SelectorProvider } from "../components/ContextSelector";

export default function Selector() {
  return (
    <SelectorProvider>
      <SelectorController />
    </SelectorProvider>
  )
}