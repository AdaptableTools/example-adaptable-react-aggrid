import * as React from 'react';
import { ReactFrameworkComponent } from '@adaptabletools/adaptable-react-aggrid';

export const CustomSettingsPanel: ReactFrameworkComponent = () => {
  return (
    <div>
      <h1>Custom Settings</h1>
      <CustomThemeVariables />
    </div>
  );
};

const variableMap = {
  background: '--ab-cmp-adaptable-popup-topbar__background',
  'popup-background': '--ab-cmp-adaptable-popup__background',
};

const CustomThemeVariables = () => {
  const initialValues = React.useMemo(() => {
    const root = document.querySelector(':root') as HTMLElement;
    const computedStyle = getComputedStyle(root);

    return {
      background: computedStyle.getPropertyValue(variableMap['background']).trim(),
      'popup-background': computedStyle.getPropertyValue(variableMap['popup-background']).trim(),
    };
  }, []);
  const handleChange = (variableName: 'background' | 'popup-background', color: string) => {
    const root = document.querySelector(':root') as HTMLElement;
    if (!root) {
      return;
    }

    root.style.setProperty(variableMap[variableName], color);
  };

  return (
    <div>
      <h3>Custom theme variables</h3>
      <label className="customSettingsPanel-label">
        Background
        <input
          defaultValue={initialValues['background']}
          onChange={(event) => handleChange('background', event.target.value)}
          type="color"
        />
      </label>
      <label className="customSettingsPanel-label">
        Popup Background
        <input
          defaultValue={initialValues['popup-background']}
          onChange={(event) => handleChange('popup-background', event.target.value)}
          type="color"
        />
      </label>
    </div>
  );
};
