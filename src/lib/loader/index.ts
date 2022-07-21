let loader: any = null

export const setLoader = (ref: any) => {
  loader = ref
}

export const getLoader = () => {
  if (loader && loader.current) {
    return loader.current
  }

  return null
}
