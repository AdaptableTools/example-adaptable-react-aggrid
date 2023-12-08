import { useState } from 'react';
import { useSelector } from 'react-redux';
import { counterSelector } from './store-redux.ts';

export const QuickSearchCustomComponent = (props: any) => {
  const [searchText, setSearchText] = useState('');
  const count = useSelector(counterSelector);
  return (
    <div>
      CUSTOM QuickSearch
      <input
        value={searchText}
        style={{ padding: '6px 10px', marginLeft: 5 }}
        onChange={(event) => {
          const value = event.target.value;
          setSearchText(value);
          props.onSearchTextChange(value);
        }}
      />
      <div>Counter {count}</div>
    </div>
  );
};
