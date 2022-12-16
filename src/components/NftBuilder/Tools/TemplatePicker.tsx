const TemplatePicker = ({ activeTemplate, setActiveTemplate }: any) => {
  const templates = [0, 1, 2, 3]
  return (
    <div className="options">
      {templates.map((templateNumber: any, index: number) => {
        return (
          <div
            key={`template-${index}`}
            className={activeTemplate == templateNumber ? "opt active" : "opt"}
          >
            <img
              src={`/assets/templates/${templateNumber + 1}.png`}
              alt="template"
              onClick={() => setActiveTemplate(templateNumber)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TemplatePicker
