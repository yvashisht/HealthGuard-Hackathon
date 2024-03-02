import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodLog = () => {
  const [moodData, setMoodData] = useState({
    labels: [],
    datasets: [
      { data: [], color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` }, // example color
    ],
  });

  useEffect(() => {
    const getMoodData = async () => {
      try {
        const journalEntries = await AsyncStorage.getItem('journalEntries');
        const formattedData = formatMoodDataForGraph(journalEntries);
        setMoodData(formattedData);
      } catch (error) {
        console.error('Error loading mood data:', error);
      }
    };

    getMoodData();
  }, []);

  const formatMoodDataForGraph = (journalEntries) => {
    if (!journalEntries) return;

    const entries = JSON.parse(journalEntries);
    const formattedData = {
      labels: [],
      datasets: [],
    };

    // Assuming you want to graph each mood separately
    const emotions = ['Happy', 'Sad', 'Anxious', 'Energetic', 'Angry'];
    emotions.forEach((emotion, index) => {
      // Initialize dataset for each emotion
      formattedData.datasets[index] = { data: [], color: getLineColor(index) };

      entries.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        // Add label for each entry date
        if (!formattedData.labels.includes(date)) {
          formattedData.labels.push(date);
        }
        // Add data point for each entry
        formattedData.datasets[index].data.push(entry.ratings[emotion]);
      });
    });

    return formattedData;
  };

  const getLineColor = (index) => {
    // Provide a different color for each dataset
    const colors = ['rgba(134, 65, 244, 1)', 'rgba(244, 65, 134, 1)', 'rgba(65, 244, 134, 1)', 'rgba(244, 134, 65, 1)', 'rgba(65, 134, 244, 1)'];
    return (opacity = 1) => colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Log</Text>
      <LineChart
        data={moodData}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // can adjust depending on your data
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MoodLog;
