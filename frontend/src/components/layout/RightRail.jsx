import { Card, CardContent } from '../ui/Card.jsx'

const RULES = [
  'Be kind to freshmen (you were one).',
  'No doxxing — keep it vague, keep it safe.',
  'Event posts need a time & place.',
]

export function RightRail() {
  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <div className="sticky top-[5.5rem] space-y-4">
        <Card>
          <CardContent className="space-y-3 pt-5">
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-100">
              How this works
            </h3>
            <p className="text-sm leading-relaxed text-stone-400">
              Scroll the feed freely. Sign in when you want to post, upvote, or
              jump into the comments.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#3dd68c]/20 bg-[#121a16]/80">
          <CardContent className="pt-5">
            <h3 className="text-sm font-semibold text-[#9ef0c4]">House rules</h3>
            <ul className="mt-3 space-y-2.5">
              {RULES.map((rule) => (
                <li
                  key={rule}
                  className="text-sm leading-snug text-stone-400 before:mr-2 before:text-[#3dd68c] before:content-['→']"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <p className="px-1 text-center text-[11px] text-stone-600">
          StudentSphere · built for real campus noise
        </p>
      </div>
    </aside>
  )
}
