import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

interface Props {
  loading?: boolean | undefined;
  onRequestClose?: () => void | undefined;
}

const Loader: React.FC<Props> = memo(({loading, onRequestClose}) => {
  return (
    <>
      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.baseColor}
          style={styles.indicatorStyle}
        />
      )}
    </>
  );
});
export default Loader;

const styles = StyleSheet.create({
  indicatorStyle: {
    position: 'absolute',
    backgroundColor: '#00000050',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
