import { AdaptableApi, ReactFrameworkComponent } from '@adaptabletools/adaptable-react-aggrid';
import * as React from 'react';


const emptyDataItem = {
  make: '',
  model: '',
  price: 0,
  date: (new Date()).toISOString().split('T')[0],
};

const AddDataForm: React.FunctionComponent<{ api: AdaptableApi }> = (props) => {
  const [values, setValues] = React.useState(emptyDataItem);
  const { make, model, price, date } = values;

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.api.gridApi.addGridData([values])
    setValues(emptyDataItem)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add data item</h3>
      <label className="customSettingsPanel-label">
        Make
        <input onChange={handleChange} value={make} name="make" type="text" />
      </label>
      <label className="customSettingsPanel-label">
        Model
        <input onChange={handleChange} value={model} name="model" type="text" />
      </label>
      <label className="customSettingsPanel-label">
        Price
        <input onChange={handleChange} value={price} name="price" type="number" />
      </label>
      <label className="customSettingsPanel-label">
        Date manufactured
        <input onChange={handleChange} value={date} name="date" type="date" />
      </label>
      <button type='submit'>Add New</button>
    </form>
  )
}


const variableMap = {
  background: '--ab-cmp-adaptable-popup-topbar__background',
  'popup-background': '--ab-cmp-adaptable-popup__background'
}

const CustomThemeVariables = () => {
  const initialValues = React.useMemo(() => {
    const root = (document.querySelector(':root') as HTMLElement);
    const computedStyle = getComputedStyle(root);

    return {
      background: computedStyle.getPropertyValue(variableMap['background']).trim(),
      'popup-background': computedStyle.getPropertyValue(variableMap['popup-background']).trim(),
    }
  }, []);
  const handleChange = (variableName: 'background' | 'popup-background', color: string) => {
    const root = (document.querySelector(':root') as HTMLElement);
    if (!root) {
      return;
    }

    root.style.setProperty(variableMap[variableName], color);
  }

  return (
    <div>
      <h3>Custom theme variables</h3>
      <label className="customSettingsPanel-label">
        Background
        <input defaultValue={initialValues['background']} onChange={(event) => handleChange('background', event.target.value)} type="color" />
      </label>
      <label className="customSettingsPanel-label">
        Popup Background
        <input defaultValue={initialValues['popup-background']} onChange={(event) => handleChange('popup-background', event.target.value)} type="color" />
      </label>
    </div>
  )
}


export const CustomSettingsPanel: ReactFrameworkComponent = ({ adaptableApi }) => {
  return (
    <div>
      <h1>Custom Settings</h1>
      <CustomThemeVariables />
      <AddDataForm api={adaptableApi} />
    </div>
  );
}