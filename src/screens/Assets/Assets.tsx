/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import styles from './styles';
import { Navigation } from 'react-native-navigation';
import { Screens } from '@navigation/Screens';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';
import { useReduxState } from '@hooks/useReduxState';
import { Asset } from '@core/assets';
import { FlatList } from 'react-native-gesture-handler';

const AssetsScreen = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useReduxState(state => state.loading.effects.assets);

  const [assets, setAssets] = React.useState<Asset[]>([]);
  const goToAsset = () => {
    Navigation.push(componentId, {
      component: {
        name: Screens.ASSET,
      },
    });
  };

  const getAssets = useCallback(async () => {
    const res = await dispatch.assets.getAssets('');
    // append results to assets
    setAssets([...assets, ...res]);
  }, [dispatch.assets, assets]);

  useEffect(() => {
    getAssets();
  }, []);
  useEffect(() => {
    console.log(assets);
  }, [assets]);

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
        onEndReached={getAssets}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (!isLoading) return null;
          return <ActivityIndicator />;
        }}
      />
    </View>
  );
};

export default AssetsScreen;