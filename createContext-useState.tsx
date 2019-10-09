export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({ state: defaultValue, update: defaultUpdate })
  
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue)
  
    return <ctx.Provider value={{ state, update }} {...props} />
  }
  
  return [ctx, Provider] as const
}

// usage
const [ctx, TextProvider] = createCtx("someText")

export const TextContext = ctx

export function App() {
  return (
    <TextProvider>
      <Component />
    </TextProvider>
  )
}

export function Component() {
  const { state, update } = React.useContext(ctx)

  return (
    <label>
      {state}
      <input type="text" onChange={e => update(e.target.value)} />
    </label>
  )
}
