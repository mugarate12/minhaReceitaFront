import Button from '@material-ui/core/Button'
import { Children } from 'react'

type Props = {
  variant?: "text" | "outlined" | "contained",
  size?: "small" | "medium" | "large",
  colorMaterialUI?: "primary" | "secondary",
  textColor?: string,
  backgroundColor?: string,
  children?: any,
  onclick?: () => void,
  margin?: {
    marginTop?: string,
    marginBottom?: string,
    marginLeft?: string,
    marginRight?: string
  }
}

export default function CustomButton({ variant, size, colorMaterialUI, textColor, backgroundColor, margin ,children, onclick }: Props) {
  

  return (
    <>
    <Button 
      variant={!!variant ? variant : "contained" }
      color={!!colorMaterialUI? colorMaterialUI : "primary"}
      size={!!size ? size : "medium"}
      style={{
        marginTop: !!margin && !!margin.marginTop ? margin.marginTop : undefined,
        marginLeft: !!margin && !!margin.marginLeft ? margin.marginLeft : undefined,
        marginRight: !!margin && !!margin.marginRight ? margin.marginRight : undefined,
        marginBottom: !!margin && !!margin.marginBottom ? margin.marginBottom : undefined,
        color: !!textColor ? textColor : undefined,
        backgroundColor: !!backgroundColor ? backgroundColor : undefined
      }}
      onClick={onclick}
      >
      { children }
    </Button>
    </>
  );
}