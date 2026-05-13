export default function useWatcher(obj: any, propName: string, callback?: any, c?: any) {
  obj.$watch(propName, callback ? callback : () => {}, c)
}
