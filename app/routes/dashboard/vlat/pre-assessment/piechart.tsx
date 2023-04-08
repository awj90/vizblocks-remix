import * as React from 'react'

import VlatQuiz from '~/components/VlatQuiz'
import { pieChartPreQuestions } from '~/constants'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { supabaseAdmin } from '~/supabase.server'
import { magicLinkStrategy } from '~/utils/auth.server'
import { GRAPH_TYPES } from '~/utils/types'

export const action: ActionFunction = async ({ request }) => {
  // the form is located in app/components/VlatQuiz/index.tsx
  const form = await request.clone().formData()
  const score = form?.get('totalScore')

  const session = await magicLinkStrategy.checkSession(request)
  const uid = session?.user?.id

  const { error } = await supabaseAdmin.from('vlat').insert({ uid, graph_type: GRAPH_TYPES.piechart, score, test_type: 'pre' })
  console.log('>>>', error)
  if (error) return json({ error: { message: error.message } }, 400)
  return redirect('/dashboard/vlat/pre-assessment')
}

export default function PieChart() {
  return <VlatQuiz questions={pieChartPreQuestions} type={GRAPH_TYPES.piechart} />
}
