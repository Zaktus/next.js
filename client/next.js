import { createElement } from 'react'
import { render } from 'react-dom'
import HeadManager from './head-manager'
import { rehydrate } from '../lib/css'
import { createRouter } from '../lib/router'
import App from '../lib/app'
import evalScript from '../lib/eval-script'


import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


const {
  __NEXT_DATA__: {
    component,
    errorComponent,
    props,
    ids,
    err,
    pathname,
    query
  }
} = window

const Component = evalScript(component).default
const ErrorComponent = evalScript(errorComponent).default

export const router = createRouter(pathname, query, {
  Component,
  ErrorComponent,
  ctx: { err }
})

const headManager = new HeadManager()
const container = document.getElementById('__next')
const appProps = { Component, props, router, headManager }

if (ids) rehydrate(ids)
render(createElement(App, appProps), container)
