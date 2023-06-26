import DynamicForm from "./components/DynamicForm"
import FormConfig from "./components/FormConfig"
import LatestForm from "./components/LatestForm"


export default function Home() {
  return (
    <div>
      {/* <FormConfig /> */}
      {/* <DynamicForm /> */}
      < LatestForm />

    </div>
    
  )
}
 // "validation": {
            //     "minLength": 2,
            //     "maxLength": 15,
            //     "pattern": "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$"