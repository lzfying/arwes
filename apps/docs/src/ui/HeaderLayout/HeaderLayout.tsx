/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ReactElement, type ReactNode } from 'react'
import { type AnimatedProp, Animated, Illuminator, cx, transition } from '@arwes/react'

import { transitionCls } from '@app/styles/motion.css'
import * as classes from './HeaderLayout.css'

interface HeaderLayoutProps {
  className?: string
  animated?: AnimatedProp
  hasFrame?: boolean
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

const HeaderLayout = (props: HeaderLayoutProps): ReactElement => {
  const { className, animated, hasFrame, left, center, right } = props

  return (
    <Animated as="header" className={cx(classes.root, className)} animated={animated}>
      <div className={classes.container}>
        {hasFrame && (
          <div role="presentation" className={cx(classes.frame, transitionCls)}>
            <Illuminator color="hsl(180 50% 50% / 10%)" size={400} />
          </div>
        )}
        <Animated className={cx(classes.section, classes.left)} animated={transition('x', -12, 0)}>
          {left}
        </Animated>
        <Animated
          className={cx(classes.section, classes.center)}
          animated={transition('scaleX', 0.9, 1)}
        >
          {center}
        </Animated>
        <Animated className={cx(classes.section, classes.right)} animated={transition('x', 12, 0)}>
          {right}
        </Animated>
      </div>
    </Animated>
  )
}

export type { HeaderLayoutProps }
export { HeaderLayout }
