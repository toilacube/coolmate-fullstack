import React from 'react'
import './Card.scss'

function Card({ title, actions = [], subdued = false, children }) {
  return (
    <div
      className={subdued ? 'card shadow subdued w-full' : 'card shadow w-full'}
    >
      {(title || actions.length > 0) && (
        <div className="flex justify-between card-header">
          {title && <h2 className="card-title">{title}</h2>}
          {actions.length > 0 && (
            <div className="flex">
              {actions.map((action, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="card-action ml-4">
                    <a
                      href="#"
                      className="text-blue-500 text-xs"
                      onClick={(e) => {
                        e.preventDefault()
                        if (action.onAction) action.onAction.call()
                      }}
                    >
                      {action.name}
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

const Session = function Session({ actions = [], title, children }) {
  return (
    <div className="card-section border-b box-border w-full">
      {(title || actions.length > 0) && (
        <div className="flex justify-between card-section-header mb-1">
          {title && <h3 className="card-session-title">{title}</h3>}
          {actions.length > 0 && (
            <div className="flex space-x-075">
              {actions.map((action, index) => {
                const className = {
                  primary: 'text-primary',
                  critical: 'text-critical',
                  interactive: 'text-interactive',
                  secondary: 'text-secondary'
                }
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="card-action">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (action.onAction) action.onAction.call()
                      }}
                      className={
                        className[
                          action.variant ? action.variant : 'interactive'
                        ]
                      }
                    >
                      {action.name}
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      <div className="card-session-content pt-lg">{children}</div>
    </div>
  )
}

Card.Session = Session

export { Card }
