import { HTMLAttributes } from "react"

type RootProps = HTMLAttributes<HTMLDivElement> & {
    steps: string[] | number
}
const Root = ({ steps, ...divProps }: RootProps) => {
    
    
    return <div {...divProps}>{
        
    }</div>
}

export const ProgressStep = {
    Root,
}
