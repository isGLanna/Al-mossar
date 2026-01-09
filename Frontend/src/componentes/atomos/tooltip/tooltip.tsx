import * as Tooltip from "@radix-ui/react-tooltip"
import { useState } from "react"
import "./tooltip.style.sass"

interface TooltipUIProps {
  children: React.ReactNode
  text: string
}


export function InfoTooltip({ children, text }: TooltipUIProps) {

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>

        <Tooltip.Portal> 
          <Tooltip.Content className="tooltip" 
            align="start"
            side="right">
            {text}
            <Tooltip.Arrow asChild>
              <svg
                width="8"
                height="8"
                viewBox="0 0 6 8"
                className="tooltip-arrow"
              >
                <path d="M0 0 L6 0 L8 8 Z" />
              </svg>
            </Tooltip.Arrow>
          </Tooltip.Content>
        </Tooltip.Portal>

      </Tooltip.Root>
    </Tooltip.Provider>
  )
}