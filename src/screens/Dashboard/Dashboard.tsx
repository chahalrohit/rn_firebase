import functions from '@react-native-firebase/functions';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import Orientation from 'react-native-orientation-locker';
import Header from '../../components/common/Header';
import Colors from '../../utils/Colors';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';
import styles from './styles';

interface User {
  email: string;
  displayName?: string | null;
  metadata: {
    creationTime: string;
  };
}

interface BarData {
  value: number;
  label: string;
  frontColor: string;
}

const Dashboard: React.FC = () => {
  const {width, height} = useWindowDimensions();

  const [data, setData] = useState<BarData[]>([
    {value: 0, label: 'Jan', frontColor: Colors.baseColor},
    {value: 0, label: 'Feb', frontColor: Colors.baseColor},
    {value: 0, label: 'Mar', frontColor: Colors.baseColor},
    {value: 0, label: 'Apr', frontColor: Colors.baseColor},
    {value: 0, label: 'May', frontColor: Colors.baseColor},
    {value: 0, label: 'Jun', frontColor: Colors.baseColor},
    {value: 0, label: 'Jul', frontColor: Colors.baseColor},
    {value: 0, label: 'Aug', frontColor: Colors.baseColor},
    {value: 0, label: 'Sep', frontColor: Colors.baseColor},
    {value: 0, label: 'Oct', frontColor: Colors.baseColor},
    {value: 0, label: 'Nov', frontColor: Colors.baseColor},
    {value: 0, label: 'Dec', frontColor: Colors.baseColor},
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      Orientation.lockToLandscape();

      // Cleanup: reset to portrait when the screen is unfocused
      return () => {
        Orientation.lockToPortrait();
      };
    }, []),
  );

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const result = await functions().httpsCallable<null, User[]>(
        'listAllUsers',
      )();
      const userData: User[] = result.data;
      const userCountsByMonth = Array(12).fill(0);

      userData.forEach(user => {
        const creationDate = new Date(user.metadata.creationTime);
        const monthIndex = creationDate.getUTCMonth();
        userCountsByMonth[monthIndex] += 1;
      });

      const updatedData = data.map((item, index) => ({
        ...item,
        value: userCountsByMonth[index],
      }));
      console.log('updatedData -->> ', updatedData);

      setData(updatedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching users:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <BarChart
            data={data}
            barWidth={resWidth(8)}
            spacing={resWidth(3)}
            initialSpacing={10}
            xAxisColor="black"
            yAxisColor="black"
            yAxisLabelSuffix=" users"
            yAxisLabelWidth={resWidth(17)}
            yAxisTextStyle={{
              color: Colors.textColor,
              fontFamily: Fonts.typeRegular,
              fontSize: Fonts.normalFont,
            }}
            stepValue={10}
            maxValue={50}
            noOfSections={5}
            height={height * 0.45} // Adjust the height dynamically
            width={width * 0.7} // Adjust the width dynamically
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
