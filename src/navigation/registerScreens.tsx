import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import { Screens } from './Screens';

import AssetScreen from '@screens/Asset';
import AssetsScreen from '@screens/Assets';
import FavoritesScreen from '@screens/Favorites';

function WrappedComponent(Component: any) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(Screens.ASSET, () =>
    WrappedComponent(AssetScreen),
  );
  Navigation.registerComponent(Screens.ASSETS, () =>
    WrappedComponent(AssetsScreen),
  );
  Navigation.registerComponent(Screens.FAVORITES, () =>
    WrappedComponent(FavoritesScreen),
  );
}
