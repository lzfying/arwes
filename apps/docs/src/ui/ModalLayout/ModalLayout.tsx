import { type ReactElement, type ReactNode, useRef } from 'react'
import { Xmark } from 'iconoir-react'
import {
  Animator,
  Animated,
  FrameSVGNefrex,
  FrameSVGKranox,
  Text,
  Dots,
  cx,
  transition,
  flicker,
  useFrameSVGAssembler
} from '@arwes/react'

import { linkSecondary } from '@app/styles'
import * as classes from './ModalLayout.css'

interface ModalLayoutProps {
  className?: string
  title?: string
  children?: ReactNode
  footer?: ReactNode
  onClose?: () => void
}

const ModalLayout = (props: ModalLayoutProps): ReactElement => {
  const { className, title, children, footer, onClose } = props

  const frame1Ref = useRef<SVGSVGElement>(null)
  const frame2Ref = useRef<SVGSVGElement>(null)

  useFrameSVGAssembler(frame1Ref)
  useFrameSVGAssembler(frame2Ref)

  return (
    <Animator merge combine manager="sequence">
      <div role="dialog" className={cx(classes.root, className)}>
        <Animator>
          <Dots
            style={{
              position: 'fixed'
            }}
            color="hsla(180, 29%, 72%, 0.1)"
            size={2}
            distance={20}
          />
        </Animator>

        <Animated className={classes.container} animated={transition('y', 16, 0)}>
          <Animator>
            <Animated className={classes.frames} animated={transition('scaleY', 0.5, 1, 1)}>
              <FrameSVGKranox
                elementRef={frame1Ref}
                className={classes.frame1}
                style={{
                  top: 5,
                  bottom: 5,
                  height: 'calc(100% - 10px)'
                }}
                strokeWidth={1}
                squareSize={12}
                smallLineLength={12}
                largeLineLength={48}
                positioned
              />
              <FrameSVGNefrex
                elementRef={frame2Ref}
                className={classes.frame2}
                style={{
                  left: 7,
                  right: 7,
                  width: 'calc(100% - 14px)'
                }}
                strokeWidth={3}
                squareSize={12}
                smallLineLength={12}
                largeLineLength={48}
                positioned
              />
            </Animated>
          </Animator>

          <Animator combine manager="stagger">
            <div className={classes.content}>
              <header className={classes.header}>
                <Animator>
                  <Text as="h1" className={classes.title} fixed>
                    {title}
                  </Text>
                </Animator>
                <Animator>
                  <Animated
                    role="button"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    className={cx(linkSecondary, classes.close)}
                    animated={flicker()}
                    onClick={onClose}
                  >
                    <Xmark />
                  </Animated>
                </Animator>
              </header>

              <Animator>
                <Animated as="hr" animated={transition('scaleX', 0, 1)} />
              </Animator>

              <main className={classes.body}>{children}</main>

              <footer className={classes.footer}>{footer}</footer>
            </div>
          </Animator>
        </Animated>
      </div>
    </Animator>
  )
}

export type { ModalLayoutProps }
export { ModalLayout }
