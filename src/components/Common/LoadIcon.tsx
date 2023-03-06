import { defineLordIconElement } from 'lord-icon-element'
import lottie from 'lottie-web'
import React from 'react'

// register lottie and define custom element
defineLordIconElement(lottie.loadAnimation)

export type LordIconTrigger = 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'morph-two-way'

export type LordIconColors = {
    primary?: string
    secondary?: string
}

interface LordIconElementProps {
    src?: string
    trigger?: LordIconTrigger
    delay?: number
    colors?: string // updated type
    style?: React.CSSProperties
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': LordIconElementProps & React.HTMLAttributes<HTMLElement>
        }
    }
}

export type LordIconProps = LordIconElementProps & {
    size?: number
}

export const LordIcon = ({ colors, src, size, trigger, delay, style }: LordIconProps) => {
    const parsedColors = colors ? JSON.parse(colors) : undefined
    const { primary, secondary } = parsedColors || {}
    const colorProps: LordIconColors = { primary, secondary }

    return (
        <lord-icon
            colors={colors}
            src={src}
            trigger={trigger}
            delay={delay}
            style={{
                width: size,
                height: size,
                ...style
            }}
            {...colorProps}
        />
    )
}
