const TemplatePicker = ({
  templates,
  activeTemplate,
  setActiveTemplate,
}: any) => {
  return (
    <div className="options">
      {templates.map((template: any, index: number) => {
        return (
          <div
            key={`template-${index}`}
            className={
              activeTemplate.number == template.number ? "opt active" : "opt"
            }
          >
            <img
              src={`/assets/templates/${template.number}.png`}
              alt="template"
              onClick={() => setActiveTemplate(template)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TemplatePicker
