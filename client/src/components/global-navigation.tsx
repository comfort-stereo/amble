import { NavigationProp, ParamListBase } from "@react-navigation/native"

let globalNavigation: NavigationProp<ParamListBase> | null = null

export function getGlobalNavigation(): NavigationProp<ParamListBase> | null {
  return globalNavigation
}

export function setGlobalNavigation(navigation: NavigationProp<ParamListBase> | null): void {
  globalNavigation = navigation
}
