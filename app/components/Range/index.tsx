type RangeProps = {
  range: number
  label: string
  type: string
}

export default function Range({ range, label, type }: RangeProps) {
  function replaceLabel(text: string) {
    return text.replace(/\-/g, ' ')
  }
  return (
    <div className="range">
      <span>{replaceLabel(label)}</span>
      <div className="range__bar">
        <div className={type} style={{ width: `${range}%` }} />
      </div>
      <span>{range}/100</span>
    </div>
  )
}