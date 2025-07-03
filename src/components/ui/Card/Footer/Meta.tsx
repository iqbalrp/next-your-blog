type FooterMetaProps = {
  createdAt: string
  updatedAt: string
  actions?: React.ReactNode
}

const Meta = ({ createdAt, updatedAt, actions }: FooterMetaProps) => (
  <div className="w-full flex flex-col gap-3">
    <div className="flex items-center divide-x divide-neutral-300 text-sm text-neutral-700">
      <span className="pr-3">Created {createdAt}</span>
      <span className="pl-3">Last updated {updatedAt}</span>
    </div>
    {actions && <div className="flex items-center divide-x divide-neutral-300">{actions}</div>}
  </div>
)

export default Meta
