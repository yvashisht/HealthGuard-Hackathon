import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodLog = () => {
  const [moodDatasets, setMoodDatasets] = useState({});
  const emotions = ['Hopeless', 'Angry', 'Irritable', 'Anxious', 'Sad', 'Lonely', 'Content', 'Calm', 'Comfortable', 'Safe', 'Joyful'];

  useEffect(() => {
    const getMoodData = async () => {
      try {
        const journalEntries = await AsyncStorage.getItem('journalEntries');
        if (journalEntries) {
          const entries = JSON.parse(journalEntries);
          const dataByEmotion = formatMoodDataForGraph(entries);
          setMoodDatasets(dataByEmotion);
        }
      } catch (error) {
        console.error('Error loading mood data:', error);
      }
    };

    getMoodData();
  }, []);

  const formatMoodDataForGraph = (entries) => {
    let dataByEmotion = {};

    entries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString();

      emotions.forEach(emotion => {
        if (!dataByEmotion[emotion]) {
          dataByEmotion[emotion] = { labels: [], datasets: [{ data: [], color: getLineColor(emotion) }] };
        }
        if (!dataByEmotion[emotion].labels.includes(date)) {
          dataByEmotion[emotion].labels.push(date);
        }
        dataByEmotion[emotion].datasets[0].data.push(entry.ratings[emotion] || 0); // Use 0 if no rating
      });
    });

    return dataByEmotion;
  };

  const getLineColor = (emotion) => {
    // Assign a unique color to each emotion
    const colorMap = {
      'Hopeless': 'rgba(134, 65, 244, 1)',
      'Angry': 'rgba(244, 65, 134, 1)',
      'Irritable': 'rgba(65, 244, 134, 1)',
      // Add more mappings as needed
    };
    return (opacity = 1) => colorMap[emotion] || `rgba(0, 0, 0, ${opacity})`;
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
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
  };

  return (
    <ScrollView>
      {emotions.map((emotion, index) => (
        moodDatasets[emotion] ? (
          <View className='bg-blue-100' key={index} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>{emotion}</Text>
            <LineChart
              data={moodDatasets[emotion]}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        ) : null
      ))}
    </ScrollView>
  );
};

export default MoodLog;
