import { useEffect, useState } from "react"

import SimpleHeader from "../Common/SimpleHeader"

import ConfirmationStep from "./ConfirmationStep"
import DesignStep from "./DesignStep"
import FormStep from "./FormStep"
import { NftBuilderStyles } from "./NftBuilderStyles"
import StepsHeader from "./StepsHeader"

const NftBuilder = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [formValues, setFormValues] = useState({
    name: "",
    wallet: "",
    size: "",
    passType: "",
    saleType: "",
    price: "",
  })

  useEffect(() => {
    window.canvas = false
  }, [])

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const previousStep = () => {
    setActiveStep(activeStep - 1)
  }

  const onFormSave = (values: any) => {
    nextStep()
    setFormValues(values)
  }

  const submit = () => {
    alert("Confirm. Next step is integration with Blockchain API")
    console.log(formValues)
  }

  return (
    <NftBuilderStyles>
      <SimpleHeader title="NFT Art Generator" />
      <StepsHeader activeStep={activeStep} />
      <section className="steps">
        <div className="content">
          {activeStep == 1 && (
            <FormStep formValues={formValues} nextAction={onFormSave} />
          )}
          {activeStep == 2 && (
            <DesignStep nextAction={nextStep} previousAction={previousStep} />
          )}
          {activeStep == 3 && (
            <ConfirmationStep
              formValues={formValues}
              nextAction={submit}
              previousAction={previousStep}
            />
          )}
        </div>
      </section>
    </NftBuilderStyles>
  )
}

export default NftBuilder
