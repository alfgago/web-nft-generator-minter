const TemplatePicker = ({
  templates,
  activeTemplate,
  setActiveTemplate,
}: any) => {
  return (
    <div className="options">
      {templates.map((template: any, index: number) => {
        return (
          <img
            key={`template-${index}`}
            className={
              activeTemplate.number == template.number ? "opt active" : "opt"
            }
            src={`/assets/templates/mini${template.number}.png`}
            alt="template"
            onClick={() => setActiveTemplate(template)}
          />
        )
      })}
    </div>
  )
}

export default TemplatePicker
