import SelectorSpiral from "./selectors/SelectorSpiral";
import { SelectorProvider } from "./ContextSelector";
import { EchoesProvider } from "./ContextEchoes";
import { NavigationProvider } from "./ContextNavigation";

export default function Selector() {
  return (
    <NavigationProvider>
      <EchoesProvider>
        <SelectorProvider>
          <SelectorSpiral />
        </SelectorProvider>
      </EchoesProvider>
    </NavigationProvider>
  )
}