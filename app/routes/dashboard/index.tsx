import * as React from 'react'
import { LoaderFunction, redirect } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  return redirect('/dashboard/create/barchart')
}

export default function DashBoardIndexRoute() {
  return (
    <div style={{ padding: 16 }}>
      <h2>You should not see this</h2>
    </div>
  )
}
