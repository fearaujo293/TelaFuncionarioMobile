import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';

const GradientHeader = ({ title, subtitle, children, style }) => {
  return (
    <LinearGradient
      colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
      style={[styles.headerGradient, style]}
    >
      {children || (
        <View style={styles.headerContent}>
          {title && <Text style={styles.headerTitle}>{title}</Text>}
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default GradientHeader;