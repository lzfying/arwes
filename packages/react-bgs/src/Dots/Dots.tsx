import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { useAnimator } from '@arwes/react-animator'
import { type CreateBackgroundDotsSettings, createBackgroundDots } from '@arwes/bgs'

import { positionedStyle } from '../internal/styles.js'

interface DotsProps extends CreateBackgroundDotsSettings {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  positioned?: boolean
}

const Dots = memo((props: DotsProps): ReactElement => {
  const { elementRef: elementRefExternal, className, style, positioned = true } = props

  const animator = useAnimator()
  const elementRef = useRef<HTMLCanvasElement>(null)
  const propsRef = useRef(props)

  propsRef.current = props

  useEffect(() => {
    const canvas = elementRef.current

    if (!canvas) {
      return
    }

    const background = createBackgroundDots({
      settings: propsRef,
      canvas,
      animator
    })

    background.start()

    return () => {
      background.stop()
    }
  }, [animator])

  return (
    <canvas
      role="presentation"
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-bgs-dots', className)}
      style={{ ...(positioned ? positionedStyle : null), ...style }}
    />
  )
})

export type { DotsProps }
export { Dots }
